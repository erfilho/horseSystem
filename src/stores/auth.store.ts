import type { User } from "@/types/User";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as User | null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
    isAdmin: (state) => state.user?.role === "admin",
  },

  actions: {
    login(email: string, password: string) {
      this.user = {
        id: "1",
        name: "Demo User",
        email,
        balance: 1000,
        role: "admin",
      };

      localStorage.setItem("auth", JSON.stringify(this.user));
    },

    logout() {
      this.user = null;
      localStorage.removeItem("auth");
    },

    restoreSession() {
      const data = localStorage.getItem("auth");
      if (data) {
        const parsed = JSON.parse(data);
        this.user = parsed.user;
      }
    },
  },
});
