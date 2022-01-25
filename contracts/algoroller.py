from pyteal import *

import base64

from pyteal import *


def approval_program():
    handle_create = Seq([
        App.globalPut(Bytes("random"), Int(0)),
        Approve()

    ])

    handle_update = Assert(Global.creator_address() == Txn.sender())

    @Subroutine(TealType.uint64)
    def roll():  # returns a random int from 0 to 36
        return Btoi(Extract(Sha512_256(
            Concat(
                Itob(App.globalGet(Bytes("Nonce"))),
                Itob(Global.latest_timestamp()),
                Txn.sender(),
                Itob(Balance(Global.current_application_address())),
                Gtxn[0].tx_id()
            )), Int(0), Int(8))) % Int(37)

    roll_scratch = ScratchVar(TealType.uint64)

    @Subroutine(TealType.uint64)
    def calculate_payout(bet, result):  # 0 is zero, 1 is odd, 2 is even
        return Cond(
            [bet == Int(0),
                If(result == Int(0))
             .Then(Gtxn[0].amount() * Int(14))
             .Else(Int(0))],
            [bet == Int(1),
                If(result % Int(2) == Int(1))
             .Then(Gtxn[0].amount() * Int(2))
             .Else(Int(0))],
            [bet == Int(2),
                If(And(result > Int(0), result % Int(2) == Int(0)))
             .Then(Gtxn[0].amount() * Int(2))
             .Else(Int(0))]
        )

    handle_noop = Seq([


        Assert(  # min bet .5 algos, max bet 1% of holdings
            And(
                Gtxn[0].amount() > Int(5000),  # TODO REMEMBER TO *10
                Gtxn[0].amount() < Balance(
                    Global.current_application_address()) / Int(2)  # TODO change to 100
            )
        ),

        roll_scratch.store(roll()),

        InnerTxnBuilder.Begin(),
        InnerTxnBuilder.SetFields(
            {
                TxnField.type_enum: TxnType.Payment,
                TxnField.amount: calculate_payout(Btoi(Txn.application_args[0]), roll_scratch.load()),
                TxnField.receiver: Txn.sender(),
            }
        ),
        InnerTxnBuilder.Submit(),

        InnerTxnBuilder.Begin(),  # send half the bet to us
        InnerTxnBuilder.SetFields(
            {
                TxnField.type_enum: TxnType.Payment,
                TxnField.amount: Gtxn[0].amount() / Int(2),
                TxnField.receiver: Global.creator_address()
            }
        ),
        InnerTxnBuilder.Submit(),

        App.globalPut(Bytes("random"), roll_scratch.load()),

        Approve(),
    ])
    program = Cond(
        [Txn.application_id() == Int(0), handle_create],
        [Txn.on_completion() == OnComplete.OptIn, Reject()],
        [Txn.on_completion() == OnComplete.CloseOut, Reject()],
        [Txn.on_completion() == OnComplete.UpdateApplication, Approve()],
        [Txn.on_completion() == OnComplete.DeleteApplication, Approve()],
        [Txn.on_completion() == OnComplete.NoOp, handle_noop]
    )
    return compileTeal(program, Mode.Application, version=5)


def clear_state_program():
    return compileTeal(Approve(), Mode.Application, version=5)


with open("approval.teal", "w") as approval, open("clear_state.teal", "w") as clear:
    approval.write(approval_program())
    clear.write(clear_state_program())


