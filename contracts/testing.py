import base64

from algosdk.future import transaction
from algosdk import account, mnemonic, logic
from algosdk.v2client import algod
from algosdk.logic import get_application_address
from pyteal import *

from algoroller import *

ALGORANDO_ID = 43189528

creator_mnemonic = "material novel lyrics energy autumn pyramid ride slush agree badge owner peasant amazing congress light stairs public hover sustain pilot punch mask dutch able puppy"

algod_address = "http://localhost:4001"
algod_token = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"

# pasted algorand helper functions


def compile_program(client, source_code):
    compile_response = client.compile(source_code)
    return base64.b64decode(compile_response['result'])


def get_private_key_from_mnemonic(mn):
    private_key = mnemonic.to_private_key(mn)
    return private_key


def wait_for_confirmation(client, transaction_id, timeout):
    """
    Wait until the transaction is confirmed or rejected, or until 'timeout'
    number of rounds have passed.
    Args:
        transaction_id (str): the transaction to wait for
        timeout (int): maximum number of rounds to wait    
    Returns:
        dict: pending transaction information, or throws an error if the transaction
            is not confirmed or rejected in the next timeout rounds
    """
    start_round = client.status()["last-round"] + 1
    current_round = start_round

    while current_round < start_round + timeout:
        try:
            pending_txn = client.pending_transaction_info(transaction_id)
        except Exception:
            return
        if pending_txn.get("confirmed-round", 0) > 0:
            return pending_txn
        elif pending_txn["pool-error"]:
            raise Exception(
                'pool error: {}'.format(pending_txn["pool-error"]))
        client.status_after_block(current_round)
        current_round += 1
    raise Exception(
        'pending tx not found in timeout rounds, timeout value = : {}'.format(timeout))


def format_state(state):
    formatted = {}
    for item in state:
        key = item['key']
        value = item['value']
        formatted_key = base64.b64decode(key).decode('utf-8')
        if value['type'] == 1:
            if formatted_key == 'voted':
                formatted_value = base64.b64decode(
                    value['bytes']).decode('utf-8')
            else:
                formatted_value = value['bytes']
            formatted[formatted_key] = formatted_value
        else:
            formatted[formatted_key] = value['uint']
    return formatted


def read_global_state(client, addr, app_id):
    results = client.account_info(addr)
    apps_created = results['created-apps']
    for app in apps_created:
        if app['id'] == app_id:
            return format_state(app['params']['global-state'])
    return {}


def create_app(client, private_key, approval_program, clear_program, global_schema, local_schema):

    sender = account.address_from_private_key(private_key)

    on_complete = transaction.OnComplete.NoOpOC.real

    params = client.suggested_params()

    txn = transaction.ApplicationCreateTxn(sender, params, on_complete,
                                           approval_program, clear_program,
                                           global_schema, local_schema)

    signed_txn = txn.sign(private_key)
    tx_id = signed_txn.transaction.get_txid()

    client.send_transactions([signed_txn])

    wait_for_confirmation(client, tx_id, 5)

    transaction_response = client.pending_transaction_info(tx_id)
    app_id = transaction_response['application-index']
    print("Created new app-id:", app_id)

    return app_id


def delete_app(client, private_key, app_id):
    sender = account.address_from_private_key(private_key)
    on_complete = transaction.OnComplete.NoOpOC.real

    params = client.suggested_params()

    txn = transaction.ApplicationDeleteTxn(sender, params, app_id)
    exec_txn(client, txn, private_key)


def exec_txn(client, txn, private_key):
    signed_txn = txn.sign(private_key)
    tx_id = signed_txn.transaction.get_txid()

    client.send_transactions([signed_txn])
    wait_for_confirmation(client, tx_id, 5)

    print("executed txn", tx_id)


def exec_gtxn(client, txns, private_key):
    stxns = []
    for txn in txns:
        stxns.append(txn.sign(private_key))

    tx_id = client.send_transactions(stxns)

    wait_for_confirmation(client, tx_id, 10)

# index is appid

# dead
def call_txn(client, private_key, index):
    sender = account.address_from_private_key(private_key)

    params = client.suggested_params()

    txn = transaction.ApplicationCallTxn(sender, params, index, 0)

    return txn


def call_app(client, private_key, index):
    # TODO use this for not manually using pub key
    sender = account.address_from_private_key(private_key)

    params = client.suggested_params()

    txn = transaction.ApplicationNoOpTxn(sender, params, index)

    return txn


def main():
    algod_client = algod.AlgodClient(algod_token, algod_address)

    creator_private_key = get_private_key_from_mnemonic(creator_mnemonic)


    # with open("./approval.teal", "w") as f:
    #     approval_program_teal = approval_program()
    #     f.write(approval_program_teal)

    # with open("./clear.teal", "w") as f:
    #     clear_state_program_teal = clear_state_program()
    #     f.write(clear_state_program_teal)

    approval_program_compiled = compile_program(
        algod_client, approval_program())

    clear_state_program_compiled = compile_program(
        algod_client, clear_state_program())

    # app_id = create_app(algod_client, creator_private_key, approval_program_compiled, clear_state_program_compiled, global_schema, local_schema)

    app_id = 58668101
    # TODO just get this from mnemonic
    sender = "QSDYXEWUPGTDJTVYVL5JGG4BIQ7DCAG3QYCLKW6PKCYZO525TECRJV2FNU"

    updateTxn = transaction.ApplicationUpdateTxn(sender, algod_client.suggested_params(
    ), app_id, approval_program_compiled, clear_state_program_compiled)

    exec_txn(algod_client, updateTxn, creator_private_key)

    print("random val", read_global_state(algod_client,
          account.address_from_private_key(creator_private_key), app_id))

    initial_balance = algod_client.account_info(sender)["amount"]
    print("BALANCE 1", initial_balance)

    # send money to app
    print("send txn")

    algorando_txn = call_app(algod_client, creator_private_key, ALGORANDO_ID)

    print("GROUP TXN")
    # txn = transaction.PaymentTxn(sender, algod_client.suggested_params(
    # ), get_application_address(app_id), 3000000)  # TODO .5 algos

    print("CURRENT APP BALANCE", algod_client.account_info(get_application_address(app_id))["amount"])
    print("REQ BALANCE", int(algod_client.account_info(get_application_address(app_id))["amount"] / 10))

    # txn = transaction.PaymentTxn(sender, algod_client.suggested_params(
    # ), get_application_address(app_id), int(algod_client.account_info(get_application_address(app_id))["amount"] / 10))  # TODO .5 algos


    txn = transaction.PaymentTxn(sender, algod_client.suggested_params(
    ), get_application_address(app_id), 50000)


    print("BALANCE 2", algod_client.account_info(sender)["amount"])

    txn2 = call_app(algod_client, creator_private_key,
                    app_id)  # previously had args

    gid = transaction.calculate_group_id([txn, algorando_txn, txn2])
    algorando_txn.group = gid
    txn.group = gid
    txn2.group = gid

    exec_gtxn(algod_client, [txn, algorando_txn, txn2], creator_private_key)

    print("BALANCE CHANGE", initial_balance -
          algod_client.account_info(sender)["amount"])

    print("new random:", read_global_state(algod_client,
          account.address_from_private_key(creator_private_key), app_id))

    # delete_app(algod_client, creator_private_key, app_id)


main()
