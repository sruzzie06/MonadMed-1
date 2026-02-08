// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title MediVault - Complete Medical Records System
 * @dev Store patient records, doctor visits, and documents on blockchain
 */
contract MediVault {
    
    struct EmergencyInfo {
        string bloodGroup;
        string emergencyContact;
        string medicalNotes;
        bool exists;
    }
    
    struct MedicalRecord {
        uint256 timestamp;
        string diagnosis;
        string prescription;
        string documentHash; // IPFS hash
        address doctorAddress;
        string doctorName;
    }
    
    struct DoctorVisit {
        uint256 timestamp;
        address doctorAddress;
        string doctorName;
        string visitReason;
        string notes;
    }
    
    struct Document {
        uint256 timestamp;
        string documentType; // "prescription", "lab_report", "scan", etc.
        string ipfsHash;
        string description;
    }
    
    struct DoctorProfile {
        string name;
        string specialization;
        string licenseNumber;
        bool isVerified;
        bool exists;
    }
    
    // Mappings
    mapping(address => EmergencyInfo) public emergencyInfo;
    mapping(address => MedicalRecord[]) public medicalRecords;
    mapping(address => DoctorVisit[]) public doctorVisits;
    mapping(address => Document[]) public documents;
    mapping(address => DoctorProfile) public doctors;
    mapping(address => mapping(address => bool)) public patientDoctorAccess;
    
    // Events
    event EmergencyInfoUpdated(address indexed patient);
    event MedicalRecordAdded(address indexed patient, address indexed doctor);
    event DoctorVisitAdded(address indexed patient, address indexed doctor);
    event DocumentUploaded(address indexed patient, string documentType);
    event DoctorRegistered(address indexed doctor, string name);
    event AccessGranted(address indexed patient, address indexed doctor);
    event AccessRevoked(address indexed patient, address indexed doctor);
    
    // Modifiers
    modifier onlyDoctor() {
        require(doctors[msg.sender].exists, "Not registered as doctor");
        _;
    }
    
    modifier hasAccess(address patient) {
        require(
            msg.sender == patient || patientDoctorAccess[patient][msg.sender],
            "No access to patient records"
        );
        _;
    }
    
    // Emergency Info Functions
    function setEmergencyInfo(
        string memory _bloodGroup,
        string memory _emergencyContact,
        string memory _medicalNotes
    ) public {
        emergencyInfo[msg.sender] = EmergencyInfo({
            bloodGroup: _bloodGroup,
            emergencyContact: _emergencyContact,
            medicalNotes: _medicalNotes,
            exists: true
        });
        emit EmergencyInfoUpdated(msg.sender);
    }
    
    function getEmergencyInfo(address _patient) 
        public 
        view 
        returns (string memory, string memory, string memory) 
    {
        EmergencyInfo memory info = emergencyInfo[_patient];
        return (info.bloodGroup, info.emergencyContact, info.medicalNotes);
    }
    
    // Doctor Registration
    function registerDoctor(
        string memory _name,
        string memory _specialization,
        string memory _licenseNumber
    ) public {
        doctors[msg.sender] = DoctorProfile({
            name: _name,
            specialization: _specialization,
            licenseNumber: _licenseNumber,
            isVerified: false,
            exists: true
        });
        emit DoctorRegistered(msg.sender, _name);
    }
    
    function getDoctorProfile(address _doctor)
        public
        view
        returns (string memory, string memory, string memory, bool)
    {
        DoctorProfile memory doc = doctors[_doctor];
        return (doc.name, doc.specialization, doc.licenseNumber, doc.isVerified);
    }
    
    // Medical Records Functions
    function addMedicalRecord(
        address _patient,
        string memory _diagnosis,
        string memory _prescription,
        string memory _documentHash
    ) public onlyDoctor {
        require(
            patientDoctorAccess[_patient][msg.sender],
            "No access to add records"
        );
        
        medicalRecords[_patient].push(MedicalRecord({
            timestamp: block.timestamp,
            diagnosis: _diagnosis,
            prescription: _prescription,
            documentHash: _documentHash,
            doctorAddress: msg.sender,
            doctorName: doctors[msg.sender].name
        }));
        
        emit MedicalRecordAdded(_patient, msg.sender);
    }
    
    function getMedicalRecordsCount(address _patient)
        public
        view
        hasAccess(_patient)
        returns (uint256)
    {
        return medicalRecords[_patient].length;
    }
    
    function getMedicalRecord(address _patient, uint256 _index)
        public
        view
        hasAccess(_patient)
        returns (
            uint256 timestamp,
            string memory diagnosis,
            string memory prescription,
            string memory documentHash,
            address doctorAddress,
            string memory doctorName
        )
    {
        require(_index < medicalRecords[_patient].length, "Invalid index");
        MedicalRecord memory record = medicalRecords[_patient][_index];
        return (
            record.timestamp,
            record.diagnosis,
            record.prescription,
            record.documentHash,
            record.doctorAddress,
            record.doctorName
        );
    }
    
    // Doctor Visit Functions
    function addDoctorVisit(
        address _patient,
        string memory _visitReason,
        string memory _notes
    ) public onlyDoctor {
        require(
            patientDoctorAccess[_patient][msg.sender],
            "No access to add visit"
        );
        
        doctorVisits[_patient].push(DoctorVisit({
            timestamp: block.timestamp,
            doctorAddress: msg.sender,
            doctorName: doctors[msg.sender].name,
            visitReason: _visitReason,
            notes: _notes
        }));
        
        emit DoctorVisitAdded(_patient, msg.sender);
    }
    
    function getDoctorVisitsCount(address _patient)
        public
        view
        hasAccess(_patient)
        returns (uint256)
    {
        return doctorVisits[_patient].length;
    }
    
    function getDoctorVisit(address _patient, uint256 _index)
        public
        view
        hasAccess(_patient)
        returns (
            uint256 timestamp,
            address doctorAddress,
            string memory doctorName,
            string memory visitReason,
            string memory notes
        )
    {
        require(_index < doctorVisits[_patient].length, "Invalid index");
        DoctorVisit memory visit = doctorVisits[_patient][_index];
        return (
            visit.timestamp,
            visit.doctorAddress,
            visit.doctorName,
            visit.visitReason,
            visit.notes
        );
    }
    
    // Document Upload Functions
    function uploadDocument(
        string memory _documentType,
        string memory _ipfsHash,
        string memory _description
    ) public {
        documents[msg.sender].push(Document({
            timestamp: block.timestamp,
            documentType: _documentType,
            ipfsHash: _ipfsHash,
            description: _description
        }));
        
        emit DocumentUploaded(msg.sender, _documentType);
    }
    
    function getDocumentsCount(address _patient)
        public
        view
        hasAccess(_patient)
        returns (uint256)
    {
        return documents[_patient].length;
    }
    
    function getDocument(address _patient, uint256 _index)
        public
        view
        hasAccess(_patient)
        returns (
            uint256 timestamp,
            string memory documentType,
            string memory ipfsHash,
            string memory description
        )
    {
        require(_index < documents[_patient].length, "Invalid index");
        Document memory doc = documents[_patient][_index];
        return (doc.timestamp, doc.documentType, doc.ipfsHash, doc.description);
    }
    
    // Access Control Functions
    function grantDoctorAccess(address _doctor) public {
        require(doctors[_doctor].exists, "Doctor not registered");
        patientDoctorAccess[msg.sender][_doctor] = true;
        emit AccessGranted(msg.sender, _doctor);
    }
    
    function revokeDoctorAccess(address _doctor) public {
        patientDoctorAccess[msg.sender][_doctor] = false;
        emit AccessRevoked(msg.sender, _doctor);
    }
    
    function checkDoctorAccess(address _patient, address _doctor)
        public
        view
        returns (bool)
    {
        return patientDoctorAccess[_patient][_doctor];
    }
}
