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
