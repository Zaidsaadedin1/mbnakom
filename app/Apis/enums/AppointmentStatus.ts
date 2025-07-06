export enum AppointmentStatus {
  Pending,
  Confirmed,
  Completed,
  Cancelled,
  NoShow,
}

export const statusColors: Record<string, string> = {
  Confirmed: "green",
  Completed: "blue",
  Cancelled: "red",
  Pending: "yellow",
  NoShow: "gray",
};
