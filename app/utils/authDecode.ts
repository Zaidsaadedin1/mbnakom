export interface DecodedToken {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  username: string;
  id: string;
  email: string;
  Roles: UserRole[] | undefined;
  exp: number;
  iss: string;
  aud: string;
}

export type UserRole = "Admin" | "Moderator" | "User";

export const decodeToken = (token: string): DecodedToken | null => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};
