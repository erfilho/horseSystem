export interface User {
  id: string;
  name: string;
  email: string;
  balance: number;
  role: "admin" | "common";
}
