# e-Kapitan — Project Context

> Source: thesis proposal "The Effectiveness of e-Kapitan in Improving Barangay Information Management, Service Delivery, and Administrative Decision-Making" (ITE P403 – Thesis Writing I, Laguna College, San Pablo City, October 2026). Everything below comes from the paper unless marked **[Suggested]**, which means it is an implementation inference, not something the paper specifies.

---

## 1. What it is

**e-Kapitan** is a **web-based intelligent barangay information management and decision support system**. It centralizes resident and household data, digitizes frontline barangay services, automates routine tasks, and gives officials data-driven and predictive insights for planning.

- **Delivery:** web app only (desktop and mobile browsers). No native Android/iOS apps, no offline mode, requires internet.
- **Deployment site:** Barangay 4A, San Pablo City, Laguna (single-barangay implementation and evaluation). The barangay is near Sampaloc Lake, which draws non-resident visitors, which is why Guest Mode exists.
- **Research design:** descriptive-developmental (R&D), built with **Rapid Application Development (RAD)**: Requirements Planning → User Design → Construction → Cutover.
- **Core design principle:** most algorithms are rule-based or use established, interpretable methods. Any AI output is **advisory** and reviewed by authorized personnel. Weights and thresholds are configured by the barangay.

## 2. Problem it solves

Barangay offices still rely on manual, paper-based, fragmented processes: logbooks, paper files, notebooks for complaints, walk-in queues. Results:

- Hard to retrieve accurate resident information
- Long queues, delays, repeated physical visits (some residents live far from the hall)
- Inconsistent document verification
- No centralized data for planning (staffing, scheduling, workload)
- Reports not promptly assigned to responsible officials, especially when they're absent
- No forecasting for recurring seasonal concerns (e.g., dengue, medical assistance requests)

**Gap claimed:** existing systems (LGUSS-BIMS, BALANGAY, Webyu, iPlan Gov, general government chatbots) each cover only some functions. e-Kapitan integrates them in one barangay-level platform.

## 3. Users and roles

| Role | Description |
|---|---|
| Administrator | User account management, directory updates, system configuration |
| Barangay Captain | Confirms/changes/rejects AI recommendations; views reports and dashboards |
| Barangay Secretary | Confirms/changes/rejects task assignments; document and records processing |
| Other authorized personnel / Kagawads | Role-restricted access (e.g., Health, Peace and Order, DRR committees) |
| Resident | Registered citizen using the Citizen Portal |
| Guest (non-resident) | No login; can report incidents and view public info only |

Access is governed by **role-based access control (RBAC)**.

## 4. Tech stack (from the paper)

| Layer | Choice |
|---|---|
| Language | JavaScript |
| Frontend | React.js |
| Runtime | Node.js |
| Database | PostgreSQL |
| Hashing | SHA-256 (Node.js `crypto` module) |
| String similarity | Jaro-Winkler (own implementation or library) |
| Text retrieval | TF-IDF + cosine similarity (own implementation or library) |
| Forecasting | Seasonal average (implemented in the application) |
| AI service | Google Gemini API (Gemini 1.5 Flash) |
| SMS | Semaphore API |
| Push | Firebase Cloud Messaging |
| Dev tools | VS Code, Git and GitHub, Windows 10+ |
| Browsers | Chrome, Firefox, Edge |

Hardware minimum (dev): Intel Core i3, 8 GB RAM, 256 GB SSD, 1366×768 display, stable internet, an Android/iOS device for responsive testing.

---

## 5. Functional modules (15)

### 5.1 Resident and Household Management
- Register residents; manage household records (a household groups residents sharing a residence)
- Update profiles, search records (including address-based search)
- Archive inactive or deceased residents (retained for history, excluded from active listings and transactions)
- **Duplicate resident detection:** flags possible duplicates for personnel review (see algorithm A1). Never auto-merges, overwrites, or deletes.

### 5.2 Smart Document Processing
- Generates barangay clearances, certificates of residency, certificates of indigency, business clearances, and other configured certificates from stored resident data
- Each document carries a **QR code linked to a SHA-256 hash** for authenticity verification (algorithm A2)
- Fees are settled through the barangay's existing manual payment procedure (no online payments)

### 5.3 Intelligent Queue Management
- Computes a **priority score** per service request from criteria such as senior citizen, PWD, pregnancy, emergency, and appointment status
- Orders the queue by score, and shows an **explanation** of how each score was computed (explainable prioritization, algorithm A3)

### 5.4 Citizen Portal
- Request documents online and track request status
- Schedule appointments
- View announcements and the list of barangay services with requirements
- Submit complaints and incident reports

