// --- Type Definitions ---

export type StatSummary = {
  title: string;
  value: string | number;
  hint: string;
};

export type ActivityStatus = "success" | "warning" | "danger" | "default";

export type RecentActivity = {
  initials: string;
  name: string;
  action: string;
  statusLabel: string;
  statusType: ActivityStatus;
  timeAgo: string;
};

export type CourseDistribution = {
  courseName: string;
  studentCount: number;
  percentage: number;
};

export interface DashboardData {
  overview: {
    totalStudents: StatSummary;
    totalCourses: StatSummary;
    totalTests: StatSummary;
    averageScore: StatSummary;
  };
  recentActivity: RecentActivity[];
  courseDistribution: CourseDistribution[];
}

// --- Data Extraction ---

export const dashboardStats: DashboardData = {
  overview: {
    totalStudents: {
      title: "Total students",
      value: "248",
      hint: "12 added this week",
    },
    totalCourses: {
      title: "Total courses",
      value: "3",
      hint: "CCC · O Level · ADCA",
    },
    totalTests: {
      title: "Total tests",
      value: "24",
      hint: "Across all courses",
    },
    averageScore: {
      title: "Average score",
      value: "72%",
      hint: "+3.4 vs last month",
    },
  },

  recentActivity: [
    {
      initials: "AV",
      name: "Ananya Verma",
      action: "Completed CCC · Mock 4",
      statusLabel: "84%",
      statusType: "success",
      timeAgo: "2 min ago",
    },
    {
      initials: "RK",
      name: "Rohit Kumar",
      action: "Started O Level · Networking",
      statusLabel: "In progress",
      statusType: "warning",
      timeAgo: "8 min ago",
    },
    {
      initials: "SM",
      name: "Sana Malik",
      action: "Completed ADCA · Mock 2",
      statusLabel: "76%",
      statusType: "success",
      timeAgo: "22 min ago",
    },
    {
      initials: "VS",
      name: "Vikram Singh",
      action: "Completed CCC · Mock 1",
      statusLabel: "48%",
      statusType: "danger",
      timeAgo: "1 h ago",
    },
    {
      initials: "PI",
      name: "Priya Iyer",
      action: "Resumed O Level · IT Tools",
      statusLabel: "In progress",
      statusType: "warning",
      timeAgo: "1 h ago",
    },
  ],

  courseDistribution: [
    {
      courseName: "CCC",
      studentCount: 128,
      percentage: 52,
    },
    {
      courseName: "O Level",
      studentCount: 74,
      percentage: 30,
    },
    {
      courseName: "ADCA",
      studentCount: 46,
      percentage: 19,
    },
  ],
};
