import { 
  Resident, 
  Household, 
  DocumentRequest, 
  ServiceItem, 
  QueueTicket, 
  IncidentReport, 
  Appointment, 
  Announcement, 
  AuditLog, 
  KnowledgeBaseItem, 
  PriorityCriteriaConfig,
  DuplicateRecordFlag,
  Official
} from '../types';

export const INITIAL_OFFICIALS: Official[] = [
  { id: 'off-1', name: 'Hon. Eduardo M. Reyes', position: 'Barangay Captain', committee: 'Executive / Presiding Officer', contactDetails: 'captain.reyes@barangay4a.gov.ph', status: 'Active (Incumbent)' },
  { id: 'off-2', name: 'Hon. Maria T. Santos', position: 'Barangay Kagawad', committee: 'Committee on Health and Sanitation', contactDetails: 'kagawad.santos@barangay4a.gov.ph', status: 'Active (Incumbent)' },
  { id: 'off-3', name: 'Hon. Jose P. Villanueva', position: 'Barangay Kagawad', committee: 'Committee on Peace and Order', contactDetails: 'kagawad.villanueva@barangay4a.gov.ph', status: 'Active (Incumbent)' },
  { id: 'off-4', name: 'Hon. Analyn B. Garcia', position: 'Barangay Kagawad', committee: 'Committee on Education', contactDetails: 'kagawad.garcia@barangay4a.gov.ph', status: 'Active (Incumbent)' },
  { id: 'off-5', name: 'Hon. Ricardo S. Lim', position: 'Barangay Kagawad', committee: 'Committee on Public Works', contactDetails: 'kagawad.lim@barangay4a.gov.ph', status: 'Active (Incumbent)' },
  { id: 'off-6', name: 'Hon. Elena F. Cruz', position: 'Barangay Kagawad', committee: 'Committee on Women and Family', contactDetails: 'kagawad.cruz@barangay4a.gov.ph', status: 'Active (Incumbent)' },
  { id: 'off-7', name: 'Hon. Mark L. Bautista', position: 'Barangay Kagawad', committee: 'Committee on Sports and Youth', contactDetails: 'kagawad.bautista@barangay4a.gov.ph', status: 'On Leave (Absent)' },
  { id: 'off-8', name: 'Hon. Patricia D. Mendoza', position: 'SK Chairperson', committee: 'Sangguniang Kabataan', contactDetails: 'sk.mendoza@barangay4a.gov.ph', status: 'Active (Incumbent)' },
  { id: 'off-9', name: 'Juan Carlos T. Ramos', position: 'Barangay Secretary', committee: 'Records and Administration', contactDetails: 'secretary.ramos@barangay4a.gov.ph', status: 'Active (Incumbent)' },
];

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'barangay_clearance',
    title: 'Barangay Clearance',
    category: 'Clearance',
    description: 'Official clearance certifying no derogatory record in the barangay. Essential for employment, postal ID, bank transactions, and local requirements.',
    fee: 50,
    isFreeForEligible: true,
    eligibleCriteria: 'Free for First-Time Jobseekers under Republic Act 11261',
    processingTime: '15-30 minutes (Express) or same day',
    requirements: [
      'Valid Government-issued ID or Student ID with current address',
      'Recent Cedula (Community Tax Certificate) for the current year',
      '1x1 or 2x2 formal ID picture'
    ],
    validityMonths: 6,
    availableOnline: true,
  },
  {
    id: 'certificate_of_residency',
    title: 'Certificate of Residency',
    category: 'Certification',
    description: 'Attests that the individual has been a bona fide resident of Barangay 4A for at least 6 months. Required for school enrollment, utility connections, and bank requirements.',
    fee: 30,
    isFreeForEligible: true,
    eligibleCriteria: 'Free for registered indigent residents and public school students',
    processingTime: '10-20 minutes',
    requirements: [
      'Proof of billing under applicant’s name (Meralco, Manila Water, Internet) OR HOA / Landlord certification',
      'Valid ID showing address in Barangay 4A'
    ],
    validityMonths: 6,
    availableOnline: true,
  },
  {
    id: 'certificate_of_indigency',
    title: 'Certificate of Indigency',
    category: 'Social Service',
    description: 'Certifies that the resident belongs to a low-income household, allowing access to government financial, medical, educational, or legal assistance.',
    fee: 0,
    isFreeForEligible: true,
    eligibleCriteria: 'Exempt from all barangay fees by law',
    processingTime: 'Same day upon validation',
    requirements: [
      'Purok Leader endorsement or Case Study evaluation',
      'Any valid ID or Philippine National ID (PhilSys)'
    ],
    validityMonths: 3,
    availableOnline: true,
  },
  {
    id: 'business_clearance',
    title: 'Barangay Business Clearance',
    category: 'Permit',
    description: 'Mandatory clearance for commercial establishments, sari-sari stores, and home-based businesses operating within the territorial jurisdiction of Barangay 4A.',
    fee: 350,
    isFreeForEligible: false,
    eligibleCriteria: 'Based on registered gross capital',
    processingTime: '1 to 2 business days',
    requirements: [
      'DTI Business Name Registration or SEC Registration',
      'Lease Contract or Proof of Commercial Space Ownership',
      'Previous year Barangay Business Clearance (if renewal)',
      'Fire Safety Inspection Certificate'
    ],
    validityMonths: 12,
    availableOnline: true,
  },
  {
    id: 'first_time_jobseeker',
    title: 'First-Time Jobseeker Certificate (RA 11261)',
    category: 'Certification',
    description: 'Issued pursuant to the First Time Jobseekers Assistance Act, waiving government fees for first-time job application documents.',
    fee: 0,
    isFreeForEligible: true,
    eligibleCriteria: 'First time job seeker aged 15 and above',
    processingTime: '15 minutes',
    requirements: [
      'Oath of Undertaking signed before the Barangay Captain or authorized personnel',
      'School Diploma, Transcript of Records, or Certificate of Graduation',
      'Proof of Barangay Residency'
    ],
    validityMonths: 12,
    availableOnline: true,
  },
  {
    id: 'good_moral',
    title: 'Certificate of Good Moral Character',
    category: 'Certification',
    description: 'Affirms that the resident has maintained peaceable and orderly conduct in the community with no pending Lupon Tagapamayapa case.',
    fee: 30,
    isFreeForEligible: true,
    eligibleCriteria: 'Free for scholarship applicants',
    processingTime: '20 minutes',
    requirements: [
      'Valid Government ID',
      'Barangay Police/Tanod Record Check (done internally)'
    ],
    validityMonths: 6,
    availableOnline: true,
  }
];

