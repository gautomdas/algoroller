import base64

from algosdk.future import transaction
from algosdk import account, mnemonic, logic
from algosdk.v2client import algod
from algosdk.logic import get_application_address
from pyteal import *

from algoroller import *

DEPLOYER_MNEMONIC = "material novel lyrics energy autumn pyramid ride slush agree badge owner peasant amazing congress light stairs public hover sustain pilot punch mask dutch able puppy"

algod_address = "http://localhost:4001"
algod_token = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"

# pasted algorand helper functions

def compile_program(client, source_code):
    compile_response = client.compile(source_code)
    return base64.b64decode(compile_response['result'])

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

algod_client = algod.AlgodClient(algod_token, algod_address)

pkey = mnemonic.to_private_key(DEPLOYER_MNEMONIC)

approval_program_compiled = compile_program(
        algod_client, approval_program())

clear_state_program_compiled = compile_program(
        algod_client, clear_state_program())


# no local or global state vars
local_ints = 0
local_bytes = 0
global_ints = 0
global_bytes = 0
global_schema = transaction.StateSchema(global_ints, global_bytes)
local_schema = transaction.StateSchema(local_ints, local_bytes)

app_id = create_app(algod_client, pkey, approval_program_compiled, clear_state_program_compiled, global_schema, local_schema)

print(app_id)