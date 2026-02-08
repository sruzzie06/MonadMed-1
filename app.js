/* ============================================
   MediVault - Complete Medical Records System
   Enhanced with Patient & Doctor Portals
   ============================================ */

// ===========================================
// Smart Contract Configuration
// ===========================================

// NOTE: You must deploy the new MediVault.sol contract and update this address
const CONTRACT_ADDRESS = "0xebf641822e39b3e5e381f18d1eFACFFD5E60F845";

// Monad Testnet network configuration
const MONAD_TESTNET = {
    chainId: "0x279F", // 10143 in hex
    chainName: "Monad Testnet",
    nativeCurrency: { name: "MON", symbol: "MON", decimals: 18 },
    rpcUrls: ["https://testnet-rpc.monad.xyz"],
    blockExplorerUrls: ["https://testnet.monad.xyz"]
};

// Simple IPFS storage (using free public gateway for demo)
const IPFS_GATEWAY = "https://gateway.pinata.cloud/ipfs/";

// Updated ABI for new contract
const CONTRACT_ABI = [
    // Emergency Info
    {
        "inputs": [{"internalType": "string", "name": "_bloodGroup", "type": "string"},
                   {"internalType": "string", "name": "_emergencyContact", "type": "string"},
                   {"internalType": "string", "name": "_medicalNotes", "type": "string"}],
        "name": "setEmergencyInfo",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{"internalType": "address", "name": "_patient", "type": "address"}],
        "name": "getEmergencyInfo",
        "outputs": [{"internalType": "string", "name": "", "type": "string"},
                    {"internalType": "string", "name": "", "type": "string"},
                    {"internalType": "string", "name": "", "type": "string"}],
        "stateMutability": "view",
        "type": "function"
    },
    // Doctor Registration
    {
        "inputs": [{"internalType": "string", "name": "_name", "type": "string"},
                   {"internalType": "string", "name": "_specialization", "type": "string"},
                   {"internalType": "string", "name": "_licenseNumber", "type": "string"}],
        "name": "registerDoctor",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{"internalType": "address", "name": "_doctor", "type": "address"}],
        "name": "getDoctorProfile",
        "outputs": [{"internalType": "string", "name": "", "type": "string"},
                    {"internalType": "string", "name": "", "type": "string"},
                    {"internalType": "string", "name": "", "type": "string"},
                    {"internalType": "bool", "name": "", "type": "bool"}],
        "stateMutability": "view",
        "type": "function"
    },
    // Document Upload
    {
        "inputs": [{"internalType": "string", "name": "_documentType", "type": "string"},
                   {"internalType": "string", "name": "_ipfsHash", "type": "string"},
                   {"internalType": "string", "name": "_description", "type": "string"}],
        "name": "uploadDocument",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{"internalType": "address", "name": "_patient", "type": "address"}],
        "name": "getDocumentsCount",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{"internalType": "address", "name": "_patient", "type": "address"},
                   {"internalType": "uint256", "name": "_index", "type": "uint256"}],
        "name": "getDocument",
        "outputs": [{"internalType": "uint256", "name": "timestamp", "type": "uint256"},
                    {"internalType": "string", "name": "documentType", "type": "string"},
                    {"internalType": "string", "name": "ipfsHash", "type": "string"},
                    {"internalType": "string", "name": "description", "type": "string"}],
        "stateMutability": "view",
        "type": "function"
    },
    // Medical Records
    {
        "inputs": [{"internalType": "address", "name": "_patient", "type": "address"},
                   {"internalType": "string", "name": "_diagnosis", "type": "string"},
                   {"internalType": "string", "name": "_prescription", "type": "string"},
                   {"internalType": "string", "name": "_documentHash", "type": "string"}],
        "name": "addMedicalRecord",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{"internalType": "address", "name": "_patient", "type": "address"}],
        "name": "getMedicalRecordsCount",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{"internalType": "address", "name": "_patient", "type": "address"},
                   {"internalType": "uint256", "name": "_index", "type": "uint256"}],
        "name": "getMedicalRecord",
        "outputs": [{"internalType": "uint256", "name": "timestamp", "type": "uint256"},
                    {"internalType": "string", "name": "diagnosis", "type": "string"},
                    {"internalType": "string", "name": "prescription", "type": "string"},
                    {"internalType": "string", "name": "documentHash", "type": "string"},
                    {"internalType": "address", "name": "doctorAddress", "type": "address"},
                    {"internalType": "string", "name": "doctorName", "type": "string"}],
        "stateMutability": "view",
        "type": "function"
    },
    // Doctor Visits
    {
        "inputs": [{"internalType": "address", "name": "_patient", "type": "address"},
                   {"internalType": "string", "name": "_visitReason", "type": "string"},
                   {"internalType": "string", "name": "_notes", "type": "string"}],
        "name": "addDoctorVisit",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{"internalType": "address", "name": "_patient", "type": "address"}],
        "name": "getDoctorVisitsCount",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{"internalType": "address", "name": "_patient", "type": "address"},
                   {"internalType": "uint256", "name": "_index", "type": "uint256"}],
        "name": "getDoctorVisit",
        "outputs": [{"internalType": "uint256", "name": "timestamp", "type": "uint256"},
                    {"internalType": "address", "name": "doctorAddress", "type": "address"},
                    {"internalType": "string", "name": "doctorName", "type": "string"},
                    {"internalType": "string", "name": "visitReason", "type": "string"},
                    {"internalType": "string", "name": "notes", "type": "string"}],
        "stateMutability": "view",
        "type": "function"
    },
    // Access Control
    {
        "inputs": [{"internalType": "address", "name": "_doctor", "type": "address"}],
        "name": "grantDoctorAccess",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{"internalType": "address", "name": "_patient", "type": "address"},
                   {"internalType": "address", "name": "_doctor", "type": "address"}],
        "name": "checkDoctorAccess",
        "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
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
let currentRole = null;