export const INITIAL_RESIDENTS: Resident[] = [
  {
    id: 'res-001',
    residentNumber: 'B4A-2024-0012',
    firstName: 'Maria Corazon',
    middleName: 'Del Rosario',
    lastName: 'Santos',
    birthDate: '1988-05-14',
    gender: 'Female',
    civilStatus: 'Married',
    address: '#42 Sampaguita St., Purok 2',
    purok: 'Purok 2 - Riverside',
    householdId: 'hh-101',
    isHouseholdHead: true,
    contactNumber: '0917-555-0123',
    email: 'maria.santos@email.ph',
    occupation: 'Public School Teacher',
    isSenior: false,
    isPWD: false,
    isVoter: true,
    registeredDate: '2018-03-12',
    status: 'active',
    notes: 'Active member of Parents-Teachers Association; verified resident.'
  },
  {
    id: 'res-002',
    residentNumber: 'B4A-2024-0013',
    firstName: 'Maria C.',
    middleName: 'D.',
    lastName: 'Santos',
    birthDate: '1988-05-14',
    gender: 'Female',
    civilStatus: 'Married',
    address: '42 Sampaguita Street, Purok 2',
    purok: 'Purok 2 - Riverside',
    householdId: 'hh-101',
    isHouseholdHead: false,
    contactNumber: '0917-555-0123',
    email: 'mcsantos88@gmail.com',
    occupation: 'Teacher',
    isSenior: false,
    isPWD: false,
    isVoter: true,
    registeredDate: '2023-11-20',
    status: 'active',
    notes: 'Possible duplicate entered during manual voters masterlist import.'
  },
  {
    id: 'res-003',
    residentNumber: 'B4A-2022-0198',
    firstName: 'Eduardo',
    middleName: 'Villanueva',
    lastName: 'Reyes',
    suffix: 'Sr.',
    birthDate: '1954-10-22',
    gender: 'Male',
    civilStatus: 'Widowed',
    address: '#18 Ilang-Ilang Lane, Purok 1',
    purok: 'Purok 1 - Centro',
    householdId: 'hh-102',
    isHouseholdHead: true,
    contactNumber: '0918-222-4411',
    occupation: 'Retired Government Employee',
    isSenior: true,
    isPWD: false,
    isVoter: true,
    registeredDate: '2015-06-10',
    status: 'active',
    notes: 'President of Senior Citizens Chapter Purok 1.'
  },
  {
    id: 'res-004',
    residentNumber: 'B4A-2023-0442',
    firstName: 'Juan Paolo',
    middleName: 'Alcantara',
    lastName: 'Mendoza',
    birthDate: '2001-08-19',
    gender: 'Male',
    civilStatus: 'Single',
    address: '#7 Mabini Extension, Purok 4',
    purok: 'Purok 4 - Pag-asa',
    householdId: 'hh-103',
    isHouseholdHead: false,
    contactNumber: '0920-987-6543',
    email: 'jp.mendoza@student.edu.ph',
    occupation: 'Recent Graduate / Job Applicant',
    isSenior: false,
    isPWD: false,
    isVoter: true,
    registeredDate: '2021-02-14',
    status: 'active',
    notes: 'Eligible for First-Time Jobseeker certification.'
  },
  {
    id: 'res-005',
    residentNumber: 'B4A-2023-0511',
    firstName: 'Theresa',
    middleName: 'Bernardo',
    lastName: 'Lim',
    birthDate: '1992-12-03',
    gender: 'Female',
    civilStatus: 'Married',
    address: '#88 Acacia St., Purok 3',
    purok: 'Purok 3 - Bukidnon',
    householdId: 'hh-104',
    isHouseholdHead: true,
    contactNumber: '0922-333-8899',
    email: 'theresa.lim@bakery.ph',
    occupation: 'Sari-Sari Store & Bakery Owner',
    isSenior: false,
    isPWD: false,
    isVoter: true,
    registeredDate: '2019-09-01',
    status: 'active',
    notes: 'Proprietor of Lim Neighborhood Bakeshop.'
  },
  {
    id: 'res-006',
    residentNumber: 'B4A-2021-0089',
    firstName: 'Ramonito',
    middleName: 'Bautista',
    lastName: 'Flores',
    birthDate: '1976-04-05',
    gender: 'Male',
    civilStatus: 'Married',
    address: '#12 Camia Street, Purok 5',
    purok: 'Purok 5 - San Roque',
    householdId: 'hh-105',
    isHouseholdHead: true,
    contactNumber: '0919-444-1122',
    occupation: 'Tricycle Driver / HOA Marshal',
    isSenior: false,
    isPWD: true,
    isVoter: true,
    registeredDate: '2016-01-18',
    status: 'active',
    notes: 'PWD ID: PWD-4A-2022-041 (Orthopedic).'
  }
];

