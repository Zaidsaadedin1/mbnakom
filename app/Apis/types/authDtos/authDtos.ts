// src/types/dtos/authDtos.ts

export interface RegisterUserDto {
  email: string;
  userName: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  phoneNumber: string;
  gender: string;
  termsAccepted: boolean;
}

export interface LoginUserDto {
  loginIdentifier: string;
  password: string;
}

export interface ResetPasswordDto {
  emailOrPhone: string;
  otp: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ResetPasswordWithTokenDto {
  email: string;
  token: string;
  newPassword: string;
}
