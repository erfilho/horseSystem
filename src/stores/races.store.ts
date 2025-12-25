import type { Race } from "@/types/Race";
import { defineStore } from "pinia";

export const useRacesStore = defineStore("races", {
  state: () => ({
    races: [] as Race[],
  }),

  actions: {
    loadRaces() {
      this.races = [
        {
          id: "1",
          name: "17:05 Vincennes",
          location: "Vincennes",
          startTime: new Date().toISOString(),
          status: "open",
          horses: [],
        },
      ];
    },
  },
});
