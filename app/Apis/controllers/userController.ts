import { GetUserDto, UpdateUserDto } from "../types/userDtos/userDtos";
import { GenericResponse } from "../types/Shared/sharedDtos";
import axios from "../types/axios";

export const userController = {
  getUserById: async (id: string | undefined) => {
    const response = await axios.get<GenericResponse<GetUserDto>>(
      `/User/${id}`
    );
    return response.data;
  },

  getUserByEmailOrPhone: async (emailOrPhone: string) => {
    const response = await axios.get<GenericResponse<GetUserDto>>(
      `/User/find`,
      {
        params: { emailOrPhone },
      }
    );
    return response.data;
  },

  getAllUsers: async () => {
    const response = await axios.get<GenericResponse<GetUserDto[]>>("/User");
    return response.data.data;
  },

  updateUser: async (id: string, updateUserDto: UpdateUserDto) => {
    const response = await axios.put<GenericResponse<boolean>>(
      `/User/${id}`,
      updateUserDto
    );
    return response.data;
  },

  deleteUser: async (id: string) => {
    const response = await axios.delete<GenericResponse<boolean>>(
      `/User/${id}`
    );
    return response.data;
  },

  isEmailOrPhoneTaken: async (emailOrPhone: string) => {
    const response = await axios.get<GenericResponse<boolean>>("/User/check", {
      params: { emailOrPhone },
    });
    return response.data;
  },

  assignRoleToUser: async (id: string, roleName: string) => {
    const response = await axios.post<GenericResponse<boolean>>(
      `/User/${id}/roles`,
      roleName
    );
    return response.data;
  },

  removeRoleFromUser: async (id: string, roleName: string) => {
    const response = await axios.delete<GenericResponse<boolean>>(
      `/User/${id}/roles/${roleName}`
    );
    return response.data;
  },
};

export default userController;
