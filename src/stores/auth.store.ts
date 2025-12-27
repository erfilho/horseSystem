import type { User } from "@/types/User";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as User | null,
    isAuthenticated: false,
    isAdmin: false,
  }),

  actions: {
    login(email: string, password: string) {
      this.user = {
        id: "1",
        name: "Demo User",
        email: email,
        balance: 1000,
        role: "admin",
      };

      this.isAdmin = this.user.role === "admin";

      this.isAuthenticated = true;

      localStorage.setItem("auth", JSON.stringify({ user: this.user }));
    },

    logout() {
      this.user = null;
      this.isAdmin = false;
      this.isAuthenticated = false;
      localStorage.removeItem("auth");
    },

    restoreSession() {
      const data = localStorage.getItem("auth");
      if (data) {
        const parsed = JSON.parse(data);
        this.user = parsed.user;
        this.isAuthenticated = true;
      }
    },
  },
});
