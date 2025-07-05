import { AppointmentStatus } from "../../enums/AppointmentStatus";

export interface CreateAppointmentDto {
  userId: string | null;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  serviceType: string;
  propertyType?: string;
  preferredDate: string;
  preferredTime: string;
  projectDetails: string;
  termsAccepted: boolean;
}

export interface GetAppointmentDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  serviceType: string;
  propertyType?: string;
  preferredDate: string;
  preferredTime: string;
  projectDetails: string;
  termsAccepted: boolean;
  userId?: string;
  status: AppointmentStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface GetAppointmentForAdminDto {
  id: number;

  // Appointment Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  serviceType: string;
  propertyType?: string;
  preferredDate: string;
  preferredTime: string;
  projectDetails: string;
  termsAccepted: boolean;
  status: AppointmentStatus;
  createdAt: string;
  updatedAt?: string;

  // Related User Info
  userId?: string;
  userFirstName?: string;
  userLastName?: string;
  userEmail?: string;
  userPhone?: string;
}
