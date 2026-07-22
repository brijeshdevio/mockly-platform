// --- Type Definitions ---

export type CourseType = "CCC" | "O Level" | "ADCA";
export type ResultStatus = "Pass" | "Fail" | "Pending";

export interface TestResult {
  studentName: string;
  course: CourseType;
  testName: string;
  score: number;
  totalMarks: number;
  percentage: number;
  status: ResultStatus;
  date: string;
}

// --- Data Extraction / Mock Data ---

export const testResults: TestResult[] = [
  // Extracted directly from image_8c5138.png
  {
    studentName: "Ananya Verma",
    course: "CCC",
    testName: "Mock Paper 4",
    score: 84,
    totalMarks: 100,
    percentage: 84,
    status: "Pass",
    date: "Today, 10:12",
  },
  {
    studentName: "Sana Malik",
    course: "ADCA",
    testName: "Mock 2",
    score: 76,
    totalMarks: 100,
    percentage: 76,
    status: "Pass",
    date: "Today, 09:04",
  },

  // Mocked data to match earlier dashboard context
  {
    studentName: "Vikram Singh",
    course: "CCC",
    testName: "Mock Paper 1",
    score: 48,
    totalMarks: 100,
    percentage: 48,
    status: "Fail",
    date: "Today, 08:30",
  },
  {
    studentName: "Rohit Kumar",
    course: "O Level",
    testName: "Networking",
    score: 92,
    totalMarks: 100,
    percentage: 92,
    status: "Pass",
    date: "Yesterday, 16:45",
  },
  {
    studentName: "Priya Iyer",
    course: "O Level",
    testName: "IT Tools",
    score: 68,
    totalMarks: 100,
    percentage: 68,
    status: "Pass",
    date: "Yesterday, 11:20",
  },
];
