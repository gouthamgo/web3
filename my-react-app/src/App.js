import React, { useState } from 'react';
import './App.css';
import { ethers } from 'ethers';
import * as bip39 from 'bip39';
import { Buffer } from 'buffer'; // Import buffer polyfill
window.Buffer = Buffer; // Set Buffer to the global window object

function App() {
  const [mnemonic, setMnemonic] = useState('');
  const [wallets, setWallets] = useState([]);

  // Function to generate a new mnemonic
  const generateMnemonic = () => {
    const newMnemonic = bip39.generateMnemonic();
    setMnemonic(newMnemonic);
    setWallets([]); // Reset wallets when a new mnemonic is generated

    // Show the mnemonic with an animation
    document.querySelector('.mnemonic-text').classList.add('show');
    document.querySelector('.wallet-title').classList.remove('show');
    document.querySelector('.wallet-list').classList.remove('show');
  };

  // Function to create a new wallet from the mnemonic
  const createWallet = () => {
    if (mnemonic) {
      // Generate a new wallet from the mnemonic and derivation path
      const wallet = ethers.Wallet.fromPhrase(mnemonic, `m/44'/60'/0'/0/${wallets.length}`);
      
      // Add the new wallet to the list
      setWallets([...wallets, wallet]);
  
      // Show the wallets with an animation
      document.querySelector('.wallet-title').classList.add('show');
      document.querySelector('.wallet-list').classList.add('show');
    }
  };
  

  return (
    <div className="app-container">
      <h1 className="app-title">Crypto Wallet</h1>
      <button className="btn generate-btn" onClick={generateMnemonic}>
        Generate Mnemonic
      </button>
      <p className="mnemonic-text">
        <strong>Mnemonic:</strong> {mnemonic}
      </p>

      <button className="btn create-btn" onClick={createWallet} disabled={!mnemonic}>
        Create Wallet
      </button>

      <h2 className="wallet-title">Wallets</h2>
      <ul className="wallet-list">
  {wallets.map((wallet, index) => (
    <li key={index} className="wallet-item">
      <p><strong>Wallet {index + 1}:</strong></p>
      <p>Public Key: {wallet.publicKey}</p>
      <p>Address: {wallet.address}</p>
      <p>Private Key: {wallet.privateKey}</p> {/* Add this line */}
    </li>
  ))}
</ul>

    </div>
  );
}

export default App;