### 5.5 AI Citizen Assistant
- Web-based assistant that answers questions on certificate/clearance requirements, procedures, available services, and basic barangay info
- Answers **only** from the barangay-configured knowledge base (services, requirements, procedures, fees, announcements)
- Retrieval-based with AI answer generation (algorithm A7). Falls back with a refusal message if the question is out of scope. Not a general chatbot, gives no legal advice, and its answers are not official commitments.

### 5.6 Complaint and Incident Management
- Residents submit complaints and incident reports
- Officials review, assign, update status, track progress, and close cases
- Summarization of complaint trends to surface recurring concerns
- Out of scope: Katarungang Pambarangay mediation, conciliation, and adjudication

### 5.7 Decision-Support Dashboard
- Insights on peak office hours, most requested documents/services, average processing times, staff workload, monthly service trends, and predicted service demand
- Reports can be viewed, filtered by period, and exported
- Report utilization (Table 1.1 in the paper):

| Report | Users | Use |
|---|---|---|
| Service demand / most requested documents | Captain, Secretary | Adjust staffing and schedules; prepare forms |
| Peak hours / average processing time | Captain, Secretary | Add personnel at busy hours; find bottlenecks |
| Complaint and incident trends | Captain, Kagawads | Identify recurring problems; plan peace-and-order programs |
| Predictive forecast | Captain, Health/Committee officials | Prepare for events (e.g., anti-dengue drives, supplies, hospital transport readiness) |
| Staff workload and assignment | Captain | Balance assignments; identify officials needing support |
| Services delivered and performance | Captain, Council | Monitor performance; accomplishment reports |

### 5.8 SMS / Push Notifications
- Real-time alerts to officials when a resident or civilian reports an emergency
- SMS via Semaphore, push via Firebase Cloud Messaging
- Delivery depends on third-party gateways and mobile networks and is not guaranteed

### 5.9 Guest Mode
- Non-residents can report incidents and view specific public information with **no account or login**
- Strictly limited: guests cannot view, search, or access any resident personal data
- Guest reports are marked **unverified** and treated as advisory until reviewed

### 5.10 AI Incident Screening and Prioritization
- Preliminary screening of submitted reports plus automated identification of urgent ones
- Hybrid of rule-based keyword scoring and AI classification (algorithm A5)
- Output: category, urgency (normal / high / urgent), screening flags

### 5.11 AI-Assisted Task Assignment
- On submission, recommends an official based on report category/urgency, the official's role/assigned responsibility, and current open-case count (algorithm A4)
- Recommendation goes to the secretary or captain for **confirmation**; it only takes effect after confirmation

### 5.12 Absence Handling and Substitute Suggestion
- Officials can be marked absent or on leave
- If the recommended official is absent, the system suggests the available official with the best score as substitute and notifies them once approved

### 5.13 Barangay Officials Directory
- Public webpage listing names, positions, assigned committees/responsibilities, and office contact details
- Only information the officials consented to disclose is shown. Updated by the administrator.

### 5.14 Predictive Analytics
- Forecasts expected monthly volumes of incidents, health-related cases (e.g., dengue), and assistance requests (e.g., hospital transport)
- Seasonal-average method with **advisory alerts** shown ahead of high months (algorithm A6)
- Baseline seeded by researchers encoding historical logbook records from previous years

### 5.15 Administration and Security
- User account management, RBAC (administrator, captain, secretary, other authorized personnel)
- Audit logs (chronological, non-editable: user, record, action type, timestamp), including access to resident records
- Secure password hashing, activity monitoring
- Database backup and restoration
- Data minimization and informing residents of the purpose of data collection, aligned with the Data Privacy Act of 2012 (RA 10173)

---

## 6. Algorithms (with parameters)

All numeric values are **initial values**, configurable by the barangay and tuned during user design/testing.

### A1. Duplicate Resident Detection (Jaro-Winkler + weighted score)
1. Normalize: lowercase, strip punctuation/extra spaces, standardize suffixes (Jr., Sr.)
2. Candidate selection: same birth year **or** same first letter of last name
3. Name similarity = weighted average of Jaro-Winkler on last name (0.4), first name (0.4), middle name (0.2). Missing parts are skipped and weights rescaled.
4. Birth date match: 1 if identical, 0.5 if day and month are swapped, else 0
5. Address similarity: 1 if same household, else Jaro-Winkler of addresses
6. **S = 0.5 × name + 0.3 × birth date + 0.2 × address**
7. If **S ≥ T (0.85)**, flag the pair and show both records with matched fields for review

Jaro-Winkler: `sim_w = sim_j + l × p × (1 − sim_j)`, prefix length l ≤ 4, p = 0.1.
Output is advisory. Personnel decide to merge, keep, or archive.

### A2. Document Verification (SHA-256 + QR)
**Issuance**
1. Build string: `docID | docType | residentID | residentName | issueDate`
2. Compute SHA-256, store in the issuance record
3. Generate QR containing a verification link with docID and hash; print on document

