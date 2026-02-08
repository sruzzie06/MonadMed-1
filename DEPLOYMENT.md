# MediVault Smart Contract Deployment Guide

## ⚠️ IMPORTANT: New Contract Required

This updated version requires deploying the **new** `MediVault.sol` contract. The old contract doesn't have the required functions.

## Steps to Deploy

### 1. Deploy the Smart Contract

**Option A: Using Remix IDE (Easiest)**

1. Go to [https://remix.ethereum.org/](https://remix.ethereum.org/)
2. Create a new file named `MediVault.sol`
3. Copy the entire content from `MediVault.sol` in this repo
4. Compile:
   - Select Solidity Compiler (left sidebar)
   - Compiler version: `0.8.0` or higher
   - Click "Compile MediVault.sol"
5. Deploy:
   - Select "Deploy & Run Transactions" (left sidebar)
   - Environment: "Injected Provider - MetaMask"
   - Make sure MetaMask is on **Monad Testnet**
   - Click "Deploy"
   - Confirm transaction in MetaMask
6. **Copy the deployed contract address**

**Option B: Using Hardhat**

```bash
npx hardhat run scripts/deploy.js --network monadTestnet
```

### 2. Update Contract Address

Once deployed, update the contract address in `app.js`:

```javascript
const CONTRACT_ADDRESS = "YOUR_NEW_CONTRACT_ADDRESS_HERE";
```

Replace line 13 with your deployed address.

### 3. Test Locally

```bash
# Serve the files
python -m http.server 8000
# OR
npx http-server
```

Open `http://localhost:8000` and test both portals.

### 4. Push to GitHub

```bash
git add .
git commit -m "Deploy updated MediVault contract"
git push
```

Vercel will auto-deploy.

## Contract Features

The new contract includes:

✅ Emergency information storage  
✅ Doctor registration & profiles  
✅ Medical records management  
✅ Doctor visit tracking  
✅ Document upload (IPFS hashes)  
✅ Access control (patients grant doctors access)  

## Monad Testnet Configuration

- **Network Name:** Monad Testnet
- **RPC URL:** https://testnet-rpc.monad.xyz
- **Chain ID:** 10143
- **Currency:** MON
- **Explorer:** https://testnet.monad.xyz

## Getting Testnet Tokens

Visit: https://testnet.monad.xyz/#/faucet

## Troubleshooting

**"Not registered as doctor"**  
→ Doctors must register their profile first in the Doctor Portal

**"No access to patient records"**  
→ Patient must grant access using "Grant Doctor Access" section

**Transaction fails**  
→ Ensure you have enough MON tokens for gas fees

## File Structure

```
MonadMed-1/
├── index.html                  # Landing page with role selection
├── patient-dashboard.html      # Patient portal
├── doctor-dashboard.html       # Doctor portal
├── dashboard.html              # (Old - can be removed)
├── app.js                      # Main application logic
├── style.css                   # Styling
├── MediVault.sol              # Smart contract source
└── DEPLOYMENT.md              # This file
```

## Next Steps After Deployment

1. ✅ Deploy contract on Monad Testnet
2. ✅ Update `CONTRACT_ADDRESS` in app.js
3. ✅ Push to GitHub
4. ✅ Test on Vercel deployment
5. ✅ Register as a doctor (if testing doctor portal)
6. ✅ Test patient → doctor access flow
