import { defineStore } from "pinia";

export const useValueStore = defineStore("ammount", {
  state: () => ({
    ammountBase: 0,
  }),
  actions: {
    addAmmount(value: number) {
      this.ammountBase += value;
    },
    eraseAmmount() {
      this.ammountBase = 0;
    },
  },
});
