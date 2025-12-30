import type { Wallet } from "@/types/Wallet";
import { defineStore } from "pinia";

export const useWalletStore = defineStore("wallet", {
  state: (): Wallet => ({
    balance: 1000,
    transactions: [],
  }),

  actions: {
    debit(amount: number) {
      this.balance -= amount;
      this.transactions.push({
        id: crypto.randomUUID(),
        type: "withdraw",
        amount: -amount,
        createdAt: new Date().toISOString(),
      });
    },

    credit(amount: number) {
      this.balance += amount;
      this.transactions.push({
        id: crypto.randomUUID(),
        type: "deposit",
        amount,
        createdAt: new Date().toISOString(),
      });
    },
  },
});
