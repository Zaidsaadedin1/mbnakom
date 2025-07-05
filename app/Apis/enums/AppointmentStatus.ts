export enum AppointmentStatus {
  Pending,
  Confirmed,
  Completed,
  Cancelled,
  NoShow,
}

export const statusColors: Record<string, string> = {
  confirmed: "green",
  completed: "blue",
  cancelled: "red",
  pending: "yellow",
  noshow: "gray",
};
