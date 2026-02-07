export const ROLES = {
  SUPER_ADMIN: 'Super Admin',
  CLINIC_ADMIN: 'Clinic Admin',
  DOCTOR: 'Doctor',
  RECEPTIONIST: 'Receptionist',
  ACCOUNTANT: 'Accountant',
  PATIENT: 'Patient'
};

export const MOCK_CLINICS = [
  { id: 1, clinicId: 'CLI-001', name: 'City Dental Clinic', admin: 'Dr. Rahul Sharma', email: 'contact@citydental.com', mobile: '9876543210', plan: 'Premium Plan', status: 'Active', date: '2024-01-15', expiry: '2025-01-15' },
  { id: 2, clinicId: 'CLI-002', name: 'Grace Heart Center', admin: 'Suresh Kumar', email: 'grace@heartcenter.com', mobile: '8877665544', plan: 'Standard Plan', status: 'Active', date: '2024-02-10', expiry: '2024-12-10' },
  { id: 3, clinicId: 'CLI-003', name: 'Family Care Clinic', admin: 'Amit Patel', email: 'admin@familycare.in', mobile: '7766554433', plan: 'Basic Plan', status: 'Blocked', date: '2024-03-05', expiry: '2024-04-05' },
];

export const MOCK_PLANS = [
  { id: 1, name: 'Basic Plan', cycle: 'Monthly', price: '$ 199', doctors: 2, staff: 5, status: 'Active' },
  { id: 2, name: 'Standard Plan', cycle: 'Yearly', price: '$ 1,999', doctors: 5, staff: 15, status: 'Active' },
  { id: 3, name: 'Premium Plan', cycle: 'Yearly', price: '$ 4,999', doctors: 'Unlimited', staff: 'Unlimited', status: 'Active' },
];

export const MOCK_USERS = [
  { id: 1, name: 'Rahul Sharma', email: 'rahul@demo.com', clinic: 'City Dental Clinic', lastLogin: '2024-03-20 10:30 AM', status: 'Active' },
  { id: 2, name: 'Suresh Kumar', email: 'suresh@demo.com', clinic: 'Grace Heart Center', lastLogin: '2024-03-20 09:15 AM', status: 'Active' },
  { id: 3, name: 'Amit Patel', email: 'amit@demo.com', clinic: 'Family Care Clinic', lastLogin: '2024-03-19 04:45 PM', status: 'Blocked' },
];

export const MOCK_PAYMENTS = [
  { id: 1, txId: 'REC-101', invId: 'INV-5001', clinic: 'Deepak Verma', amount: '$ 1,500', mode: 'UPI', status: 'Success', date: '2024-03-20' },
  { id: 2, txId: 'REC-102', invId: 'INV-5002', clinic: 'Sneha Patel', amount: '$ 800', mode: 'Cash', status: 'Success', date: '2024-03-21' },
];

export const RECENT_LOGS = [
  { id: 1, user: 'Admin', role: 'Super Admin', action: 'Created New Clinic', module: 'Clinics', date: '2024-03-20 10:30 AM', ip: '192.168.1.1' },
  { id: 2, user: 'Rahul Sharma', role: 'Clinic Admin', action: 'Added New Doctor', module: 'Doctors', date: '2024-03-20 09:15 AM', ip: '192.168.1.15' },
];

export const MOCK_PATIENTS = [
  { id: 1, patientId: 'PT-1001', name: 'Deepak Verma', mobile: '9898989898', gender: 'Male', age: 34, bloodGroup: 'O+', lastVisit: '2024-03-15', dueAmount: '$ 500', totalVisits: 5, status: 'Active' },
  { id: 2, patientId: 'PT-1002', name: 'Sneha Patel', mobile: '9797979797', gender: 'Female', age: 28, bloodGroup: 'A+', lastVisit: '2024-03-18', dueAmount: '$ 0', totalVisits: 3, status: 'Active' },
  { id: 3, patientId: 'PT-1003', name: 'Raj Kumar', mobile: '9696969696', gender: 'Male', age: 45, bloodGroup: 'B-', lastVisit: '2024-02-10', dueAmount: '$ 1,200', totalVisits: 12, status: 'Active' },
];

export const MOCK_DOCTORS = [
  { id: 1, name: 'Dr. Sameer Khan', specialty: 'Cardiology', mobile: '9191919191', email: 'sameer@clinic.com', fee: '500', commission: '20', status: 'Active' },
  { id: 2, name: 'Dr. Anjali Rao', specialty: 'Dentist', mobile: '9292929292', email: 'anjali@clinic.com', fee: '300', commission: '15', status: 'Active' },
];