**Verification (scan)**
1. Read docID and hash from the link, look up the issuance record
2. If the record is missing or not active → **INVALID**
3. Recompute hash from stored data. If recomputed = stored = QR hash → **VALID** (show record details to compare with the printed copy). Otherwise → **INVALID**.

Limitation: this is **record matching, not anti-forgery**. It cannot detect physical alteration of a printed copy and does not replace the official's signature.

### A3. Queue Prioritization with Explanation (weighted scoring)
`Score = Σ (wᵢ × cᵢ)`, where cᵢ ∈ {0,1}.

| Criterion | Sample weight |
|---|---|
| Emergency case | 50 |
| Senior citizen | 30 |
| Person with disability | 30 |
| Pregnant | 30 |
| With appointment | 20 |

- Sort descending by score; ties broken by earliest submission time
- Explanation string example: `"Emergency (+50), Senior citizen (+30) = 80."`
- Personnel keep discretion for exceptional cases. The algorithm does not decide eligibility or validate supporting documents.

### A4. AI-Assisted Task Assignment and Substitute Suggestion
Per official: **Score = 0.6 × RoleScore + 0.4 × LoadScore**
- RoleScore: 1.0 if primary role for the category, 0.6 if related, 0.2 otherwise
- LoadScore = 1 − (official's open cases ÷ max open cases among officials)

Steps: read category/urgency → look up primary/related roles → score all officials → pick highest → if absent, suggest highest-scoring **available** official as substitute → send to secretary/captain (SMS/push if urgent) → takes effect on confirmation (they may change it) → notify the confirmed official.

Sample category → role mapping (barangay-configurable):

| Category | Primary | Related |
|---|---|---|
| Health or medical | Kagawad, Committee on Health | Barangay Captain |
| Peace and order | Kagawad, Committee on Peace and Order | Barangay Captain |
| Fire, flood, disaster | Kagawad, Committee on Disaster Risk Reduction | Captain; Kagawad, Committee on Health |
| Other community concern/complaint | Barangay Secretary | Barangay Captain |

### A5. AI Incident Screening and Prioritization (hybrid)
1. **Screening:** check required fields. Compare with the same reporter's recent reports via TF-IDF cosine similarity. **≥ 0.9** flags a possible duplicate/spam.
2. **Masking:** remove/mask names, contact numbers, and other identifiers before sending to Gemini
3. **Rule-based urgency:** barangay-configured keyword lists (English and Filipino), e.g., fire, drowning, unconscious person, weapon, severe bleeding. Urgent list match → urgent, high list match → high, none → normal.
4. **AI classification:** Gemini classifies category and urgency on the masked text
5. **Final urgency = max(AI level, rule-based level).** If AI is unavailable, use rule-based only.
6. **Action:** if urgent, send SMS/push to officials. All reports queue for official review. Guest reports marked unverified.

### A6. Seasonal Forecasting (seasonal average)
- `F(m) = (1/Y) × Σ C(m, y)` over y = 1..Y (average count for month m across available years)
- If fewer than 2 years of data → mark forecast **low confidence**
- Compute the mean of the 12 monthly forecasts. If **F(m) ≥ (1 + a) × mean, a = 0.25** → create an advisory alert ahead of month m
- Evaluated by **back-testing** (forecast from earlier years vs. actual later months)
- Not a medical or epidemiological determination. Does not replace DOH or city health office advisories.

### A7. AI Citizen Assistant (TF-IDF retrieval + constrained generation)
- `w(t,d) = tf(t,d) × log(N / df(t))`; similarity = `cos(q, d) = (q·d) / (‖q‖‖d‖)`
1. Preprocess question (lowercase, strip punctuation and stop words), compute TF-IDF vector
2. Cosine similarity against every knowledge-base entry
3. Take top **k = 3** entries
4. If best similarity **< τ (0.2)** → reply the question is outside configured info and refer to the barangay office
5. Else send question + selected entries to Gemini with instructions to answer **only** from those entries and give no legal advice
6. Show the answer with the titles of the source entries

---

## 7. Data and entities mentioned in the paper

The paper doesn't give a schema. These entities are named or clearly implied:

- Resident record, household record (residents grouped by shared residence)
- User/official accounts with roles, assigned responsibilities/committees, absence/leave status
- Document request, document issuance record (docID, docType, residentID, name, issue date, SHA-256 hash, active status)
- Service request/queue entry (priority criteria flags, score, explanation, submission time)
- Appointment
- Complaint/incident report (category, urgency, flags, assigned official, status, guest/unverified flag)
- Knowledge base entries (services, requirements, procedures, fees, announcements)
- Announcements
- Audit log entries
- Historical monthly counts (incidents, health-related cases, assistance requests)
- Barangay-configured settings: priority weights, category-to-role mapping, urgency keyword lists, thresholds (T, τ, a)
- Public officials directory entries (with disclosure consent)

**[Suggested]** Tables like `residents`, `households`, `documents`, `queue_entries`, `appointments`, `incident_reports`, `users`, `roles`, `audit_logs`, `knowledge_base`, `config`, `monthly_stats`.

## 8. Constraints and delimitations (important for scoping)

1. **Single barangay** (4A) deployment and evaluation.
2. **No external integrations** (PSA, PhilSys, DILG, civil registry), **no online payments**. API endpoints for future integration are provisioned but not connected.
3. Document verification is record matching, not anti-forgery.
4. **All automation is advisory.** Duplicate detection, queue prioritization, task assignment, and incident prioritization only flag, order, or recommend. They never auto-merge, overwrite, or delete, and humans keep final authority.
5. AI assistant is scoped to the configured knowledge base only.
6. Complaint management is administrative, not adjudicative (no Katarungang Pambarangay).
7. Insights and forecasts depend on accumulated data. Early outputs are limited, and forecasts are planning aids.
8. Data privacy measures are limited to the system (RBAC, audit logs, password hashing, data minimization, masking before external AI calls). No NPC registration, no DPO appointment, no physical security coverage.
9. Web-only, internet required, no offline mode. SMS/push not guaranteed. No biometrics or facial recognition.
10. Fixed development and evaluation period. No long-term maintenance coverage.

## 9. Privacy and security requirements

- RBAC, non-editable audit logs (including who accessed resident records), activity monitoring
- Secure password hashing (irreversible)
- Database backup and restoration
- Data minimization, purpose notice to residents, consent for public directory info
- Mask names, contact numbers, and addresses before any call to the external AI service
- Guest Mode cannot access any resident data
- Test data is anonymized or replaced with sample values

## 10. Evaluation plan

**Hypothesis test:** H₀ — no significant difference in information management, service delivery, administrative efficiency, and decision-making before vs. after implementation. Paired-samples t-test, α = 0.05, 5-point Likert pre/post survey, same respondents matched by code.

**Instruments:** semi-structured interview guide (requirements phase) and an evaluation questionnaire — Part A (pre/post), Part B (ISO/IEC 25010). Content validation by IT experts/advisers, pilot test with Cronbach's alpha.

**Respondents:** barangay personnel (total enumeration) and registered residents 18+ (Slovin's formula, e = 0.05, stratified random sampling). Optional IT/software evaluator panel. Population figures are still placeholders in the paper.

**ISO/IEC 25010 characteristics:** functional suitability, performance efficiency, compatibility, usability, reliability, security, maintainability, portability.

**Algorithm evaluation:**

| Algorithm | Test data | Metrics |
|---|---|---|
| Duplicate detection | Records with planted duplicates | Precision, recall, F1 |
| Document verification | Valid vs. tampered/non-existent documents | Verification accuracy |
| Queue prioritization | Sample requests with expected order | Test-case pass rate |
| Task assignment | Sample reports with secretary's choice | Agreement rate |
| Incident prioritization | Labeled sample reports | Accuracy; recall for urgent |
| Seasonal forecasting | Held-out months | MAE, MAPE |
| Citizen assistant | In-scope and out-of-scope questions | Correct-answer rate; correct-refusal rate |

## 11. Legal and framework references

RA 7160 (Local Government Code), RA 10173 (Data Privacy Act of 2012), RA 11032 (Ease of Doing Business), DILG LGUSS-BIMS, OECD Digital Government Policy Framework, UN E-Government Survey 2024, ISO/IEC 25010:2011.

Related systems compared: LGUSS-BIMS, BALANGAY (Bautista et al., 2023), Webyu (Gasmido et al., 2025), iPlan Gov (Esbieto et al., 2026), E-BIMS (Aliling et al., 2025), general government chatbots (Larsen & Følstad, 2024).

## 12. Team

Bilog, Manuel Stephen B.; Golez, Regina Bianca M.; Zuasola, Railey S. Adviser: Mrs. Gracelyn C. Ramos. BS Computer Science, Laguna College, San Pablo City.

---

## 13. Notes for AI coding assistants

- Treat every automated feature as a **recommendation with a human confirmation step**. Never build auto-merge, auto-delete, or auto-assign behavior.
- Keep algorithm parameters (weights, thresholds, keyword lists, role mappings) in **configuration**, not hardcoded.
- Always return an **explanation** with queue priority scores.
- Mask PII before any Gemini API call. Rule-based urgency must work when the AI service is down.
- Log access to resident records in the audit log.
- Guest endpoints must never expose resident data.
- Public directory shows only consented fields.
