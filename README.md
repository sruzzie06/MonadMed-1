# MediVault Lite - Decentralized Medical Information DApp

A complete full-stack decentralized website that allows users to store and retrieve emergency medical information using a smart contract deployed on the Monad blockchain.

🌐 **Live Demo:** [https://monad-med-1.vercel.app](https://monad-med-1.vercel.app)  
📝 **Smart Contract:** `0xebf641822e39b3e5e381f18d1eFACFFD5E60F845`  
⛓️ **Network:** Monad Testnet (Chain ID: 10143)

## Features

✅ **Wallet Integration** - Connect MetaMask wallet seamlessly with auto-network switching  
✅ **Store Medical Info** - Save blood group, emergency contact, and medical notes on-chain  
✅ **Retrieve Data** - Load your medical information anytime from anywhere  
✅ **Blockchain Secured** - All data permanently stored on Monad blockchain  
✅ **Responsive Design** - Works flawlessly on desktop, tablet, and mobile  
✅ **No Backend Server** - Fully client-side, decentralized application  
✅ **Auto Network Switch** - Automatically adds and switches to Monad Testnet  

## Project Structure

```
medivault-website/
├── index.html           # Landing page
├── dashboard.html       # Main application page
├── style.css           # Styling
├── app.js              # Blockchain integration logic
├── assets/
│   └── logo.png        # MediVault logo
└── README.md           # This file
```

## Setup Instructions

### 1. Prerequisites

- **MetaMask Browser Extension** - [Install from Chrome/Firefox Store](https://metamask.io/download/)
- **Monad Testnet configured in MetaMask** - Add the network with these details:
  - Network Name: Monad Testnet
  - RPC URL: `https://testnet.monad.xyz/rpc`
  - Chain ID: `10143`
  - Symbol: MON
  - Block Explorer: `https://testnet.monad.xyz`

- **Deployed Smart Contract** on Monad Testnet

### 2. Smart Contract Deployment

You'll need to deploy the MediVault smart contract on Monad Testnet first. Here's a sample contract:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MediVault {
    struct EmergencyInfo {
        string bloodGroup;
        string emergencyContact;
        string medicalNotes;
    }
    
    mapping(address => EmergencyInfo) public emergencyInfo;
    
    function setEmergencyInfo(
        string memory _bloodGroup,
        string memory _emergencyContact,
        string memory _medicalNotes
    ) public {
        emergencyInfo[msg.sender] = EmergencyInfo(
            _bloodGroup,
            _emergencyContact,
            _medicalNotes
        );
    }
    
    function getEmergencyInfo(address _user) 
        public 
        view 
        returns (string memory, string memory, string memory) 
    {
        EmergencyInfo memory info = emergencyInfo[_user];
        return (info.bloodGroup, info.emergencyContact, info.medicalNotes);
    }
}
```

Deploy this contract using:
- Remix IDE: https://remix.ethereum.org/
- Hardhat
- Truffle

Save the deployed contract address!

### 3. Contract Configuration

The contract address is already configured:
```javascript
const CONTRACT_ADDRESS = "0xebf641822e39b3e5e381f18d1eFACFFD5E60F845";
```

If you deploy your own contract, update this address in `app.js`.

### 4. Run the Website

#### Option A: Using Python's built-in server
```bash
cd medivault-website
python -m http.server 8000
```
Then open: `http://localhost:8000`

#### Option B: Using Node.js http-server
```bash
npm install -g http-server
cd medivault-website
http-server
```

#### Option C: Using VS Code Live Server
1. Install "Live Server" extension in VS Code
2. Right-click `index.html`
3. Select "Open with Live Server"

## Usage Guide

### 1. Connect Your Wallet
- Click "Connect MetaMask Wallet" on the landing page
- Approve the connection in MetaMask
- You'll be redirected to the dashboard

### 2. Store Your Emergency Information
- On the dashboard, fill in:
  - **Blood Group**: Your blood type (e.g., O+, AB-, B+)
  - **Emergency Contact**: Phone number or name
  - **Medical Notes**: Allergies, conditions, medications, etc.
- Click "Save Emergency Info"
- Approve the transaction in MetaMask
- Wait for confirmation on the blockchain

### 3. View Your Information
- Click "Load My Information"
- Your stored data will appear below
- Use the Copy button to copy your wallet address

### 4. Disconnect
- Click "Disconnect Wallet" to log out
- You'll be redirected to the landing page

## Technologies Used

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern, responsive styling with animations
- **JavaScript (Vanilla)** - No frameworks, pure JavaScript
- **ethers.js v6.13.4** - Blockchain interaction via cdnjs

### Blockchain
- **Solidity ^0.8.0** - Smart contract language
- **Monad Testnet** - High-performance L1 blockchain
- **MetaMask** - Web3 wallet provider with auto-network switching

## API Integration

### ethers.js Functions Used

```javascript
// Initialize provider and signer
const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();

// Create contract instance
const contract = new ethers.Contract(ADDRESS, ABI, signer);

// Call functions
const tx = await contract.setEmergencyInfo(blood, contact, notes);
const receipt = await tx.wait();

const info = await contract.getEmergencyInfo(userAddress);
```

## Security Features

🔒 **No Private Key Storage** - MetaMask manages keys  
🔒 **On-Chain Verification** - All transactions verified  
🔒 **User Control** - You approve every transaction  
🔒 **Decentralized** - No server, no central database  

## Browser Compatibility

| Browser | Support |
|---------|---------|
| Chrome | ✅ Full Support |
| Firefox | ✅ Full Support |
| Edge | ✅ Full Support |
| Safari | ⚠️ Limited (MetaMask support) |
| Mobile Browsers | ⚠️ MetaMask app required |

## Troubleshooting

### "MetaMask is not installed"
- Install MetaMask extension from your browser's store
- Refresh the page

### "Wrong Network"
- Make sure MetaMask is set to Monad Testnet
- Check network details in settings

### Transaction Failed
- Ensure you have MON tokens for gas fees
- Check contract address is correct
- Verify sufficient wallet balance

### Data Not Loading
- Make sure the contract address is correct
- Check if you're on the correct network
- Try disconnecting and reconnecting MetaMask

## Getting Testnet MON Tokens

Visit the Monad faucet to get free MON testnet tokens:
- https://testnet.monad.xyz/#/faucet

## Deployment

### Current Deployment: Vercel ✅

**Live URL:** https://monad-med-1.vercel.app

**Deployment is automated:**
- Every push to `main` branch triggers automatic deployment
- Changes go live in ~1 minute
- No build step required (static site)

### Alternative Deployment Options

1. **GitHub Pages** - Enable in repo settings
2. **Netlify** - Drag and drop or connect GitHub
3. **IPFS** - Upload to Pinata/Fleek for fully decentralized hosting

## Future Enhancements

- 🔄 Multiple emergency contacts
- 📱 Mobile app version
- 🏥 Integration with hospitals/clinics
- 🔐 Encryption for sensitive data
- 📊 Medical history tracking
- 🌐 Multi-language support
- 🎯 QR code generation for emergency responders

## License

MIT License - Feel free to use for personal or commercial projects

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review smart contract logs in Monad block explorer
3. Check browser console for errors (F12)

## Authors

MediVault Development Team

---

**Stay Safe. Stay Connected. MediVault Lite.**
