import type { Race } from "@/types/Race";
import { defineStore } from "pinia";

export const useAdminRacesStore = defineStore("adminRaces", {
  state: () => ({
    races: [] as Race[],
  }),

  actions: {
    createRace(race: Race) {
      this.races.push(race);
    },

    updateStatus(id: string, status: Race["status"]) {
      const race = this.races.find((r) => r.id === id);
      if (race) race.status = status;
    },

    setResult(id: string, horseId: string) {
      const race = this.races.find((r) => r.id === id);
      if (race) {
        race.result = horseId;
        race.status = "finished";
      }
    },
  },
});
