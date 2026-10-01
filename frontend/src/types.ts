export type UserRole = 'citizen' | 'staff' | 'official';

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  roleTitle: string;
  email: string;
  avatar?: string;
  residentId?: string;
}

export type ResidentStatus = 'active' | 'archived' | 'deceased' | 'transferred';

export interface Official {
  id: string;
  name: string;
  position: string;
  committee: string;
  contactDetails: string;
  isActive: boolean;
  avatarUrl?: string;
}

export interface Resident {
  id: string;
  residentNumber: string; // e.g., "B4A-2024-0012"
  firstName: string;
  middleName?: string;
  lastName: string;
  suffix?: string;
  birthDate: string;
  gender: 'Male' | 'Female' | 'Other';
  civilStatus: 'Single' | 'Married' | 'Widowed' | 'Separated';
  address: string;
  purok: string; // e.g. "Purok 1 - Riverside"
  householdId: string;
  isHouseholdHead: boolean;
  contactNumber: string;
  email?: string;
  occupation: string;
  isSenior: boolean;
  isPWD: boolean;
  isIndigent?: boolean;
  isVoter: boolean;
  registeredDate: string;
  status: ResidentStatus;
  notes?: string;
}

export interface Household {
  id: string;
  householdNumber: string;
  headName: string;
  headResidentId: string;
  purok: string;
  address: string;
  memberCount: number;
  monthlyIncomeBracket: string;
  is4PsBeneficiary: boolean;
}

export interface DuplicateRecordFlag {
  id: string;
  sourceResidentId: string;
  matchedResidentId: string;
  matchScore: number; // 0-100%
  matchingFields: string[]; // e.g. ["Name similarity: 92%", "Exact birthdate match", "Same Purok"]
  status: 'pending_review' | 'resolved_merged' | 'resolved_kept_separate' | 'false_positive';
  detectedDate: string;
  reviewedBy?: string;
  resolutionNotes?: string;
}

export type DocumentType = 
  | 'barangay_clearance' 
  | 'certificate_of_residency' 
  | 'certificate_of_indigency' 
  | 'business_clearance' 
  | 'first_time_jobseeker'
  | 'good_moral';

export type RequestStatus = 
  | 'submitted' 
  | 'under_review' 
  | 'approved' 
  | 'ready_for_release' 
  | 'completed' 
  | 'rejected';

export interface DocumentRequest {
  id: string;
  referenceNumber: string; // e.g. "REQ-2026-0819"
  documentType: DocumentType;
  documentTitle: string;
  residentId: string;
  residentName: string;
  purok: string;
  contactNumber: string;
  purpose: string;
  status: RequestStatus;
  submittedAt: string;
  updatedAt: string;
  completedAt?: string;
  fee: number;
  isFreeDueToExemption: boolean; // e.g. First-time jobseeker or indigency
  exemptionReason?: string;
  processingMethod: 'pickup' | 'express_counter' | 'digital_copy';
  appointmentDate?: string;
  appointmentTime?: string;
  assignedStaffId?: string;
  assignedStaffName?: string;
  staffNotes?: string;
  verificationCode: string; // Hash for QR verification
  rejectionReason?: string;
  requirementsSubmitted: {
    name: string;
    submitted: boolean;
    verified: boolean;
  }[];
}

export interface ServiceItem {
  id: DocumentType | string;
  title: string;
  category: 'Clearance' | 'Certification' | 'Permit' | 'Social Service';
  description: string;
  fee: number;
  isFreeForEligible: boolean;
  eligibleCriteria: string;
  processingTime: string;
  requirements: string[];
  validityMonths: number;
  availableOnline: boolean;
}

export type QueueStatus = 'waiting' | 'called' | 'in_service' | 'completed' | 'no_show';

export interface QueueTicket {
  id: string;
  ticketNumber: string; // e.g. "Q-104"
  residentName: string;
  residentId?: string;
  serviceTitle: string;
  documentType?: DocumentType;
  priorityScore: number; // 0 - 100
  priorityFactors: {
    factor: string;
    points: number;
    description: string;
  }[];
  isSenior: boolean;
  isPWD: boolean;
  isPregnant: boolean;
  isEmergency: boolean;
  hasAppointment: boolean;
  status: QueueStatus;
  issuedAt: string;
  calledAt?: string;
  completedAt?: string;
  estimatedWaitMinutes: number;
  counterNumber?: number;
}

export type IncidentCategory = 
  | 'Noise Disturbance' 
  | 'Neighbor Dispute' 
  | 'Sanitation & Garbage' 
  | 'Public Safety / Streetlight' 
  | 'Stray Animal Concern' 
  | 'Drainage / Flooding' 
  | 'Other Community Concern';

export type IncidentStatus = 
  | 'received' 
  | 'assigned' 
  | 'in_progress' 
  | 'hearing_scheduled' 
  | 'resolved' 
  | 'dismissed';

export interface IncidentReport {
  id: string;
  referenceNumber: string; // e.g. "INC-2026-0312"
  category: IncidentCategory;
  title: string;
  description: string;
  location: string;
  purok: string;
  incidentDateTime: string;
  reporterName: string;
  reporterContact: string;
  isAnonymous: boolean;
  status: IncidentStatus;
  statusHistory: {
    status: IncidentStatus;
    updatedAt: string;
    updatedBy: string;
    note: string;
  }[];
  assignedTo?: string;
  assignedRole?: string;
  internalNotes?: string;
  resolutionSummary?: string;
  submittedAt: string;
}

export interface Appointment {
  id: string;
  residentName: string;
  residentId: string;
  contactNumber: string;
  serviceTitle: string;
  date: string;
  timeSlot: string; // e.g. "09:00 AM - 10:00 AM"
  status: 'confirmed' | 'completed' | 'cancelled' | 'rescheduled';
  referenceNumber: string;
}

export interface Announcement {
  id: string;
  title: string;
  category: 'Advisory' | 'Health' | 'Event' | 'Program' | 'Emergency';
  content: string;
  date: string;
  author: string;
  isUrgent: boolean;
  targetPurok?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userName: string;
  userRole: string;
  action: string;
  category: 'Records' | 'Documents' | 'Queue' | 'Security' | 'Configuration';
  details: string;
  ipAddress?: string;
}

export interface KnowledgeBaseItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  keywords: string[];
  lastUpdated: string;
}

export interface PriorityCriteriaConfig {
  id: string;
  name: string;
  description: string;
  points: number;
  isEnabled: boolean;
}
