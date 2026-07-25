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
