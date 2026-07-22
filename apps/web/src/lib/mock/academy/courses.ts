// --- Type Definitions ---

export interface CourseStats {
  tests: number;
  students: number;
  duration?: string;
}

export interface Course {
  id: string;
  code: string;
  title: string;
  description?: string;
  stats: CourseStats;
}

// --- Data Extraction / Mock Data ---

export const courses: Course[] = [
  {
    id: "crs_ccc_01",
    code: "CCC",
    title: "Course on Computer Concepts",
    description:
      "Foundational NIELIT program covering computer literacy, GUI, internet, and productivity essentials.",
    stats: {
      tests: 10,
      students: 128,
      duration: "80 hrs",
    },
  },
  // The following courses are populated based on the previous dashboard context
  // (Student counts are from the previous Course Distribution stats, other details are mocked)
  {
    id: "crs_olv_02",
    code: "O Level",
    title: "NIELIT O Level IT Certificate",
    description:
      "Comprehensive foundation course in Information Technology covering IT tools, web design, programming, and IoT.",
    stats: {
      tests: 8,
      students: 74,
      duration: "120 hrs",
    },
  },
  {
    id: "crs_adca_03",
    code: "ADCA",
    title: "Advanced Diploma in Computer Applications",
    description:
      "Advanced program covering office automation, financial accounting, programming, and graphic design.",
    stats: {
      tests: 6,
      students: 46,
      duration: "6 Months",
    },
  },
];