export const INITIAL_HOUSEHOLDS: Household[] = [
  {
    id: 'hh-101',
    householdNumber: 'HH-2024-0042',
    headName: 'Maria Corazon Santos',
    headResidentId: 'res-001',
    purok: 'Purok 2 - Riverside',
    address: '#42 Sampaguita St.',
    memberCount: 4,
    monthlyIncomeBracket: '₱25,000 - ₱40,000',
    is4PsBeneficiary: false,
  },
  {
    id: 'hh-102',
    householdNumber: 'HH-2024-0018',
    headName: 'Eduardo Villanueva Reyes Sr.',
    headResidentId: 'res-003',
    purok: 'Purok 1 - Centro',
    address: '#18 Ilang-Ilang Lane',
    memberCount: 2,
    monthlyIncomeBracket: '₱15,000 - ₱25,000',
    is4PsBeneficiary: false,
  },
  {
    id: 'hh-103',
    householdNumber: 'HH-2024-0087',
    headName: 'Arturo Mendoza',
    headResidentId: 'res-004',
    purok: 'Purok 4 - Pag-asa',
    address: '#7 Mabini Extension',
    memberCount: 5,
    monthlyIncomeBracket: '₱12,000 - ₱18,000',
    is4PsBeneficiary: true,
  },
  {
    id: 'hh-104',
    householdNumber: 'HH-2024-0104',
    headName: 'Theresa Bernardo Lim',
    headResidentId: 'res-005',
    purok: 'Purok 3 - Bukidnon',
    address: '#88 Acacia St.',
    memberCount: 3,
    monthlyIncomeBracket: '₱35,000 - ₱50,000',
    is4PsBeneficiary: false,
  },
  {
    id: 'hh-105',
    householdNumber: 'HH-2024-0033',
    headName: 'Ramonito Bautista Flores',
    headResidentId: 'res-006',
    purok: 'Purok 5 - San Roque',
    address: '#12 Camia Street',
    memberCount: 6,
    monthlyIncomeBracket: 'Below ₱12,000',
    is4PsBeneficiary: true,
  }
];

export const INITIAL_DUPLICATE_FLAGS: DuplicateRecordFlag[] = [
  {
    id: 'dup-001',
    sourceResidentId: 'res-001',
    matchedResidentId: 'res-002',
    matchScore: 94,
    matchingFields: [
      'High Name Similarity: "Maria Corazon Santos" vs "Maria C. Santos"',
      'Exact Birthdate Match: May 14, 1988',
      'Identical Address: 42 Sampaguita St., Purok 2',
      'Identical Contact Number: 0917-555-0123'
    ],
    status: 'pending_review',
    detectedDate: '2026-09-08 09:30 AM',
    resolutionNotes: 'Pending desk clerk verification with primary physical masterfile.'
  }
];

