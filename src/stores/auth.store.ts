import type { User } from "@/types/User";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as User | null,
    isAuthenticated: false,
  }),

  actions: {
    login() {
      this.user = {
        id: "1",
        name: "Demo User",
        email: "demo@email.com",
        balance: 1000,
      };
      this.isAuthenticated = true;
    },
    logout() {
      this.user = null;
      this.isAuthenticated = false;
    },
  },
});