export const MOCK_APPOINTMENTS = [
  { id: 1, appId: 'APP-101', patient: 'Deepak Verma', gender: 'Male', age: '34', doctor: 'Dr. Sameer Khan', date: '2024-03-25', time: '10:30 AM', type: 'New Visit', status: 'Confirmed' },
  { id: 2, appId: 'APP-102', patient: 'Sneha Patel', gender: 'Female', age: '28', doctor: 'Dr. Anjali Rao', date: '2024-03-25', time: '11:45 AM', type: 'Follow-up', status: 'Pending' },
  { id: 3, appId: 'APP-103', patient: 'Raj Kumar', gender: 'Male', age: '45', doctor: 'Dr. Sameer Khan', date: '2024-03-25', time: '01:00 PM', type: 'Consultation', status: 'Completed' },
];

export const MOCK_INVOICES = [
  { id: 1, invId: 'INV-5001', patient: 'Deepak Verma', doctor: 'Dr. Sameer Khan', date: '2024-03-20', total: '$ 1,500', paid: '$ 1,000', due: '$ 500', status: 'Partial' },
  { id: 2, invId: 'INV-5002', patient: 'Sneha Patel', doctor: 'Dr. Anjali Rao', date: '2024-03-21', total: '$ 800', paid: '$ 800', due: '$ 0', status: 'Paid' },
  { id: 3, invId: 'INV-5003', patient: 'Raj Kumar', doctor: 'Dr. Sameer Khan', date: '2024-03-22', total: '$ 1,200', paid: '$ 0', due: '$ 1,200', status: 'Unpaid' },
];

export const MOCK_SERVICES = [
  { id: 1, name: 'General Consultation', price: '$ 50', status: 'Active' },
  { id: 2, name: 'Blood Test', price: '$ 25', status: 'Active' },
  { id: 3, name: 'Dental X-Ray', price: '$ 80', status: 'Disabled' },
];

export const MOCK_STAFF = [
  { id: 1, name: 'Mehta Ji', role: 'Receptionist', mobile: '9090909090', email: 'mehta@clinic.com', status: 'Active' },
  { id: 2, name: 'Kushal Dev', role: 'Accountant', mobile: '9898989800', email: 'kushal@clinic.com', status: 'Active' },
];

export const MOCK_PRESCRIPTIONS = [
  { id: 1, rxId: 'RX-9001', patient: 'Deepak Verma', age: 34, gender: 'Male', date: '2024-03-20', status: 'Original' },
  { id: 2, rxId: 'RX-9002', patient: 'Sneha Patel', age: 28, gender: 'Female', date: '2024-03-21', status: 'Follow-up' },
];

export const MOCK_EARNINGS = [
  { id: 1, date: '2024-03-20', patient: 'Deepak Verma', service: 'Consultation', amount: '500', commission: '20', share: '100' },
  { id: 2, date: '2024-03-20', patient: 'Raj Kumar', service: 'X-Ray', amount: '1200', commission: '20', share: '240' },
  { id: 3, date: '2024-03-19', patient: 'Sneha Patel', service: 'Checkup', amount: '300', commission: '20', share: '60' },
];

export const MOCK_EXPENSES = [
  { id: 1, date: '2024-03-18', category: 'Rent', description: 'Clinic Monthly Rent', amount: '$ 450', mode: 'Online', addedBy: 'Kushal Dev' },
  { id: 2, date: '2024-03-15', category: 'Salary', description: 'Staff Salary - February', amount: '$ 1,200', mode: 'Bank Transfer', addedBy: 'Kushal Dev' },
  { id: 3, date: '2024-03-10', category: 'Utilities', description: 'Electricity Bill', amount: '$ 85', mode: 'UPI', addedBy: 'Kushal Dev' },
];

export const MOCK_DOCTOR_PAYOUTS = [
  { id: 1, name: 'Dr. Sameer Khan', revenue: '$ 8,500', commission: '20%', share: '$ 1,700', paid: '$ 1,500', balance: '$ 200', status: 'Partial' },
  { id: 2, name: 'Dr. Anjali Rao', revenue: '$ 4,200', commission: '15%', share: '$ 630', paid: '$ 630', balance: '$ 0', status: 'Paid' },
];
