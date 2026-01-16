import type { Horse } from "@/types/Horse";
import { defineStore } from "pinia";

export const useHorsesStore = defineStore("horses", {
  state: () => ({
    horses: [] as Horse[],
  }),

  persist: true,

  actions: {
    setHorses(horses: Horse[]) {
      this.horses = horses;
    },

    addHorse(horse: Horse) {
      this.horses.push(horse);
    },

    removeHorse(id: string) {
      this.horses = this.horses.filter((horse) => horse.id !== id);
    },

    updateHorse(id: string, data: Omit<Horse, "id">) {
      const index = this.horses.findIndex((h) => h.id === id);
      if (index !== -1) {
        this.horses[index] = { id, ...data };
      }
    },
  },
});
