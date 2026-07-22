// --- Type Definitions ---

export type CourseType = "CCC" | "O Level" | "ADCA";

/**
 * Tuple representing a test record:
 * [0]: Test Name (string)
 * [1]: Total Marks / Questions (number)
 * [2]: Duration in Minutes (number)
 * [3]: Passing Marks (number)
 */
export type TestRecord = [string, number, number, number];

export interface CourseTestGroup {
  course: CourseType;
  tests: TestRecord[];
}

// --- Data Extraction / Mock Data ---

export const courseTests: CourseTestGroup[] = [
  {
    course: "CCC",
    tests: [
      ["Mock Paper 1", 100, 45, 50],
      ["Mock Paper 2", 100, 45, 50],
      ["Mock Paper 3", 100, 45, 50],
      ["Mock Paper 4", 100, 45, 50],
      // Adding a few more to flesh out the list
      ["Mock Paper 5", 100, 45, 50],
      ["Previous Year - 2023", 100, 90, 50],
    ],
  },
  {
    course: "O Level",
    tests: [
      ["IT Tools - Mock 1", 100, 120, 50],
      ["Web Design - Mock 1", 100, 120, 50],
      ["Python Programming - Mock 1", 100, 120, 50],
      ["IoT - Mock 1", 100, 120, 50],
    ],
  },
  {
    course: "ADCA",
    tests: [
      ["Fundamentals Mock 1", 100, 60, 50],
      ["Office Automation Mock 1", 100, 60, 40],
      ["Tally ERP Assessment", 100, 90, 50],
    ],
  },
];
