import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserRole, 
  UserProfile, 
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
  RequestStatus,
  IncidentStatus
} from '../types';
import { 
  INITIAL_SERVICES, 
  INITIAL_RESIDENTS, 
  INITIAL_HOUSEHOLDS, 
  INITIAL_DUPLICATE_FLAGS, 
  INITIAL_DOCUMENT_REQUESTS, 
  INITIAL_QUEUE, 
  INITIAL_INCIDENTS, 
  INITIAL_ANNOUNCEMENTS, 
  INITIAL_PRIORITY_CRITERIA, 
  INITIAL_KNOWLEDGE_BASE, 
  INITIAL_AUDIT_LOGS 
} from '../data/mockData';

export interface ToastMessage {
  id: string;
  title: string;
  description: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface BarangayContextType {
  // Authentication / Role
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  currentUser: UserProfile;
  switchUserRole: (role: UserRole) => void;

  // Navigation
  activeTab: string;
  setActiveTab: (tab: string) => void;

  // Accessibility
  largeTextMode: boolean;
  setLargeTextMode: (val: boolean | ((prev: boolean) => boolean)) => void;

  // Data
  services: ServiceItem[];
  residents: Resident[];
  households: Household[];
  duplicateFlags: DuplicateRecordFlag[];
  documentRequests: DocumentRequest[];
  queueTickets: QueueTicket[];
  incidents: IncidentReport[];
  appointments: Appointment[];
  announcements: Announcement[];
  auditLogs: AuditLog[];
  knowledgeBase: KnowledgeBaseItem[];
  priorityCriteria: PriorityCriteriaConfig[];

  // Interactive Operations
  createDocumentRequest: (data: Partial<DocumentRequest>) => DocumentRequest;
  updateDocumentRequestStatus: (id: string, status: RequestStatus, staffNotes?: string, rejectionReason?: string) => void;
  
  createQueueTicket: (data: Partial<QueueTicket>) => QueueTicket;
  callQueueTicket: (ticketId: string, counterNumber?: number) => void;
  completeQueueTicket: (ticketId: string) => void;
  dismissQueueTicket: (ticketId: string) => void;
  
  createIncidentReport: (data: Partial<IncidentReport>) => IncidentReport;
  updateIncidentReportStatus: (id: string, status: IncidentStatus, note: string, assignedTo?: string) => void;
  
  registerResident: (data: Omit<Resident, 'id' | 'residentNumber' | 'registeredDate'>) => Resident;
  resolveDuplicateFlag: (flagId: string, resolution: 'merge' | 'keep_separate' | 'false_positive', notes: string) => void;
  
  updatePriorityConfig: (id: string, updates: Partial<PriorityCriteriaConfig>) => void;
  addKnowledgeItem: (item: Omit<KnowledgeBaseItem, 'id' | 'lastUpdated'>) => void;
  updateKnowledgeItem: (id: string, updates: Partial<KnowledgeBaseItem>) => void;
  
  bookAppointment: (data: Omit<Appointment, 'id' | 'referenceNumber'>) => Appointment;

  // Modals / Inspections
  selectedRequestForReview: DocumentRequest | null;
  setSelectedRequestForReview: (req: DocumentRequest | null) => void;
  selectedTicketForExplanation: QueueTicket | null;
  setSelectedTicketForExplanation: (ticket: QueueTicket | null) => void;
  selectedDocumentForPrint: DocumentRequest | null;
  setSelectedDocumentForPrint: (doc: DocumentRequest | null) => void;
  selectedIncidentForView: IncidentReport | null;
  setSelectedIncidentForView: (inc: IncidentReport | null) => void;

  // Verification
  verifyDocumentCode: (code: string) => { found: boolean; document?: DocumentRequest; message: string };

  // Toast Alerts
  toasts: ToastMessage[];
  addToast: (title: string, description: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
}

const BarangayContext = createContext<BarangayContextType | undefined>(undefined);

const ROLE_PROFILES: Record<UserRole, UserProfile> = {
  citizen: {
    id: 'user-maria',
    name: 'Maria Corazon Santos',
    role: 'citizen',
    roleTitle: 'Resident / Citizen (Purok 2)',
    email: 'maria.santos@email.ph',
    residentId: 'res-001',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
  },
  staff: {
    id: 'user-elena',
    name: 'Elena Ramos',
    role: 'staff',
    roleTitle: 'Barangay Desk Officer & Records Custodian',
    email: 'elena.records@barangaysanjose.gov.ph',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
  },
  official: {
    id: 'user-roberto',
    name: 'Hon. Roberto V. Gomez',
    role: 'official',
    roleTitle: 'Punong Barangay / Chief Administrator',
    email: 'captain.gomez@barangaysanjose.gov.ph',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  }
};

export const BarangayProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>('citizen');
  const [currentUser, setCurrentUser] = useState<UserProfile>(ROLE_PROFILES.citizen);
  const [activeTab, setActiveTab] = useState<string>('home');
  const [largeTextMode, setLargeTextMode] = useState<boolean>(false);

  // Data states
  const [services] = useState<ServiceItem[]>(INITIAL_SERVICES);
  const [residents, setResidents] = useState<Resident[]>(INITIAL_RESIDENTS);
  const [households] = useState<Household[]>(INITIAL_HOUSEHOLDS);
  const [duplicateFlags, setDuplicateFlags] = useState<DuplicateRecordFlag[]>(INITIAL_DUPLICATE_FLAGS);
  const [documentRequests, setDocumentRequests] = useState<DocumentRequest[]>(INITIAL_DOCUMENT_REQUESTS);
  const [queueTickets, setQueueTickets] = useState<QueueTicket[]>(INITIAL_QUEUE);
  const [incidents, setIncidents] = useState<IncidentReport[]>(INITIAL_INCIDENTS);
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 'apt-001',
      residentName: 'Eduardo Villanueva Reyes Sr.',
      residentId: 'res-003',
      contactNumber: '0918-222-4411',
      serviceTitle: 'Certificate of Residency',
      date: '2026-09-10',
      timeSlot: '09:00 AM - 10:00 AM',
      status: 'confirmed',
      referenceNumber: 'APT-2026-0044'
    }
  ]);
  const [announcements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);
  const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeBaseItem[]>(INITIAL_KNOWLEDGE_BASE);
  const [priorityCriteria, setPriorityCriteria] = useState<PriorityCriteriaConfig[]>(INITIAL_PRIORITY_CRITERIA);

  // Selected modals
  const [selectedRequestForReview, setSelectedRequestForReview] = useState<DocumentRequest | null>(null);
  const [selectedTicketForExplanation, setSelectedTicketForExplanation] = useState<QueueTicket | null>(null);
  const [selectedDocumentForPrint, setSelectedDocumentForPrint] = useState<DocumentRequest | null>(null);
  const [selectedIncidentForView, setSelectedIncidentForView] = useState<IncidentReport | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (title: string, description: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    const id = 'toast-' + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const logAudit = (action: string, category: 'Records' | 'Documents' | 'Queue' | 'Security' | 'Configuration', details: string) => {
    const newLog: AuditLog = {
      id: 'log-' + Date.now(),
      timestamp: new Date().toLocaleString('en-US', { hour12: false }),
      userName: currentUser.name,
      userRole: currentUser.roleTitle,
      action,
      category,
      details,
      ipAddress: '192.168.1.45 (Local Node)'
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const switchUserRole = (role: UserRole) => {
    setCurrentRole(role);
    setCurrentUser(ROLE_PROFILES[role]);
    // Set natural starting tab
    if (role === 'citizen') {
      setActiveTab('home');
    } else if (role === 'staff') {
      setActiveTab('dashboard');
    } else {
      setActiveTab('executive_dashboard');
    }
    addToast(
      `Role switched to ${ROLE_PROFILES[role].roleTitle}`,
      `Viewing the platform as ${ROLE_PROFILES[role].name}`,
      'info'
    );
  };

  const createDocumentRequest = (data: Partial<DocumentRequest>): DocumentRequest => {
    const refNum = `REQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const verCode = `VER-BSJ-${Math.floor(10000 + Math.random() * 90000)}-${Math.floor(10 + Math.random() * 90)}`;
    
    const newReq: DocumentRequest = {
      id: 'req-' + Date.now(),
      referenceNumber: refNum,
      documentType: data.documentType || 'barangay_clearance',
      documentTitle: data.documentTitle || 'Barangay Clearance',
      residentId: data.residentId || currentUser.residentId || 'res-001',
      residentName: data.residentName || currentUser.name,
      purok: data.purok || 'Purok 2 - Riverside',
      contactNumber: data.contactNumber || '0917-555-0123',
      purpose: data.purpose || 'General Requirement',
      status: 'submitted',
      submittedAt: new Date().toLocaleString('en-US', { hour12: true, month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      updatedAt: new Date().toLocaleString('en-US', { hour12: true, month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      fee: data.fee !== undefined ? data.fee : 50,
      isFreeDueToExemption: !!data.isFreeDueToExemption,
      exemptionReason: data.exemptionReason,
      processingMethod: data.processingMethod || 'pickup',
      appointmentDate: data.appointmentDate,
      appointmentTime: data.appointmentTime,
      verificationCode: verCode,
      requirementsSubmitted: data.requirementsSubmitted || [
        { name: 'Valid Government ID', submitted: true, verified: false },
        { name: 'Proof of Residency or Billing', submitted: true, verified: false }
      ]
    };

    setDocumentRequests((prev) => [newReq, ...prev]);

    // Also auto-generate a queue ticket if express counter or scheduled for today
    if (data.processingMethod === 'express_counter') {
      createQueueTicket({
        residentName: newReq.residentName,
        residentId: newReq.residentId,
        serviceTitle: newReq.documentTitle,
        documentType: newReq.documentType,
        isSenior: false,
        isPWD: false,
        isPregnant: false,
        isEmergency: false,
        hasAppointment: true
      });
    }

    logAudit('Submitted Document Request', 'Documents', `Reference ${refNum} for ${newReq.residentName} (${newReq.documentTitle})`);
    addToast('Request Submitted Successfully', `Tracking reference: ${refNum}. You can monitor status in real-time.`, 'success');
    return newReq;
  };

  const updateDocumentRequestStatus = (id: string, status: RequestStatus, staffNotes?: string, rejectionReason?: string) => {
    setDocumentRequests((prev) =>
      prev.map((req) => {
        if (req.id === id) {
          const updated: DocumentRequest = {
            ...req,
            status,
            updatedAt: new Date().toLocaleString('en-US', { hour12: true, month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
            staffNotes: staffNotes !== undefined ? staffNotes : req.staffNotes,
            rejectionReason: rejectionReason !== undefined ? rejectionReason : req.rejectionReason,
            assignedStaffName: currentUser.name,
            completedAt: status === 'completed' ? new Date().toLocaleString('en-US', { hour12: true, month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : req.completedAt
          };
          return updated;
        }
        return req;
      })
    );

    const statusLabels: Record<RequestStatus, string> = {
      submitted: 'Submitted',
      under_review: 'Under Review',
      approved: 'Approved',
      ready_for_release: 'Ready for Release',
      completed: 'Completed',
      rejected: 'Rejected'
    };

    logAudit(`Updated Document Status to ${statusLabels[status]}`, 'Documents', `Request ID: ${id}. Staff: ${currentUser.name}`);
    addToast('Request Status Updated', `Document request moved to "${statusLabels[status]}".`, 'success');
  };

  const calculatePriority = (params: {
    isSenior?: boolean;
    isPWD?: boolean;
    isPregnant?: boolean;
    isEmergency?: boolean;
    hasAppointment?: boolean;
  }) => {
    let score = 20; // baseline wait score
    const factors: { factor: string; points: number; description: string }[] = [
      { factor: 'Base Citizen Queue', points: 20, description: 'General citizen arrival order' }
    ];

    if (params.isEmergency) {
      score += 50;
      factors.push({ factor: 'Emergency Medical / Urgent', points: 50, description: 'Urgent hospital or crisis endorsement' });
    }
    if (params.isSenior) {
      score += 30;
      factors.push({ factor: 'Senior Citizen Priority (RA 9994)', points: 30, description: 'Senior citizen lane entitlement' });
    }
    if (params.isPWD) {
      score += 30;
      factors.push({ factor: 'PWD Priority (RA 7277)', points: 30, description: 'Magna Carta for Persons with Disability' });
    }
    if (params.isPregnant) {
      score += 25;
      factors.push({ factor: 'Expectant Mother Priority', points: 25, description: 'Maternal health convenience lane' });
    }
    if (params.hasAppointment) {
      score += 15;
      factors.push({ factor: 'Online Scheduled Appointment', points: 15, description: 'Pre-booked time window via e-Kapitan portal' });
    }

    return { score, factors };
  };

  const createQueueTicket = (data: Partial<QueueTicket>): QueueTicket => {
    const nextNum = 'Q-' + (100 + queueTickets.length + 1);
    const { score, factors } = calculatePriority({
      isSenior: data.isSenior,
      isPWD: data.isPWD,
      isPregnant: data.isPregnant,
      isEmergency: data.isEmergency,
      hasAppointment: data.hasAppointment
    });

    const newTicket: QueueTicket = {
      id: 'q-' + Date.now(),
      ticketNumber: nextNum,
      residentName: data.residentName || 'Citizen Visitor',
      residentId: data.residentId,
      serviceTitle: data.serviceTitle || 'General Barangay Inquiry',
      documentType: data.documentType,
      priorityScore: score,
      priorityFactors: factors,
      isSenior: !!data.isSenior,
      isPWD: !!data.isPWD,
      isPregnant: !!data.isPregnant,
      isEmergency: !!data.isEmergency,
      hasAppointment: !!data.hasAppointment,
      status: 'waiting',
      issuedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      estimatedWaitMinutes: Math.max(3, Math.round((100 - score) / 5))
    };

    setQueueTickets((prev) => [...prev, newTicket]);
    logAudit('Generated Queue Ticket', 'Queue', `Ticket ${nextNum} for ${newTicket.residentName} (Priority: ${score})`);
    addToast(`Queue Ticket Issued: ${nextNum}`, `Estimated wait: ~${newTicket.estimatedWaitMinutes} minutes.`, 'info');
    return newTicket;
  };

  const callQueueTicket = (ticketId: string, counterNumber: number = 1) => {
    setQueueTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          return {
            ...t,
            status: 'in_service',
            calledAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            counterNumber
          };
        }
        return t;
      })
    );
    const ticket = queueTickets.find((t) => t.id === ticketId);
    logAudit('Called Queue Ticket', 'Queue', `Ticket ${ticket?.ticketNumber} to Counter ${counterNumber}`);
    addToast(`Calling ${ticket?.ticketNumber}`, `Resident: ${ticket?.residentName} to Counter ${counterNumber}`, 'info');
  };

  const completeQueueTicket = (ticketId: string) => {
    setQueueTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          return {
            ...t,
            status: 'completed',
            completedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
        }
        return t;
      })
    );
    const ticket = queueTickets.find((t) => t.id === ticketId);
    logAudit('Completed Queue Service', 'Queue', `Ticket ${ticket?.ticketNumber} served successfully.`);
    addToast('Service Completed', `Ticket ${ticket?.ticketNumber} marked as served.`, 'success');
  };

  const dismissQueueTicket = (ticketId: string) => {
    setQueueTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, status: 'no_show' } : t))
    );
    addToast('Ticket Marked as No Show', 'Ticket skipped and archived.', 'warning');
  };

  const createIncidentReport = (data: Partial<IncidentReport>): IncidentReport => {
    const refNum = `INC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newInc: IncidentReport = {
      id: 'inc-' + Date.now(),
      referenceNumber: refNum,
      category: data.category || 'Other Community Concern',
      title: data.title || 'Barangay Concern Report',
      description: data.description || '',
      location: data.location || 'Barangay San Jose',
      purok: data.purok || 'Purok 1 - Centro',
      incidentDateTime: data.incidentDateTime || new Date().toISOString().substring(0, 16).replace('T', ' '),
      reporterName: data.isAnonymous ? 'Anonymous Resident' : (data.reporterName || currentUser.name),
      reporterContact: data.isAnonymous ? '' : (data.reporterContact || currentUser.email),
      isAnonymous: !!data.isAnonymous,
      status: 'received',
      statusHistory: [
        {
          status: 'received',
          updatedAt: new Date().toLocaleString('en-US', { hour12: true, month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
          updatedBy: currentUser.name,
          note: 'Report submitted via e-Kapitan Citizen Portal and queued for staff review.'
        }
      ],
      submittedAt: new Date().toLocaleString('en-US', { hour12: true, month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    };

    setIncidents((prev) => [newInc, ...prev]);
    logAudit('Submitted Community Incident Report', 'Records', `Incident Ref ${refNum}: ${newInc.title}`);
    addToast('Report Filed Successfully', `Reference code: ${refNum}. The barangay team will review this report.`, 'success');
    return newInc;
  };

  const updateIncidentReportStatus = (id: string, status: IncidentStatus, note: string, assignedTo?: string) => {
    setIncidents((prev) =>
      prev.map((inc) => {
        if (inc.id === id) {
          const updatedHistory = [
            ...inc.statusHistory,
            {
              status,
              updatedAt: new Date().toLocaleString('en-US', { hour12: true, month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
              updatedBy: currentUser.name,
              note
            }
          ];
          return {
            ...inc,
            status,
            statusHistory: updatedHistory,
            assignedTo: assignedTo || inc.assignedTo,
            internalNotes: note || inc.internalNotes,
            resolutionSummary: status === 'resolved' ? note : inc.resolutionSummary
          };
        }
        return inc;
      })
    );
    logAudit(`Updated Incident Status to ${status}`, 'Records', `Incident ID: ${id}. Staff: ${currentUser.name}`);
    addToast('Incident Record Updated', `Status changed to ${status}.`, 'success');
  };

  const registerResident = (data: Omit<Resident, 'id' | 'residentNumber' | 'registeredDate'>): Resident => {
    const resNum = `BSJ-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newResident: Resident = {
      ...data,
      id: 'res-' + Date.now(),
      residentNumber: resNum,
      registeredDate: new Date().toISOString().split('T')[0]
    };

    // Automated duplicate check simulation
    const match = residents.find((r) => 
      (r.lastName.toLowerCase() === data.lastName.toLowerCase() && r.birthDate === data.birthDate) ||
      (r.contactNumber && r.contactNumber === data.contactNumber)
    );

    if (match) {
      const newFlag: DuplicateRecordFlag = {
        id: 'dup-' + Date.now(),
        sourceResidentId: newResident.id,
        matchedResidentId: match.id,
        matchScore: 88,
        matchingFields: [
          `Identical Last Name: "${data.lastName}"`,
          `Matching Birthdate: ${data.birthDate}`,
          `Same Purok Area: ${data.purok}`
        ],
        status: 'pending_review',
        detectedDate: new Date().toLocaleString('en-US', { hour12: true, month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
        resolutionNotes: 'Profile matching algorithm detected potential duplicate record upon registration.'
      };
      setDuplicateFlags((prev) => [newFlag, ...prev]);
      addToast(
        'Advisory Warning: Potential Duplicate Detected',
        `A similar profile exists for "${match.firstName} ${match.lastName}". Flagged for staff review.`,
        'warning'
      );
    }

    setResidents((prev) => [newResident, ...prev]);
    logAudit('Registered New Resident', 'Records', `Resident ${resNum}: ${newResident.firstName} ${newResident.lastName}`);
    addToast('Resident Registered', `Assigned Barangay ID: ${resNum}`, 'success');
    return newResident;
  };

  const resolveDuplicateFlag = (flagId: string, resolution: 'merge' | 'keep_separate' | 'false_positive', notes: string) => {
    setDuplicateFlags((prev) =>
      prev.map((f) => {
        if (f.id === flagId) {
          const statusMap = {
            merge: 'resolved_merged' as const,
            keep_separate: 'resolved_kept_separate' as const,
            false_positive: 'false_positive' as const
          };
          return {
            ...f,
            status: statusMap[resolution],
            reviewedBy: currentUser.name,
            resolutionNotes: notes
          };
        }
        return f;
      })
    );
    logAudit(`Resolved Duplicate Advisory (${resolution})`, 'Records', `Flag ID ${flagId}. Reviewer: ${currentUser.name}. Notes: ${notes}`);
    addToast('Duplicate Advisory Resolved', `Action recorded: ${resolution.replace('_', ' ')}`, 'success');
  };

  const updatePriorityConfig = (id: string, updates: Partial<PriorityCriteriaConfig>) => {
    setPriorityCriteria((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
    logAudit('Updated Priority Criteria', 'Configuration', `Modified criterion ${id}: ${JSON.stringify(updates)}`);
    addToast('Priority Weight Updated', 'Queue calculation formula updated.', 'info');
  };

  const addKnowledgeItem = (item: Omit<KnowledgeBaseItem, 'id' | 'lastUpdated'>) => {
    const newItem: KnowledgeBaseItem = {
      ...item,
      id: 'kb-' + Date.now(),
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    setKnowledgeBase((prev) => [newItem, ...prev]);
    logAudit('Added AI Knowledge Item', 'Configuration', `New FAQ added: "${item.question}"`);
    addToast('Knowledge Base Updated', 'AI Citizen Assistant will now incorporate this entry.', 'success');
  };

  const updateKnowledgeItem = (id: string, updates: Partial<KnowledgeBaseItem>) => {
    setKnowledgeBase((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates, lastUpdated: new Date().toISOString().split('T')[0] } : item))
    );
    logAudit('Updated AI Knowledge Item', 'Configuration', `Edited FAQ item ${id}`);
    addToast('Knowledge Base Entry Updated', 'Changes saved successfully.', 'success');
  };

  const bookAppointment = (data: Omit<Appointment, 'id' | 'referenceNumber'>): Appointment => {
    const refNum = `APT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newApt: Appointment = {
      ...data,
      id: 'apt-' + Date.now(),
      referenceNumber: refNum
    };
    setAppointments((prev) => [newApt, ...prev]);
    logAudit('Scheduled Citizen Appointment', 'Queue', `Appointment ${refNum} on ${data.date} (${data.timeSlot})`);
    addToast('Appointment Confirmed', `Scheduled for ${data.date} at ${data.timeSlot}. Reference: ${refNum}`, 'success');
    return newApt;
  };

  const verifyDocumentCode = (code: string): { found: boolean; document?: DocumentRequest; message: string } => {
    const cleanCode = code.trim().toUpperCase();
    const doc = documentRequests.find(
      (d) => d.referenceNumber.toUpperCase() === cleanCode || d.verificationCode.toUpperCase() === cleanCode
    );

    if (doc) {
      if (doc.status === 'completed' || doc.status === 'ready_for_release' || doc.status === 'approved') {
        return {
          found: true,
          document: doc,
          message: 'Document record verified as authentic and legally issued by Barangay San Jose.'
        };
      }
      return {
        found: true,
        document: doc,
        message: `Record exists in the system but is currently "${doc.status.toUpperCase()}". Official release seal not yet finalized.`
      };
    }

    return {
      found: false,
      message: 'No matching barangay record was found for this reference code or QR stamp. Verify the code or contact the Barangay Hall.'
    };
  };

  return (
    <BarangayContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        currentUser,
        switchUserRole,
        activeTab,
        setActiveTab,
        largeTextMode,
        setLargeTextMode,
        services,
        residents,
        households,
        duplicateFlags,
        documentRequests,
        queueTickets,
        incidents,
        appointments,
        announcements,
        auditLogs,
        knowledgeBase,
        priorityCriteria,
        createDocumentRequest,
        updateDocumentRequestStatus,
        createQueueTicket,
        callQueueTicket,
        completeQueueTicket,
        dismissQueueTicket,
        createIncidentReport,
        updateIncidentReportStatus,
        registerResident,
        resolveDuplicateFlag,
        updatePriorityConfig,
        addKnowledgeItem,
        updateKnowledgeItem,
        bookAppointment,
        selectedRequestForReview,
        setSelectedRequestForReview,
        selectedTicketForExplanation,
        setSelectedTicketForExplanation,
        selectedDocumentForPrint,
        setSelectedDocumentForPrint,
        selectedIncidentForView,
        setSelectedIncidentForView,
        verifyDocumentCode,
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </BarangayContext.Provider>
  );
};

export const useBarangay = () => {
  const context = useContext(BarangayContext);
  if (!context) {
    throw new Error('useBarangay must be used within a BarangayProvider');
  }
  return context;
};
