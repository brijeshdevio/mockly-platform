// --- Type Definitions ---

export type CourseType = "CCC" | "O Level" | "ADCA";
export type StudentStatus = "Active" | "Inactive" | "Pending";

export interface Student {
  id: string;
  name: string;
  phone: string;
  course: CourseType;
  code: string;
  status: StudentStatus;
}

// --- Data Extraction / Mock Data ---

export const students: Student[] = [
  {
    id: "stu_101",
    name: "Ananya Verma",
    phone: "+91 9876543210",
    course: "CCC",
    code: "CCC-AV-01",
    status: "Active",
  },
  {
    id: "stu_102",
    name: "Rohit Kumar",
    phone: "+91 8765432109",
    course: "O Level",
    code: "OLV-RK-02",
    status: "Active",
  },
  {
    id: "stu_103",
    name: "Sana Malik",
    phone: "+91 7654321098",
    course: "ADCA",
    code: "ADC-SM-03",
    status: "Active",
  },
  {
    id: "stu_104",
    name: "Vikram Singh",
    phone: "+91 9988776655",
    course: "CCC",
    code: "CCC-VS-04",
    status: "Inactive",
  },
  {
    id: "stu_105",
    name: "Priya Iyer",
    phone: "+91 8877665544",
    course: "O Level",
    code: "OLV-PI-05",
    status: "Active",
  },
  {
    id: "stu_106",
    name: "Rahul Sharma",
    phone: "+91 7766554433",
    course: "CCC",
    code: "CCC-RS-06",
    status: "Pending",
  },
  {
    id: "stu_107",
    name: "Neha Gupta",
    phone: "+91 9123456780",
    course: "ADCA",
    code: "ADC-NG-07",
    status: "Active",
  },
  {
    id: "stu_108",
    name: "Aditya Patel",
    phone: "+91 8234567891",
    course: "O Level",
    code: "OLV-AP-08",
    status: "Active",
  },
  {
    id: "stu_109",
    name: "Kavya Desai",
    phone: "+91 7345678912",
    course: "CCC",
    code: "CCC-KD-09",
    status: "Inactive",
  },
  {
    id: "stu_110",
    name: "Arjun Reddy",
    phone: "+91 9456789123",
    course: "O Level",
    code: "OLV-AR-10",
    status: "Pending",
  },
];
