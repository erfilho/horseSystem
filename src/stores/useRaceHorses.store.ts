import type { RaceHorse } from "@/types/RaceHorses";
import { defineStore } from "pinia";

export const useRaceHorseStore = defineStore("raceHorses", {
  state: () => ({
    raceHorses: [] as RaceHorse[],
  }),

  persist: true,

  actions: {
    addHorseToRace(raceId: string, horseId: string, odd: number) {
      this.raceHorses.push({
        id: crypto.randomUUID(),
        raceId,
        horseId,
        odd,
      });
    },

    removeHorseFromRace(raceId: string, horseId: string) {
      this.raceHorses = this.raceHorses.filter(
        (rh) => rh.raceId !== raceId || rh.horseId !== horseId
      );
    },

    getHorsesByRace(raceId: string) {
      return this.raceHorses.filter((rh) => rh.raceId === raceId);
    },

    clearRace(raceId: string) {
      this.raceHorses = this.raceHorses.filter((rh) => rh.raceId !== raceId);
    },
  },
});