export const INITIAL_DOCUMENT_REQUESTS: DocumentRequest[] = [
  {
    id: 'req-001',
    referenceNumber: 'REQ-2026-0819',
    documentType: 'barangay_clearance',
    documentTitle: 'Barangay Clearance',
    residentId: 'res-001',
    residentName: 'Maria Corazon Santos',
    purok: 'Purok 2 - Riverside',
    contactNumber: '0917-555-0123',
    purpose: 'Employment requirement (DepEd teaching promotion)',
    status: 'approved',
    submittedAt: '2026-09-09 08:30 AM',
    updatedAt: '2026-09-09 09:15 AM',
    fee: 50,
    isFreeDueToExemption: false,
    processingMethod: 'pickup',
    appointmentDate: '2026-09-10',
    appointmentTime: '10:00 AM',
    assignedStaffId: 'staff-elena',
    assignedStaffName: 'Elena Ramos (Records)',
    staffNotes: 'Voter records verified. No derogatory record on file. Ready to print.',
    verificationCode: 'VER-B4A-78921-99',
    requirementsSubmitted: [
      { name: 'Valid Government ID (PRC License)', submitted: true, verified: true },
      { name: 'Community Tax Certificate (Cedula)', submitted: true, verified: true },
      { name: '1x1 ID Picture', submitted: true, verified: true }
    ]
  },
  {
    id: 'req-002',
    referenceNumber: 'REQ-2026-0820',
    documentType: 'first_time_jobseeker',
    documentTitle: 'First-Time Jobseeker Certificate (RA 11261)',
    residentId: 'res-004',
    residentName: 'Juan Paolo Alcantara Mendoza',
    purok: 'Purok 4 - Pag-asa',
    contactNumber: '0920-987-6543',
    purpose: 'Pre-employment requirements for BPO / Customer Care specialist',
    status: 'ready_for_release',
    submittedAt: '2026-09-08 02:15 PM',
    updatedAt: '2026-09-09 09:00 AM',
    fee: 0,
    isFreeDueToExemption: true,
    exemptionReason: 'Republic Act 11261 - First Time Jobseekers Assistance Act',
    processingMethod: 'pickup',
    appointmentDate: '2026-09-09',
    appointmentTime: '02:00 PM',
    assignedStaffId: 'staff-elena',
    assignedStaffName: 'Elena Ramos (Records)',
    staffNotes: 'Signed Oath of Undertaking uploaded. Fee waiver applied.',
    verificationCode: 'VER-B4A-44312-01',
    requirementsSubmitted: [
      { name: 'College Transcript / Diploma', submitted: true, verified: true },
      { name: 'Proof of Residency in Barangay 4A', submitted: true, verified: true },
      { name: 'Signed Oath of Undertaking', submitted: true, verified: true }
    ]
  },
  {
    id: 'req-003',
    referenceNumber: 'REQ-2026-0821',
    documentType: 'business_clearance',
    documentTitle: 'Barangay Business Clearance',
    residentId: 'res-005',
    residentName: 'Theresa Bernardo Lim',
    purok: 'Purok 3 - Bukidnon',
    contactNumber: '0922-333-8899',
    purpose: 'Annual City Hall Mayor’s Permit renewal for Neighborhood Bakery',
    status: 'under_review',
    submittedAt: '2026-09-09 09:45 AM',
    updatedAt: '2026-09-09 10:10 AM',
    fee: 350,
    isFreeDueToExemption: false,
    processingMethod: 'express_counter',
    appointmentDate: '2026-09-11',
    appointmentTime: '11:00 AM',
    assignedStaffId: 'staff-elena',
    assignedStaffName: 'Elena Ramos (Records)',
    staffNotes: 'Checking zoning clearance and sanitary permit attachment.',
    verificationCode: 'VER-B4A-55691-34',
    requirementsSubmitted: [
      { name: 'DTI Registration Certificate', submitted: true, verified: true },
      { name: 'Previous Year Clearance', submitted: true, verified: false },
      { name: 'Fire Safety Inspection', submitted: true, verified: false }
    ]
  },
  {
    id: 'req-004',
    referenceNumber: 'REQ-2026-0822',
    documentType: 'certificate_of_indigency',
    documentTitle: 'Certificate of Indigency',
    residentId: 'res-006',
    residentName: 'Ramonito Bautista Flores',
    purok: 'Purok 5 - San Roque',
    contactNumber: '0919-444-1122',
    purpose: 'Medical and surgical assistance endorsement to Malasakit Center / San Pablo General Hospital',
    status: 'completed',
    submittedAt: '2026-09-07 10:00 AM',
    updatedAt: '2026-09-08 11:30 AM',
    completedAt: '2026-09-08 11:30 AM',
    fee: 0,
    isFreeDueToExemption: true,
    exemptionReason: 'Indigent Resident / PWD Category',
    processingMethod: 'digital_copy',
    assignedStaffId: 'staff-elena',
    assignedStaffName: 'Elena Ramos (Records)',
    staffNotes: 'Approved by Kagawad on Health. Certificate released and QR validated.',
    verificationCode: 'VER-B4A-99882-77',
    requirementsSubmitted: [
      { name: 'Medical Abstract from San Pablo General Hospital', submitted: true, verified: true },
      { name: 'PWD ID card', submitted: true, verified: true },
      { name: 'Purok Leader Verification', submitted: true, verified: true }
    ]
  },
  {
    id: 'req-005',
    referenceNumber: 'REQ-2026-0823',
    documentType: 'certificate_of_residency',
    documentTitle: 'Certificate of Residency',
    residentId: 'res-003',
    residentName: 'Eduardo Villanueva Reyes Sr.',
    purok: 'Purok 1 - Centro',
    contactNumber: '0918-222-4411',
    purpose: 'Senior Citizen Social Pension Verification',
    status: 'submitted',
    submittedAt: '2026-09-09 10:30 AM',
    updatedAt: '2026-09-09 10:30 AM',
    fee: 0,
    isFreeDueToExemption: true,
    exemptionReason: 'Senior Citizen Exemption',
    processingMethod: 'pickup',
    appointmentDate: '2026-09-10',
    appointmentTime: '09:00 AM',
    verificationCode: 'VER-B4A-11234-88',
    requirementsSubmitted: [
      { name: 'Senior Citizen ID', submitted: true, verified: false },
      { name: 'Meralco Electric Bill', submitted: true, verified: false }
    ]
  }
];

