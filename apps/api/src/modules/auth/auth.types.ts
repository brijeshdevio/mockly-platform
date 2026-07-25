import { StudentStatus } from '../../generated/prisma/enums';

export type AcademySignupResponse = {
  id: string;
  academyCode: string;
  academyName: string;
  ownerName: string;
  phone: string;
};

export type AcademyLoginResponse = {
  accessToken: string;
  refreshToken: string;
};

export type AdminProfile = {
  role: 'ADMIN';
  id: string;
  name: string;
  phone: string;
};

export type AcademyProfile = {
  role: 'ACADEMY';
  id: string;
  academyCode: string;
  academyName: string;
  ownerName: string;
  phone: string;
  isActive: boolean;
};

export type StudentProfile = {
  role: 'STUDENT';
  id: string;
  studentCode: string;
  name: string;
  phone: string;
  status: StudentStatus;
  academy: {
    id: string;
    academyCode: string;
    academyName: string;
  };
  course: {
    id: string;
    code: string;
    name: string;
  };
};

export type ProfileResponse = AdminProfile | AcademyProfile | StudentProfile;