// ===========================================
// Wallet Connection Functions
// ===========================================

function isMetaMaskInstalled() {
    return typeof window.ethereum !== 'undefined';
}

async function switchToMonadTestnet() {
    try {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: MONAD_TESTNET.chainId }]
        });
    } catch (switchError) {
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

async function initializeEthers() {
    provider = new ethers.BrowserProvider(window.ethereum);
    signer = await provider.getSigner();
    userAddress = await signer.getAddress();
    contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
}

async function connectWithRole(role) {
    try {
        if (!isMetaMaskInstalled()) {
            showError("MetaMask is not installed. Please install MetaMask extension.");
            return false;
        }

        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
        });

        if (accounts && accounts.length > 0) {
            await switchToMonadTestnet();
            await initializeEthers();
            
            sessionStorage.setItem('walletAddress', userAddress);
            sessionStorage.setItem('userRole', role);
            
            showSuccess(`Connected as ${role}! Redirecting...`);
            
            setTimeout(() => {
                window.location.href = role === 'patient' ? 'patient-dashboard.html' : 'doctor-dashboard.html';
            }, 1000);
            
            return true;
        }
    } catch (error) {
        showError(`Connection failed: ${error.message}`);
        return false;
    }
}

async function disconnectWallet() {
    userAddress = null;
    provider = null;
    signer = null;
    contract = null;
    
    sessionStorage.clear();
    
    showSuccess('Disconnected successfully');
    
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

function getWalletAddress() {
    return sessionStorage.getItem('walletAddress') || null;
}

function checkWalletConnection() {
    const address = getWalletAddress();
    
    if (!address) {
        window.location.href = 'index.html';
        return false;
    }
    
    userAddress = address;
    currentRole = sessionStorage.getItem('userRole');
    return true;
}

// ===========================================
// Patient Dashboard Functions
// ===========================================

async function initializePatientDashboard() {
    if (!checkWalletConnection()) return;
    
    try {
        if (!isMetaMaskInstalled()) {
            showError("MetaMask not installed");
            return;
        }

        await switchToMonadTestnet();
        await initializeEthers();
        
        displayWalletInfo();
        
        // Event listeners
        document.getElementById('emergencyForm').addEventListener('submit', handleEmergencySave);
        document.getElementById('loadEmergencyBtn').addEventListener('click', handleLoadEmergency);
        document.getElementById('uploadForm').addEventListener('submit', handleDocumentUpload);
        document.getElementById('loadDocumentsBtn').addEventListener('click', handleLoadDocuments);
        document.getElementById('loadRecordsBtn').addEventListener('click', handleLoadRecords);
        document.getElementById('loadVisitsBtn').addEventListener('click', handleLoadVisits);
        document.getElementById('grantAccessForm').addEventListener('submit', handleGrantAccess);
        document.getElementById('copyAddressBtn').addEventListener('click', handleCopyAddress);
        document.getElementById('disconnectBtn').addEventListener('click', disconnectWallet);
    } catch (err) {
        showError('Failed to initialize: ' + err.message);
    }
}

async function handleEmergencySave(e) {
    e.preventDefault();
    
    const bloodGroup = document.getElementById('bloodGroup').value.trim();
    const contact = document.getElementById('emergencyContact').value.trim();
    const notes = document.getElementById('medicalNotes').value.trim();
    
    try {
        showLoading('Saving emergency information...');
        
        const tx = await contract.setEmergencyInfo(bloodGroup, contact, notes);
        await tx.wait();
        
        hideLoading();
        showSuccess('Emergency info saved successfully!');
        document.getElementById('emergencyForm').reset();
    } catch (error) {
        hideLoading();
        showError('Failed to save: ' + error.message);
    }
}

async function handleLoadEmergency() {
    try {
        showLoading('Loading emergency information...');
        
        const info = await contract.getEmergencyInfo(userAddress);
        
        if (info && info[0]) {
            document.getElementById('displayBloodGroup').textContent = info[0];
            document.getElementById('displayContact').textContent = info[1];
            document.getElementById('displayNotes').textContent = info[2] || 'None';
            document.getElementById('emergencyDisplay').classList.remove('hidden');
            hideLoading();
            showSuccess('Emergency info loaded!');
        } else {
            hideLoading();
            showError('No emergency info found');
        }
    } catch (error) {
        hideLoading();
        showError('Failed to load: ' + error.message);
    }
}

async function handleDocumentUpload(e) {
    e.preventDefault();
    
    const docType = document.getElementById('documentType').value;
    const description = document.getElementById('documentDescription').value.trim();
    const file = document.getElementById('documentFile').files[0];
    
    if (!file) {
        showError('Please select a file');
        return;
    }
    
    try {
        showLoading('Uploading document...');
        
        // Mock IPFS hash (in production, upload to IPFS first)
        const mockHash = 'Qm' + Math.random().toString(36).substr(2, 44);
        
        const tx = await contract.uploadDocument(docType, mockHash, description || file.name);
        await tx.wait();
        
        hideLoading();
        showSuccess('Document uploaded successfully!');
        document.getElementById('uploadForm').reset();
    } catch (error) {
        hideLoading();
        showError('Upload failed: ' + error.message);
    }
}

async function handleLoadDocuments() {
    try {
        showLoading('Loading documents...');
        
        const count = await contract.getDocumentsCount(userAddress);
        const docsList = document.getElementById('documentsList');
        docsList.innerHTML = '';
        
        if (count === 0n) {
            docsList.innerHTML = '<p class="info-text">No documents uploaded yet</p>';
            hideLoading();
            return;
        }
        
        for (let i = 0; i < count; i++) {
            const doc = await contract.getDocument(userAddress, i);
            const date = new Date(Number(doc[0]) * 1000).toLocaleDateString();
            
            docsList.innerHTML += `
                <div class="document-item">
                    <div class="record-header">
                        <span class="record-date">📅 ${date}</span>
                        <span class="record-doctor">${doc[1]}</span>
                    </div>
                    <div class="record-content">
                        <p><strong>Description:</strong> ${doc[3]}</p>
                        <p><strong>IPFS Hash:</strong> ${doc[2]}</p>
                    </div>
                </div>
            `;
        }
        
        hideLoading();
        showSuccess(`Loaded ${count} document(s)`);
    } catch (error) {
        hideLoading();
        showError('Failed to load documents: ' + error.message);
    }
}

async function handleLoadRecords() {
    try {
        showLoading('Loading medical records...');
        
        const count = await contract.getMedicalRecordsCount(userAddress);
        const recordsList = document.getElementById('recordsList');
        recordsList.innerHTML = '';
        
        if (count === 0n) {
            recordsList.innerHTML = '<p class="info-text">No medical records yet</p>';
            hideLoading();
            return;
        }
        
        for (let i = 0; i < count; i++) {
            const record = await contract.getMedicalRecord(userAddress, i);
            const date = new Date(Number(record[0]) * 1000).toLocaleDateString();
            
            recordsList.innerHTML += `
                <div class="record-item">
                    <div class="record-header">
                        <span class="record-date">📅 ${date}</span>
                        <span class="record-doctor">👨‍⚕️ ${record[5]}</span>
                    </div>
                    <div class="record-content">
                        <p><strong>Diagnosis:</strong> ${record[1]}</p>
                        <p><strong>Prescription:</strong> ${record[2]}</p>
                    </div>
                </div>
            `;
        }
        
        hideLoading();
        showSuccess(`Loaded ${count} record(s)`);
    } catch (error) {
        hideLoading();
        showError('Failed to load records: ' + error.message);
    }
}

async function handleLoadVisits() {
    try {
        showLoading('Loading visit history...');
        
        const count = await contract.getDoctorVisitsCount(userAddress);
        const visitsList = document.getElementById('visitsList');
        visitsList.innerHTML = '';
        
        if (count === 0n) {
            visitsList.innerHTML = '<p class="info-text">No doctor visits recorded</p>';
            hideLoading();
            return;
        }
        
        for (let i = 0; i < count; i++) {
            const visit = await contract.getDoctorVisit(userAddress, i);
            const date = new Date(Number(visit[0]) * 1000).toLocaleDateString();
            
            visitsList.innerHTML += `
                <div class="visit-item">
                    <div class="record-header">
                        <span class="record-date">📅 ${date}</span>
                        <span class="record-doctor">👨‍⚕️ ${visit[2]}</span>
                    </div>
                    <div class="record-content">
                        <p><strong>Reason:</strong> ${visit[3]}</p>
                        <p><strong>Notes:</strong> ${visit[4]}</p>
                    </div>
                </div>
            `;
        }
        
        hideLoading();
        showSuccess(`Loaded ${count} visit(s)`);
    } catch (error) {
        hideLoading();
        showError('Failed to load visits: ' + error.message);
    }
}

async function handleGrantAccess(e) {
    e.preventDefault();
    
    const doctorAddr = document.getElementById('doctorAddress').value.trim();
    
    try {
        showLoading('Granting access...');
        
        const tx = await contract.grantDoctorAccess(doctorAddr);
        await tx.wait();
        
        hideLoading();
        showSuccess('Access granted to doctor!');
        document.getElementById('grantAccessForm').reset();
    } catch (error) {
        hideLoading();
        showError('Failed to grant access: ' + error.message);
    }
}

// ===========================================
// Doctor Dashboard Functions
// ===========================================

async function initializeDoctorDashboard() {
    if (!checkWalletConnection()) return;
    
    try {
        if (!isMetaMaskInstalled()) {
            showError("MetaMask not installed");
            return;
        }

        await switchToMonadTestnet();
        await initializeEthers();
        
        displayWalletInfo();
        
        // Load doctor profile
        await loadDoctorProfile();
        
        // Event listeners
        document.getElementById('registerDoctorForm').addEventListener('submit', handleDoctorRegistration);
        document.getElementById('searchPatientForm').addEventListener('submit', handleSearchPatient);
        document.getElementById('addRecordForm').addEventListener('submit', handleAddRecord);
        document.getElementById('addVisitForm').addEventListener('submit', handleAddVisit);
        document.getElementById('copyAddressBtn').addEventListener('click', handleCopyAddress);
        document.getElementById('disconnectBtn').addEventListener('click', disconnectWallet);
    } catch (err) {
        showError('Failed to initialize: ' + err.message);
    }
}

async function loadDoctorProfile() {
    try {
        const profile = await contract.getDoctorProfile(userAddress);
        
        if (profile && profile[0]) {
            document.getElementById('doctorName').textContent = profile[0];
            document.getElementById('doctorSpec').textContent = profile[1];
            document.getElementById('doctorLicense').textContent = profile[2];
            document.getElementById('doctorProfileDisplay').classList.remove('hidden');
            document.getElementById('registerSection').style.display = 'none';
        }
    } catch (error) {
        // Not registered yet
    }
}

async function handleDoctorRegistration(e) {
    e.preventDefault();
    
    const name = document.getElementById('docName').value.trim();
    const spec = document.getElementById('docSpecialization').value.trim();
    const license = document.getElementById('docLicense').value.trim();
    
    try {
        showLoading('Registering doctor profile...');
        
        const tx = await contract.registerDoctor(name, spec, license);
        await tx.wait();
        
        hideLoading();
        showSuccess('Doctor profile registered!');
        await loadDoctorProfile();
    } catch (error) {
        hideLoading();
        showError('Registration failed: ' + error.message);
    }
}

async function handleSearchPatient(e) {
    e.preventDefault();
    
    const patientAddr = document.getElementById('patientAddress').value.trim();
    
    try {
        showLoading('Loading patient information...');
        
        // Check access
        const hasAccess = await contract.checkDoctorAccess(patientAddr, userAddress);
        
        if (!hasAccess) {
            hideLoading();
            showError('You do not have access to this patient\'s records. Patient must grant access first.');
            return;
        }
        
        // Load emergency info
        const info = await contract.getEmergencyInfo(patientAddr);
        
        document.getElementById('patientBloodGroup').textContent = info[0] || 'Not provided';
        document.getElementById('patientContact').textContent = info[1] || 'Not provided';
        document.getElementById('patientNotes').textContent = info[2] || 'None';
        
        // Show sections
        document.getElementById('patientInfoSection').style.display = 'block';
        document.getElementById('patientDocumentsSection').style.display = 'block';
        document.getElementById('patientRecordsSection').style.display = 'block';
        document.getElementById('patientVisitsSection').style.display = 'block';
        document.getElementById('addRecordSection').style.display = 'block';
        document.getElementById('addVisitSection').style.display = 'block';
        
        // Store current patient
        document.getElementById('currentPatientAddress').value = patientAddr;
        
        // Setup load buttons
        document.getElementById('loadPatientDocumentsBtn').onclick = () => loadPatientDocuments(patientAddr);
        document.getElementById('loadPatientRecordsBtn').onclick = () => loadPatientRecords(patientAddr);
        document.getElementById('loadPatientVisitsBtn').onclick = () => loadPatientVisits(patientAddr);
        
        hideLoading();
        showSuccess('Patient information loaded!');
    } catch (error) {
        hideLoading();
        showError('Failed to load patient: ' + error.message);
    }
}

async function loadPatientDocuments(patientAddr) {
    try {
        showLoading('Loading patient documents...');
        
        const count = await contract.getDocumentsCount(patientAddr);
        const docsList = document.getElementById('patientDocumentsList');
        docsList.innerHTML = '';
        
        if (count === 0n) {
            docsList.innerHTML = '<p class="info-text">No documents</p>';
            hideLoading();
            return;
        }
        
        for (let i = 0; i < count; i++) {
            const doc = await contract.getDocument(patientAddr, i);
            const date = new Date(Number(doc[0]) * 1000).toLocaleDateString();
            
            docsList.innerHTML += `
                <div class="document-item">
                    <div class="record-header">
                        <span class="record-date">📅 ${date}</span>
                        <span class="record-doctor">${doc[1]}</span>
                    </div>
                    <div class="record-content">
                        <p><strong>Description:</strong> ${doc[3]}</p>
                        <p><strong>Hash:</strong> ${doc[2]}</p>
                    </div>
                </div>
            `;
        }
        
        hideLoading();
    } catch (error) {
        hideLoading();
        showError('Failed to load documents: ' + error.message);
    }
}

async function loadPatientRecords(patientAddr) {
    try {
        showLoading('Loading patient records...');
        
        const count = await contract.getMedicalRecordsCount(patientAddr);
        const recordsList = document.getElementById('patientRecordsList');
        recordsList.innerHTML = '';
        
        if (count === 0n) {
            recordsList.innerHTML = '<p class="info-text">No medical records</p>';
            hideLoading();
            return;
        }
        
        for (let i = 0; i < count; i++) {
            const record = await contract.getMedicalRecord(patientAddr, i);
            const date = new Date(Number(record[0]) * 1000).toLocaleDateString();
            
            recordsList.innerHTML += `
                <div class="record-item">
                    <div class="record-header">
                        <span class="record-date">📅 ${date}</span>
                        <span class="record-doctor">👨‍⚕️ ${record[5]}</span>
                    </div>
                    <div class="record-content">
                        <p><strong>Diagnosis:</strong> ${record[1]}</p>
                        <p><strong>Prescription:</strong> ${record[2]}</p>
                    </div>
                </div>
            `;
        }
        
        hideLoading();
    } catch (error) {
        hideLoading();
        showError('Failed to load records: ' + error.message);
    }
}

async function loadPatientVisits(patientAddr) {
    try {
        showLoading('Loading visit history...');
        
        const count = await contract.getDoctorVisitsCount(patientAddr);
        const visitsList = document.getElementById('patientVisitsList');
        visitsList.innerHTML = '';
        
        if (count === 0n) {
            visitsList.innerHTML = '<p class="info-text">No visits recorded</p>';
            hideLoading();
            return;
        }
        
        for (let i = 0; i < count; i++) {
            const visit = await contract.getDoctorVisit(patientAddr, i);
            const date = new Date(Number(visit[0]) * 1000).toLocaleDateString();
            
            visitsList.innerHTML += `
                <div class="visit-item">
                    <div class="record-header">
                        <span class="record-date">📅 ${date}</span>
                        <span class="record-doctor">👨‍⚕️ ${visit[2]}</span>
                    </div>
                    <div class="record-content">
                        <p><strong>Reason:</strong> ${visit[3]}</p>
                        <p><strong>Notes:</strong> ${visit[4]}</p>
                    </div>
                </div>
            `;
        }
        
        hideLoading();
    } catch (error) {
        hideLoading();
        showError('Failed to load visits: ' + error.message);
    }
}

async function handleAddRecord(e) {
    e.preventDefault();
    
    const patientAddr = document.getElementById('currentPatientAddress').value;
    const diagnosis = document.getElementById('diagnosis').value.trim();
    const prescription = document.getElementById('prescription').value.trim();
    const docHash = document.getElementById('recordDocHash').value.trim() || '';
    
    try {
        showLoading('Adding medical record...');
        
        const tx = await contract.addMedicalRecord(patientAddr, diagnosis, prescription, docHash);
        await tx.wait();
        
        hideLoading();
        showSuccess('Medical record added successfully!');
        document.getElementById('addRecordForm').reset();
        document.getElementById('currentPatientAddress').value = patientAddr;
    } catch (error) {
        hideLoading();
        showError('Failed to add record: ' + error.message);
    }
}

async function handleAddVisit(e) {
    e.preventDefault();
    
    const patientAddr = document.getElementById('currentPatientAddress').value;
    const reason = document.getElementById('visitReason').value.trim();
    const notes = document.getElementById('visitNotes').value.trim();
    
    try {
        showLoading('Adding doctor visit...');
        
        const tx = await contract.addDoctorVisit(patientAddr, reason, notes);
        await tx.wait();
        
        hideLoading();
        showSuccess('Doctor visit recorded!');
        document.getElementById('addVisitForm').reset();
    } catch (error) {
        hideLoading();
        showError('Failed to add visit: ' + error.message);
    }
}

// ===========================================
// UI Helper Functions
// ===========================================

function displayWalletInfo() {
    if (userAddress) {
        document.getElementById('walletAddress').textContent = userAddress;
    }
}

function handleCopyAddress() {
    if (userAddress) {
        navigator.clipboard.writeText(userAddress).then(() => {
            showSuccess('Address copied to clipboard!');
        }).catch(() => {
            showError('Failed to copy address.');
        });
    }
}

function truncateAddress(address) {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
}

function showSuccess(message) {
    const statusEl = document.getElementById('statusMessage');
    if (statusEl) {
        statusEl.textContent = message;
        statusEl.classList.remove('hidden', 'error', 'info');
        statusEl.classList.add('success');
    }
}

function showError(message) {
    const statusEl = document.getElementById('statusMessage');
    if (statusEl) {
        statusEl.textContent = `Error: ${message}`;
        statusEl.classList.remove('hidden', 'success', 'info');
        statusEl.classList.add('error');
    }
}

function showInfo(message) {
    const statusEl = document.getElementById('statusMessage');
    if (statusEl) {
        statusEl.textContent = message;
        statusEl.classList.remove('hidden', 'success', 'error');
        statusEl.classList.add('info');
    }
}

function showLoading(message) {
    const spinnerEl = document.getElementById('loadingSpinner');
    const textEl = document.getElementById('loadingText');
    
    if (spinnerEl && textEl) {
        textEl.textContent = message || 'Processing...';
        spinnerEl.classList.remove('hidden');
    }
}

function hideLoading() {
    const spinnerEl = document.getElementById('loadingSpinner');
    if (spinnerEl) {
        spinnerEl.classList.add('hidden');
    }
}
