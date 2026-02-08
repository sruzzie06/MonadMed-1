/* ============================================
   MediVault Lite - Blockchain Integration
   ethers.js & MetaMask Integration
   ============================================ */

// ===========================================
// Smart Contract Configuration
// ===========================================

// Deployed contract address on Monad Testnet
const CONTRACT_ADDRESS = "0xebf641822e39b3e5e381f18d1eFACFFD5E60F845";

// Monad Testnet network configuration
const MONAD_TESTNET = {
    chainId: "0x279F", // 10143 in hex
    chainName: "Monad Testnet",
    nativeCurrency: { name: "MON", symbol: "MON", decimals: 18 },
    rpcUrls: ["https://testnet-rpc.monad.xyz"],
    blockExplorerUrls: ["https://testnet.monad.xyz"]
};

// ABI for the MediVault smart contract
const CONTRACT_ABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "bloodGroup",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "emergencyContact",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "medicalNotes",
                "type": "string"
            }
        ],
        "name": "setEmergencyInfo",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            }
        ],
        "name": "getEmergencyInfo",
        "outputs": [
            {
                "internalType": "string",
                "name": "bloodGroup",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "emergencyContact",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "medicalNotes",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

// ===========================================
// Global Variables
// ===========================================

let provider;
let signer;
let contract;
let userAddress = null;

// ===========================================
// Wallet Connection Functions
// ===========================================

/**
 * Check if MetaMask is installed
 */
function isMetaMaskInstalled() {
    return typeof window.ethereum !== 'undefined';
}

/**
 * Connect user's MetaMask wallet
 */
/**
 * Switch or add Monad Testnet in MetaMask
 */
async function switchToMonadTestnet() {
    try {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: MONAD_TESTNET.chainId }]
        });
    } catch (switchError) {
        // Chain not added yet — add it
        if (switchError.code === 4902) {
            await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [MONAD_TESTNET]
            });
        } else {
            throw switchError;
        }
    }
}

/**
 * Initialize provider, signer, and contract from the current MetaMask state
 */
async function initializeEthers() {
    provider = new ethers.BrowserProvider(window.ethereum);
    signer = await provider.getSigner();
    userAddress = await signer.getAddress();
    contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
}

async function connectWallet() {
    try {
        // Check if MetaMask is installed
        if (!isMetaMaskInstalled()) {
            showError("MetaMask is not installed. Please install MetaMask extension.");
            return false;
        }

        // Request account access
        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
        });

        if (accounts && accounts.length > 0) {
            // Switch to Monad Testnet
            await switchToMonadTestnet();

            // Initialize ethers provider, signer, contract
            await initializeEthers();

            // Store wallet address in session storage
            sessionStorage.setItem('walletAddress', userAddress);

            showSuccess(`Wallet connected successfully! Address: ${truncateAddress(userAddress)}`);

            // Redirect to dashboard after a short delay
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);

            return true;
        }
    } catch (error) {
        if (error.code === -32602) {
            showError("Invalid RPC method or parameters.");
        } else if (error.code === 4001) {
            showError("User rejected the connection request.");
        } else {
            showError(`Connection failed: ${error.message}`);
        }
        return false;
    }
}

/**
 * Disconnect wallet
 */