export const INITIAL_QUEUE: QueueTicket[] = [
  {
    id: 'q-101',
    ticketNumber: 'Q-101',
    residentName: 'Eduardo Villanueva Reyes Sr.',
    residentId: 'res-003',
    serviceTitle: 'Certificate of Residency',
    documentType: 'certificate_of_residency',
    priorityScore: 85,
    priorityFactors: [
      { factor: 'Senior Citizen', points: 30, description: 'Age 71 years old' },
      { factor: 'Scheduled Appointment', points: 15, description: 'Booked online for 10:00 AM slot' },
      { factor: 'Express Service', points: 20, description: 'Single-document express lane' },
      { factor: 'Wait Time Accrual', points: 20, description: 'Arrived at counter 25 mins ago' }
    ],
    isSenior: true,
    isPWD: false,
    isPregnant: false,
    isEmergency: false,
    hasAppointment: true,
    status: 'in_service',
    issuedAt: '2026-09-09 09:35 AM',
    calledAt: '2026-09-09 09:55 AM',
    estimatedWaitMinutes: 2,
    counterNumber: 1
  },
  {
    id: 'q-102',
    ticketNumber: 'Q-102',
    residentName: 'Ramonito Bautista Flores',
    residentId: 'res-006',
    serviceTitle: 'Medical Endorsement & Assistance',
    documentType: 'certificate_of_indigency',
    priorityScore: 80,
    priorityFactors: [
      { factor: 'Person with Disability (PWD)', points: 30, description: 'Orthopedic mobility impairment' },
      { factor: 'Urgent Medical Document', points: 25, description: 'Hospital Malasakit deadline' },
      { factor: 'Purok Endorsed', points: 10, description: 'Endorsed by Purok 5 Leader' },
      { factor: 'Wait Time Accrual', points: 15, description: 'Arrived at 09:40 AM' }
    ],
    isSenior: false,
    isPWD: true,
    isPregnant: false,
    isEmergency: false,
    hasAppointment: false,
    status: 'waiting',
    issuedAt: '2026-09-09 09:40 AM',
    estimatedWaitMinutes: 6,
  },
  {
    id: 'q-103',
    ticketNumber: 'Q-103',
    residentName: 'Liza Marie Perez',
    serviceTitle: 'Barangay Clearance (Employment)',
    documentType: 'barangay_clearance',
    priorityScore: 45,
    priorityFactors: [
      { factor: 'Scheduled Appointment', points: 15, description: 'Confirmed online schedule' },
      { factor: 'Standard Queue', points: 10, description: 'General citizen lane' },
      { factor: 'Wait Time Accrual', points: 20, description: 'Waiting for 18 mins' }
    ],
    isSenior: false,
    isPWD: false,
    isPregnant: false,
    isEmergency: false,
    hasAppointment: true,
    status: 'waiting',
    issuedAt: '2026-09-09 09:45 AM',
    estimatedWaitMinutes: 12,
  },
  {
    id: 'q-104',
    ticketNumber: 'Q-104',
    residentName: 'Theresa Bernardo Lim',
    residentId: 'res-005',
    serviceTitle: 'Business Clearance Inspection Payment',
    documentType: 'business_clearance',
    priorityScore: 35,
    priorityFactors: [
      { factor: 'Commercial Clearance', points: 15, description: 'Business renewal tier' },
      { factor: 'Wait Time Accrual', points: 20, description: 'Arrived at 10:05 AM' }
    ],
    isSenior: false,
    isPWD: false,
    isPregnant: false,
    isEmergency: false,
    hasAppointment: false,
    status: 'waiting',
    issuedAt: '2026-09-09 10:05 AM',
    estimatedWaitMinutes: 18,
  },
  {
    id: 'q-105',
    ticketNumber: 'Q-105',
    residentName: 'Clarissa Santos (Pregnant)',
    serviceTitle: 'Health Center Referral Slip',
    priorityScore: 75,
    priorityFactors: [
      { factor: 'Pregnant Resident', points: 25, description: '3rd Trimester Prenatal Check' },
      { factor: 'Health Priority Lane', points: 30, description: 'Barangay Health Center coordination' },
      { factor: 'Wait Time Accrual', points: 20, description: 'Arrived at 10:10 AM' }
    ],
    isSenior: false,
    isPWD: false,
    isPregnant: true,
    isEmergency: false,
    hasAppointment: false,
    status: 'waiting',
    issuedAt: '2026-09-09 10:10 AM',
    estimatedWaitMinutes: 8,
  }
];

