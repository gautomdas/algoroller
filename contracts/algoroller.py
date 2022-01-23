from pyteal import *

import base64

from pyteal import *

ALGORANDO_ID = 43189528 # testnet only


def approval_program():
    handle_create = Seq([
        App.globalPut(Bytes("random"), Int(0)),
        Approve()

    ])
    handle_update = Assert(Global.creator_address() == Txn.sender())
    random_bytes = ImportScratchValue(1, 0)
    handle_noop = Seq([

        # Assert(Gtxn[1].application_id() == Int(ALGORANDO_ID)),
        # TODO assert appid for algorando
        Assert(And(Gtxn[1].application_id() == Int(ALGORANDO_ID),
                   Or(Gtxn[0].amount() == Int(50000),
                       
                       Gtxn[0].amount() == Balance(
                       Global.current_application_address()) / Int(10))

                   )),

        # Gtxn[0].amount() == Int(3000000)),
        InnerTxnBuilder.Begin(),
        InnerTxnBuilder.SetFields(
            {
                TxnField.type_enum: TxnType.Payment,
                # TxnField.amount: Btoi(Extract(random_bytes, Int(0), Int(8))) / Int(1000000000000000000) * Int(100000), # previously Global.min_txn_fee()? smth like that
                # payout somewhere between 0 and .1 algos
                TxnField.amount: Btoi(Extract(random_bytes, Int(7), Int(1))) * Int(100),
                TxnField.receiver: Txn.sender(),
            }
        ),
        InnerTxnBuilder.Submit(),
        App.globalPut(Bytes("random"), Btoi(
            Extract(random_bytes, Int(7), Int(1)))),
        # App.globalPut(Bytes("random"), Btoi(Extract(random_bytes, Int(0), Int(8))) / Int(1000000000000000000) * Int(100000)),

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

    # return program
    return compileTeal(program, Mode.Application, version=5)


def clear_state_program():
    # return Approve()
    return compileTeal(Approve(), Mode.Application, version=5)


with open("approval.teal", "w") as approval, open("clear_state.teal", "w") as clear:
    approval.write(approval_program())  
    clear.write(clear_state_program())



# with open("approval.teal", "w") as approval, open("clear_state.teal", "w") as clear:
#     approval.write(compileTeal(approval_program(), mode = Mode.Application, version = 5))
#     clear.write(compileTeal(clear_state_program(), mode = Mode.Application, version = 5))