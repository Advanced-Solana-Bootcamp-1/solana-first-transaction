import {
    Connection,
    Keypair,
    PublicKey,
    Transaction,
    TransactionInstruction,
    sendAndConfirmTransaction,
} from "@solana/web3.js";

import dotenv = require('dotenv');

dotenv.config();

const programId = new PublicKey("59B3FiBvfvgcaQzUTaqRs6Y6tA9TZ2LWMY4jgh6jKcPt");
let connection = new Connection("https://api.devnet.solana.com", "confirmed");

function getKeyPair() {
    const secret = JSON.parse(process.env.PRIVATE_KEY ?? "") as number[];
    const secretKey = Uint8Array.from(secret);
    const keypairFromSecretKey = Keypair.fromSecretKey(secretKey);
    return keypairFromSecretKey;
}

async function main() {
    const payer = getKeyPair();
    const transaction = new Transaction();
    const instruction = new TransactionInstruction({
        keys: [],
        programId,
    });
    transaction.add(instruction);
    const transactionSignature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [payer],
    );

    console.log(
        `Transaction: https://explorer.solana.com/tx/${transactionSignature}?cluster=custom`,
    );
}

main()
    .then(() => {
        console.log("Success!");
    })
    .catch((error) => {
        console.error(error);
    });