export const INITIAL_INCIDENTS: IncidentReport[] = [
  {
    id: 'inc-001',
    referenceNumber: 'INC-2026-0312',
    category: 'Noise Disturbance',
    title: 'Excessive Karaoke Noise past 10:00 PM',
    description: 'Loud videoke setup outdoors along Sampaguita corner Dahlia St. persisting until 1:30 AM on a Tuesday evening, disrupting students studying for board exams and elderly neighbors.',
    location: 'Corner Sampaguita & Dahlia St., Purok 2',
    purok: 'Purok 2 - Riverside',
    incidentDateTime: '2026-09-08 23:30',
    reporterName: 'Maria Corazon Santos',
    reporterContact: '0917-555-0123',
    isAnonymous: false,
    status: 'in_progress',
    statusHistory: [
      {
        status: 'received',
        updatedAt: '2026-09-09 07:45 AM',
        updatedBy: 'Desk Officer Elena Ramos',
        note: 'Report logged via e-Kapitan Citizen Portal and forwarded to Tanod outpost.'
      },
      {
        status: 'assigned',
        updatedAt: '2026-09-09 08:30 AM',
        updatedBy: 'Capt. Roberto Gomez',
        note: 'Assigned to Tanod Commander Danilo Castro for inspection and neighbor dialogue.'
      },
      {
        status: 'in_progress',
        updatedAt: '2026-09-09 09:15 AM',
        updatedBy: 'Tanod Commander Danilo Castro',
        note: 'First notice of Barangay Ordinance No. 2021-04 (Anti-Noise Pollution) served to household owner. Mediation conference scheduled if repeated.'
      }
    ],
    assignedTo: 'Tanod Commander Danilo Castro',
    assignedRole: 'Barangay Security & Tanod',
    internalNotes: 'Subject household acknowledged notice and agreed to observe quiet hours at 10 PM.',
    submittedAt: '2026-09-09 07:45 AM'
  },
  {
    id: 'inc-002',
    referenceNumber: 'INC-2026-0313',
    category: 'Drainage / Flooding',
    title: 'Clogged Open Canal causing Water Stagnation',
    description: 'Heavy silt and plastic debris blocking the main culvert near the Purok 1 daycare center. Water overflowed during yesterday afternoon brief rain shower.',
    location: 'Near Purok 1 Day Care Center, Ilang-Ilang Lane',
    purok: 'Purok 1 - Centro',
    incidentDateTime: '2026-09-08 16:00',
    reporterName: 'Eduardo Villanueva Reyes Sr.',
    reporterContact: '0918-222-4411',
    isAnonymous: false,
    status: 'assigned',
    statusHistory: [
      {
        status: 'received',
        updatedAt: '2026-09-08 17:00',
        updatedBy: 'Desk Officer Elena Ramos',
        note: 'Received via portal with attached photo of the culvert.'
      },
      {
        status: 'assigned',
        updatedAt: '2026-09-09 08:00 AM',
        updatedBy: 'Hon. Antonio Morales',
        note: 'Forwarded to Barangay Clean & Green Engineering Team for declogging schedule.'
      }
    ],
    assignedTo: 'Engr. Nelson Rivera (Clean & Green Unit)',
    assignedRole: 'Barangay Maintenance',
    internalNotes: 'Scheduled for de-clogging operation tomorrow Thursday, 8:00 AM.',
    submittedAt: '2026-09-08 17:00'
  },
  {
    id: 'inc-003',
    referenceNumber: 'INC-2026-0309',
    category: 'Sanitation & Garbage',
    title: 'Illegal Dumping of Construction Debris on Vacant Lot',
    description: 'Unidentified pick-up truck unloaded cracked hollow blocks, timber, and sacks of cement dust on private vacant lot #15.',
    location: 'Vacant Lot #15, Acacia St., Purok 3',
    purok: 'Purok 3 - Bukidnon',
    incidentDateTime: '2026-09-05 21:00',
    reporterName: 'Concerned Citizen',
    reporterContact: '',
    isAnonymous: true,
    status: 'resolved',
    statusHistory: [
      {
        status: 'received',
        updatedAt: '2026-09-06 08:10 AM',
        updatedBy: 'Desk Officer Elena Ramos',
        note: 'Anonymous report logged with CCTV inquiry request.'
      },
      {
        status: 'assigned',
        updatedAt: '2026-09-06 09:30 AM',
        updatedBy: 'Capt. Roberto Gomez',
        note: 'Barangay CCTV checked at corner Acacia and Bukidnon Ave.'
      },
      {
        status: 'resolved',
        updatedAt: '2026-09-07 14:00',
        updatedBy: 'Tanod Commander Danilo Castro',
        note: 'Contractor identified via CCTV plate number. Contractor was summoned, paid administrative cleanup fee, and completely cleared the site under Tanod supervision.'
      }
    ],
    assignedTo: 'Tanod Commander Danilo Castro',
    assignedRole: 'Barangay Security & Tanod',
    resolutionSummary: 'Debris completely hauled away by identified contractor; site inspected clean.',
    submittedAt: '2026-09-06 08:10 AM'
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'anc-001',
    title: 'Bantay Bagyo: Weather Advisory & Flood Gate Status',
    category: 'Advisory',
    content: 'PAGASA has hoisted Tropical Cyclone Wind Signal No. 1 over Metro Manila. The Barangay 4A Disaster Risk Reduction and Management Council (BDRRMC) is on Blue Alert. Pumping stations on Riverside are 100% operational. Emergency hotline: (02) 8642-1111.',
    date: '2026-09-09',
    author: 'Barangay Disaster Risk Reduction Committee',
    isUrgent: true,
    targetPurok: 'All Puroks (Special focus: Purok 2 Riverside)'
  },
  {
    id: 'anc-002',
    title: 'Free Pneumococcal & Flu Vaccination for Senior Citizens',
    category: 'Health',
    content: 'All registered Senior Citizens (60 years old and above) of Barangay 4A are invited to the Barangay Health Center this coming Friday, 8:00 AM to 3:00 PM. Please bring your Senior Citizen ID and immunization booklet.',
    date: '2026-09-08',
    author: 'Barangay Health Center',
    isUrgent: false,
    targetPurok: 'All Puroks'
  },
  {
    id: 'anc-003',
    title: 'Tapat Ko, Linis Ko: Community Anti-Dengue Clean-up Drive',
    category: 'Event',
    content: 'Join our weekly 4-o’clock habit clean-up drive this Saturday across all puroks. Let us eliminate stagnant water breeding sites for Aedes mosquitoes. Clean & Green volunteers will distribute free larvicide packets.',
    date: '2026-09-06',
    author: 'Committee on Health & Sanitation',
    isUrgent: false,
    targetPurok: 'All Puroks'
  }
];

