export type CreateCourseResponse = {
  id: string;
  code: string;
  name: string;
  isActive: boolean;
  createdAt: Date;
};

type CourseItemResponse = {
  id: string;
  code: string;
  name: string;
  description: string | null;
  modules: string[];
  isActive: boolean;
  createdAt: Date;
};

export type GetCoursesResponse = {
  items: CourseItemResponse[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type UpdateCourseResponse = {
  id: string;
  code: string;
  name: string;
  description: string | null;
  modules: string[];
  isActive: boolean;
  updatedAt: Date;
};

export type CreateTestResponse = {
  id: string;
  title: string;
  description: string | null;
  durationInMinutes: number;
  passingPercentage: number;
  isPublished: boolean;
  createdAt: Date;
};

export type TestListItemResponse = {
  id: string;
  title: string;
  description: string | null;
  durationInMinutes: number;
  passingPercentage: number;
  isPublished: boolean;
  totalQuestions: number;
  createdAt: Date;
};

export type GetTestsResponse = {
  items: TestListItemResponse[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type UpdateTestResponse = {
  id: string;
  title: string;
  description: string | null;
  durationInMinutes: number;
  passingPercentage: number;
  isPublished: boolean;
  updatedAt: Date;
};

export type AddTestQuestionsResponse = {
  addedCount: number;
};

export type CreateQuestionResponse = {
  id: string;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string | null;
  optionD: string | null;
  correctOption: string;
  explanation: string | null;
  createdAt: Date;
};

export type QuestionListItemResponse = {
  id: string;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string | null;
  optionD: string | null;
  correctOption: string;
  explanation: string | null;
  createdAt: Date;
};

export type GetQuestionsResponse = {
  items: QuestionListItemResponse[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type UpdateQuestionResponse = {
  id: string;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string | null;
  optionD: string | null;
  correctOption: string;
  explanation: string | null;
  updatedAt: Date;
};