async function disconnectWallet() {
    userAddress = null;
    provider = null;
    signer = null;
    contract = null;
    
    // Clear session storage
    sessionStorage.removeItem('walletAddress');
    
    // Update UI
    document.getElementById('walletAddress').textContent = 'Not connected';
    document.getElementById('networkInfo').textContent = 'Not connected';
    
    showSuccess('Wallet disconnected successfully');
    
    // Redirect to landing page
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

/**
 * Get connected wallet address from session
 */
function getWalletAddress() {
    return sessionStorage.getItem('walletAddress') || null;
}

/**
 * Check if user is connected and redirect if needed
 */
function checkWalletConnection() {
    const address = getWalletAddress();
    
    if (!address) {
        // Redirect to landing page if not connected
        window.location.href = 'index.html';
        return false;
    }
    
    userAddress = address;
    return true;
}

// ===========================================
// Emergency Info Functions
// ===========================================

/**
 * Save emergency information to blockchain
 */
async function saveEmergencyInfo(bloodGroup, emergencyContact, medicalNotes) {
    try {
        showLoading('Saving your emergency information to the blockchain...');

        // Validate inputs
        if (!bloodGroup || !emergencyContact) {
            showError('Blood group and emergency contact are required.');
            hideLoading();
            return false;
        }

        // Ensure contract is initialized
        if (!contract) {
            showError('Smart contract not initialized. Please reconnect your wallet.');
            hideLoading();
            return false;
        }

        // Call the smart contract function
        const tx = await contract.setEmergencyInfo(
            bloodGroup,
            emergencyContact,
            medicalNotes
        );

        showLoading(`Transaction sent! Hash: ${tx.hash.substring(0, 20)}...`);

        // Wait for transaction confirmation
        const receipt = await tx.wait();

        if (receipt) {
            hideLoading();
            showSuccess(
                `Emergency info saved successfully! Transaction: ${truncateAddress(receipt.hash)}`
            );
            
            // Clear form
            document.getElementById('emergencyForm').reset();
            
            return true;
        }
    } catch (error) {
        hideLoading();
        
        if (error.code === 'ACTION_REJECTED') {
            showError('Transaction rejected by user.');
        } else if (error.code === 'INSUFFICIENT_FUNDS') {
            showError('Insufficient funds for transaction.');
        } else {
            showError(`Error saving data: ${error.message}`);
        }
        
        return false;
    }
}

/**
 * Load emergency information from blockchain
 */
async function loadEmergencyInfo() {
    try {
        showLoading('Loading your emergency information...');

        // Ensure contract is initialized
        if (!contract) {
            showError('Smart contract not initialized. Please reconnect your wallet.');
            hideLoading();
            return false;
        }

        // Call the smart contract function
        const emergencyInfo = await contract.getEmergencyInfo(userAddress);

        hideLoading();

        if (emergencyInfo && emergencyInfo[0]) {
            // Display the information
            document.getElementById('displayBloodGroup').textContent = emergencyInfo[0] || '-';
            document.getElementById('displayContact').textContent = emergencyInfo[1] || '-';
            document.getElementById('displayNotes').textContent = emergencyInfo[2] || '-';

            // Show the display section
            document.getElementById('displayInfo').classList.remove('hidden');

            showSuccess('Emergency information loaded successfully!');
            return true;
        } else {
            showError('No emergency information found for this address.');
            document.getElementById('displayInfo').classList.add('hidden');
            return false;
        }
    } catch (error) {
        hideLoading();
        showError(`Error loading data: ${error.message}`);
        document.getElementById('displayInfo').classList.add('hidden');
        return false;
    }
}

// ===========================================
// Dashboard Initialization
// ===========================================

/**
 * Initialize dashboard on page load
 */
async function initializeDashboard() {
    // Check if user is connected
    if (!checkWalletConnection()) {
        return;
    }

    // Re-initialize ethers (provider/signer/contract lost on page navigation)
    try {
        if (!isMetaMaskInstalled()) {
            showError("MetaMask is not installed. Please install MetaMask extension.");
            return;
        }

        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (!accounts || accounts.length === 0) {
            // Not connected in MetaMask anymore
            sessionStorage.removeItem('walletAddress');
            window.location.href = 'index.html';
            return;
        }

        await switchToMonadTestnet();
        await initializeEthers();
        sessionStorage.setItem('walletAddress', userAddress);
    } catch (err) {
        showError('Failed to reconnect wallet: ' + err.message);
        return;
    }

    // Update wallet display
    displayWalletInfo();

    // Setup event listeners
    document.getElementById('emergencyForm').addEventListener('submit', handleFormSubmit);
    document.getElementById('loadInfoBtn').addEventListener('click', handleLoadInfo);
    document.getElementById('copyAddressBtn').addEventListener('click', handleCopyAddress);
    document.getElementById('disconnectBtn').addEventListener('click', handleDisconnect);
}

/**
 * Display wallet information
 */
function displayWalletInfo() {
    if (userAddress) {
        document.getElementById('walletAddress').textContent = userAddress;
        document.getElementById('networkInfo').textContent = 'Monad Testnet';
    }
}

/**
 * Handle form submission for saving emergency info
 */
async function handleFormSubmit(e) {
    e.preventDefault();

    const bloodGroup = document.getElementById('bloodGroup').value.trim();
    const emergencyContact = document.getElementById('emergencyContact').value.trim();
    const medicalNotes = document.getElementById('medicalNotes').value.trim();

    await saveEmergencyInfo(bloodGroup, emergencyContact, medicalNotes);
}

/**
 * Handle loading emergency info
 */
async function handleLoadInfo() {
    await loadEmergencyInfo();
}

/**
 * Handle copying wallet address
 */
function handleCopyAddress() {
    if (userAddress) {
        navigator.clipboard.writeText(userAddress).then(() => {
            showSuccess('Wallet address copied to clipboard!');
        }).catch(() => {
            showError('Failed to copy address.');
        });
    }
}

/**
 * Handle disconnecting wallet
 */
async function handleDisconnect() {
    if (confirm('Are you sure you want to disconnect your wallet?')) {
        await disconnectWallet();
    }
}

// ===========================================
// UI Helper Functions
// ===========================================

/**
 * Truncate address for display
 */
function truncateAddress(address) {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
}

/**
 * Show success message
 */
function showSuccess(message) {
    const statusEl = document.getElementById('statusMessage');
    if (statusEl) {
        statusEl.textContent = message;
        statusEl.classList.remove('hidden', 'error', 'info');
        statusEl.classList.add('success');
    }
}

/**
 * Show error message
 */
function showError(message) {
    const statusEl = document.getElementById('statusMessage');
    if (statusEl) {
        statusEl.textContent = `Error: ${message}`;
        statusEl.classList.remove('hidden', 'success', 'info');
        statusEl.classList.add('error');
    }
}

/**
 * Show info message
 */
function showInfo(message) {
    const statusEl = document.getElementById('statusMessage');
    if (statusEl) {
        statusEl.textContent = message;
        statusEl.classList.remove('hidden', 'success', 'error');
        statusEl.classList.add('info');
    }
}

/**
 * Show loading spinner
 */
function showLoading(message) {
    const spinnerEl = document.getElementById('loadingSpinner');
    const textEl = document.getElementById('loadingText');
    
    if (spinnerEl && textEl) {
        textEl.textContent = message || 'Processing...';
        spinnerEl.classList.remove('hidden');
    }
}

/**
 * Hide loading spinner
 */
function hideLoading() {
    const spinnerEl = document.getElementById('loadingSpinner');
    if (spinnerEl) {
        spinnerEl.classList.add('hidden');
    }
}

/**
 * Hide status message
 */
function hideStatusMessage() {
    const statusEl = document.getElementById('statusMessage');
    if (statusEl) {
        statusEl.classList.add('hidden');
    }
}

// ===========================================
// Event Listeners for Landing Page
// ===========================================

// The Connect Wallet button listener is added in index.html