export const INITIAL_PRIORITY_CRITERIA: PriorityCriteriaConfig[] = [
  {
    id: 'crit-senior',
    name: 'Senior Citizen (60+ years)',
    description: 'Mandatory priority lane under Expanded Senior Citizens Act (RA 9994)',
    points: 30,
    isEnabled: true
  },
  {
    id: 'crit-pwd',
    name: 'Person with Disability (PWD)',
    description: 'Priority queue assistance under Magna Carta for Disabled Persons (RA 7277)',
    points: 30,
    isEnabled: true
  },
  {
    id: 'crit-pregnant',
    name: 'Pregnant Resident',
    description: 'Express assistance lane for expectant mothers',
    points: 25,
    isEnabled: true
  },
  {
    id: 'crit-emergency',
    name: 'Emergency Medical / Disaster Case',
    description: 'Time-critical medical assistance endorsements (hospital/burial)',
    points: 50,
    isEnabled: true
  },
  {
    id: 'crit-appointment',
    name: 'Confirmed Online Appointment',
    description: 'Rewarding citizens who pre-booked online to reduce physical congestion',
    points: 15,
    isEnabled: true
  }
];

export const INITIAL_KNOWLEDGE_BASE: KnowledgeBaseItem[] = [
  {
    id: 'kb-001',
    category: 'Clearance',
    question: 'What are the requirements for Barangay Clearance?',
    answer: 'To get a Barangay Clearance, prepare: 1) Valid Government ID or Student ID with your Barangay 4A address, 2) Community Tax Certificate (Cedula) for the current year, and 3) 1x1 or 2x2 ID picture. Fee is ₱50.00 for employment, ₱100.00 for business, or 100% FREE for First-Time Jobseekers under Republic Act 11261.',
    keywords: ['clearance', 'trabaho', 'cedula', 'requirements', 'fee'],
    lastUpdated: '2026-09-01'
  },
  {
    id: 'kb-002',
    category: 'Residency',
    question: 'How do I prove residency if my billing is under my landlord’s name?',
    answer: 'If the electric/water bill is under your landlord or building owner, you may submit a notarized Lease Contract or an official Certification of Tenancy from your Homeowners Association (HOA) or Purok Leader confirming you have lived in the barangay for at least 6 months.',
    keywords: ['residency', 'landlord', 'rent', 'billing', 'tirahan'],
    lastUpdated: '2026-09-01'
  },
  {
    id: 'kb-003',
    category: 'Indigency',
    question: 'Is there any fee for Certificate of Indigency?',
    answer: 'No. The Certificate of Indigency is completely FREE OF CHARGE (₱0.00). It is strictly non-taxable and free for low-income residents seeking medical, educational, burial, or legal aid through DSWD, Malasakit Centers, or PAO.',
    keywords: ['indigent', 'indigency', 'libre', 'free', 'tulong', 'dswd'],
    lastUpdated: '2026-09-01'
  },
  {
    id: 'kb-004',
    category: 'Office Hours',
    question: 'What are the operating hours of Barangay 4A Hall?',
    answer: 'Barangay Hall is open Monday to Friday from 8:00 AM to 5:00 PM. Cut-off for on-site queue ticketing is 4:30 PM. For 24/7 emergencies, disaster response, and Tanod dispatch, our hotline is (02) 8642-1111.',
    keywords: ['hours', 'oras', 'bukas', 'schedule', 'weekend', 'hotline'],
    lastUpdated: '2026-09-01'
  },
  {
    id: 'kb-005',
    category: 'Disputes & Blotter',
    question: 'How do I file a neighbor complaint or request Lupon mediation?',
    answer: 'You can submit an incident or complaint directly via the e-Kapitan Complaints & Reports module, or visit the Lupon Tagapamayapa desk at the Barangay Hall. Mediation hearings with the Pangkat are conducted every Monday, Wednesday, and Friday from 1:00 PM to 4:00 PM.',
    keywords: ['reklamo', 'complaint', 'lupon', 'blotter', 'away', 'ingay'],
    lastUpdated: '2026-09-01'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-001',
    timestamp: '2026-09-09 10:15:22',
    userName: 'Elena Ramos',
    userRole: 'Staff / Desk Officer',
    action: 'Approved Document Request',
    category: 'Documents',
    details: 'Approved Barangay Clearance REQ-2026-0819 for Maria Corazon Santos. Verified Cedula and PRC ID.'
  },
  {
    id: 'log-002',
    timestamp: '2026-09-09 09:55:04',
    userName: 'Elena Ramos',
    userRole: 'Staff / Desk Officer',
    action: 'Called Queue Ticket',
    category: 'Queue',
    details: 'Called Ticket Q-101 (Eduardo Reyes Sr.) to Counter 1. Priority score 85.'
  },
  {
    id: 'log-003',
    timestamp: '2026-09-09 09:30:11',
    userName: 'System AI Engine',
    userRole: 'System',
    action: 'Duplicate Profile Flagged',
    category: 'Records',
    details: 'Flagged potential duplicate record (DUP-001) for Maria Corazon Santos vs Maria C. Santos with 94% similarity score.'
  },
  {
    id: 'log-004',
    timestamp: '2026-09-09 08:45:19',
    userName: 'Hon. Roberto Gomez',
    userRole: 'Barangay Captain',
    action: 'Updated Priority Criteria',
    category: 'Configuration',
    details: 'Adjusted Emergency Medical priority weight from 40 to 50 points to expedite Malasakit hospital requests.'
  },
  {
    id: 'log-005',
    timestamp: '2026-09-08 16:30:50',
    userName: 'Danilo Castro',
    userRole: 'Tanod Commander',
    action: 'Case Status Updated',
    category: 'Records',
    details: 'Updated INC-2026-0309 status to Resolved. Illegal dumping debris completely removed.'
  }
];

