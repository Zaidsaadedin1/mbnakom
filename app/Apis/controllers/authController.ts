// src/api/controllers/authController.ts
import {
  LoginUserDto,
  RegisterUserDto,
  ResetPasswordDto,
} from "../types/authDtos/authDtos";
import { GenericResponse } from "../types/Shared/sharedDtos";
import axios from "../types/axios";

export const authController = {
  register: async (
    registerUserDto: RegisterUserDto
  ): Promise<GenericResponse<RegisterUserDto>> => {
    const response = await axios.post<GenericResponse<RegisterUserDto>>(
      "/Auth/Register",
      registerUserDto
    );
    return response.data;
  },

  login: async (loginDto: LoginUserDto): Promise<GenericResponse<string>> => {
    const response = await axios.post<GenericResponse<string>>(
      "/Auth/Login",
      loginDto
    );
    return response.data;
  },

  resetPassword: async (
    resetPasswordDto: ResetPasswordDto
  ): Promise<GenericResponse<boolean>> => {
    const response = await axios.post<GenericResponse<boolean>>(
      "/Auth/reset-password",
      resetPasswordDto
    );
    return response.data;
  },
};

export default authController;
