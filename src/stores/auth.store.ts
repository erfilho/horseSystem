import router from "@/routes/router";
import type { User } from "@/types/User";
import { defineStore } from "pinia";
import { useBetSlipStore } from "./betSlip.store";

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
      const user: User = {
        id: "1",
        name: "Demo User",
        email,
        balance: 1000,
        role: "admin",
      };

      this.user = user;
      localStorage.setItem("auth", JSON.stringify(user));
    },

    logout() {
      this.user = null;
      localStorage.removeItem("auth");

      const betSlip = useBetSlipStore();
      betSlip.clear;

      router.replace("/");
    },

    restoreSession() {
      const data = localStorage.getItem("auth");
      if (data) {
        this.user = JSON.parse(data);
      }
    },
  },
});