export const ANALYTICS_DATA = {
  todayTransactions: 48,
  pendingRequests: 7,
  activeQueueCount: 4,
  todayAppointments: 12,
  openIncidents: 3,
  staffWorkloadScore: 68, // out of 100
  serviceTrends: [
    { name: 'Barangay Clearance', count: 184, share: '46%' },
    { name: 'Cert. of Residency', count: 96, share: '24%' },
    { name: 'Cert. of Indigency', count: 68, share: '17%' },
    { name: 'Business Clearance', count: 32, share: '8%' },
    { name: 'First-Time Jobseeker', count: 20, share: '5%' },
  ],
  peakHours: [
    { time: '08:00 AM', volume: 14, label: 'Opening Queue' },
    { time: '09:00 AM', volume: 38, label: 'Peak Morning' },
    { time: '10:00 AM', volume: 44, label: 'Peak Office Hours' },
    { time: '11:00 AM', volume: 32, label: 'Pre-Noon Rush' },
    { time: '12:00 PM', volume: 12, label: 'Noon Recess' },
    { time: '01:00 PM', volume: 28, label: 'Afternoon Reopening' },
    { time: '02:00 PM', volume: 40, label: 'Peak Afternoon' },
    { time: '03:00 PM', volume: 30, label: 'Regular' },
    { time: '04:00 PM', volume: 18, label: 'Cut-off Approaching' }
  ],
  weeklyVolume: [
    { day: 'Mon', count: 82 },
    { day: 'Tue', count: 74 },
    { day: 'Wed', count: 89 },
    { day: 'Thu', count: 68 },
    { day: 'Fri', count: 95 }
  ],
  staffWorkload: [
    { staffName: 'Elena Ramos', role: 'Records & Clearance', activeQueue: 4, processedToday: 18, capacity: '82%' },
    { staffName: 'Mark Bautista', role: 'Business Permits & Taxes', activeQueue: 2, processedToday: 9, capacity: '54%' },
    { staffName: 'Kag. Dr. Evelyn Cruz', role: 'Health & Social Welfare', activeQueue: 3, processedToday: 12, capacity: '70%' },
    { staffName: 'Danilo Castro', role: 'Tanod & Blotter Desk', activeQueue: 1, processedToday: 6, capacity: '45%' },
  ],
  demandForecast: [
    {
      service: 'First-Time Jobseeker Certificate',
      projectedChange: '+45% Increase',
      trendReason: 'College & Senior High School graduation season (Q2 peak)',
      confidence: 'High (Historical trend)',
      suggestedAction: 'Dedicate 1 extra express validation lane for jobseekers on Monday mornings.'
    },
    {
      service: 'Certificate of Residency',
      projectedChange: '+30% Increase',
      trendReason: 'DepEd public school enrollment window starting in 2 weeks',
      confidence: 'Moderate (Registration calendar)',
      suggestedAction: 'Encourage online batch requests through e-Kapitan portal to reduce in-person lines.'
    },
    {
      service: 'Barangay Business Clearance',
      projectedChange: '-15% Normalizing',
      trendReason: 'Annual January/Q1 tax renewal period concluded; standard steady volume expected.',
      confidence: 'High (Post-tax season pattern)',
      suggestedAction: 'Maintain single counter processing; allocate staff to records digitization.'
    }
  ]
};
