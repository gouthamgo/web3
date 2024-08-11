import React, { useState } from "react";
import { Keypair } from "@solana/web3.js";
import * as bip39 from "bip39";
import { HDKey } from "micro-ed25519-hdkey";
import './Wallet.css'

/* React: We import useState to manage component state.
Keypair: This is imported from @solana/web3.js to create keypairs for the wallets.
bip39: Used for generating and converting mnemonic phrases to seeds.
HDKey: Used for hierarchical deterministic key derivation.

mnemonic: A state variable to store the generated mnemonic phrase.
wallets: A state variable to store the list of wallets (each with a path and public key).

mnemonicToSeedSync: Converts the mnemonic to a seed.
HDKey.fromMasterSeed: Creates an HDKey object from the seed.
for loop: Iterates to generate multiple wallets (in this case, 5 wallets).
Derivation Path: Uses the path m/44'/501'/${i}'/0' to derive each wallet. This path is standard for Solana.
Keypair.fromSeed: Generates a keypair from the derived private key.
setWallets: Updates the wallets state with the newly generated wallets.

How It Works Together
Mnemonic Generation: The bip39 library is used to generate a mnemonic phrase, which is a human-readable seed for creating wallets.
Wallet Creation: Using the mnemonic, the HDKey class derives multiple wallets. Each wallet consists of a keypair, which includes a public key (for receiving tokens) and a private key (for signing transactions).
Public Key Display: The public keys of the generated wallets are displayed so users can easily copy them for transactions.

*/


const Wallet = () => {
    const [mnemonic, setMnemonic] = useState('');
    const [wallets, setWallets] = useState([]);

    const generateMnemonic = () => {
        const newMnemonic = bip39.generateMnemonic();
        setMnemonic(newMnemonic);
        setWallets([]);
    };

    const generateWallets = () => {
        const seed = bip39.mnemonicToSeedSync(mnemonic);
        const hdKey = HDKey.fromMasterSeed(seed.toString('hex'));
        const newWallets = [];

        for (let i = 0; i < 1; i++) { // Generate only one wallet
            const path = `m/44'/501'/${i}'/0'`;
            const derived = hdKey.derive(path);
            const keypair = Keypair.fromSeed(derived.privateKey);
            newWallets.push({
                publicKey: keypair.publicKey.toBase58(),
                privateKey: Buffer.from(keypair.secretKey).toString('hex'),
            });
        }

        setWallets(newWallets);
    };

    return (
        <div className="wallet-container">
            <h1 className="neon-text">Solana Wallet Generator</h1>
            <button className="neon-button" onClick={generateMnemonic}>Generate Mnemonic</button>
            <button className="neon-button" onClick={generateWallets} disabled={!mnemonic}>Generate Wallet</button>
            <h2 className="neon-text">Mnemonic:</h2>
            <p className="neon-text">{mnemonic}</p>
            <h2 className="neon-text">Wallet Details:</h2>
            <ul>
                {wallets.map((wallet, index) => (
                    <li key={index} className="wallet-info">
                        <p><strong>Public Key:</strong> {wallet.publicKey}</p>
                        <p><strong>Private Key:</strong> {wallet.privateKey}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Wallet;