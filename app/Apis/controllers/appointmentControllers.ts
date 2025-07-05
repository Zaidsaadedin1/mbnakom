import axios from "../types/axios";
import {
  CreateAppointmentDto,
  GetAppointmentDto,
  GetAppointmentForAdminDto,
} from "../types/appointmentDtos/appointmentDtos";
import { GenericResponse } from "../types/Shared/sharedDtos";

export const appointmentController = {
  CreateAppointmentAsync: async (
    createAppointmentDto: CreateAppointmentDto
  ) => {
    const response = await axios.post<GenericResponse<number>>(
      `/Appointment`,
      createAppointmentDto
    );
    return response.data;
  },
  GetAllUserAppointmentAsync: async (userId: string) => {
    const response = await axios.get<GenericResponse<GetAppointmentDto[]>>(
      `/Appointment/GetAllUserAppointmentAsync/${userId}`
    );
    return response.data;
  },

  GetAppointments: async () => {
    const response = await axios.get<
      GenericResponse<GetAppointmentForAdminDto[]>
    >(`/Appointment`);
    return response.data.data;
  },
};

export default appointmentController;
