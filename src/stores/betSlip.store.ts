import type { BetSelection } from "@/types/BetSelection";
import { defineStore } from "pinia";

export const useBetSlipStore = defineStore("betSlip", {
  state: () => ({
    selections: [] as BetSelection[],
    stake: 0,
    betType: "single" as "single" | "multiple",
  }),

  getters: {
    totalOdds(state) {
      if (state.betType === "single") {
        return state.selections[0]?.odds || 0;
      }
      return state.selections.reduce((acc, s) => acc * s.odds, 1);
    },

    potentialReturn(): number {
      return this.stake * this.totalOdds;
    },
  },

  actions: {
    addSelection(selection: BetSelection) {
      const exists = this.selections.find(
        (s) => s.horseId === selection.horseId && s.raceId === selection.raceId
      );
      if (!exists) this.selections.push(selection);
    },

    removeSelection(horseId: string) {
      this.selections = this.selections.filter((s) => s.horseId !== horseId);
    },

    setBetType(type: "single" | "multiple") {
      this.betType = type;
      this.stake = 0;
    },

    canPlaceBet(): boolean {
      if (
        this.stake == 0 ||
        this.selections.length == 0 ||
        (this.betType === "multiple" && this.selections.length < 2)
      )
        return false;
      return true;
    },

    clear() {
      this.selections = [];
      this.stake = 0;
    },
  },
});
