import type { Bet } from "@/types/Bet";
import { defineStore } from "pinia";

export const useUserBetsStore = defineStore("userBets", {
  state: () => ({
    bets: [] as Bet[],
  }),

  actions: {
    addBet(bet: Bet) {
      this.bets.push(bet);
    },
  },
});
