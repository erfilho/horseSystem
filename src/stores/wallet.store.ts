import { defineStore } from "pinia";

export type TransactionType = "deposit" | "withdraw";
export type TransactionStatus = "completed" | "pending";
export type PaymentMethod = "visa" | "bank" | "pix";

export interface WalletTransaction {
  id: string;
  type: TransactionType;
  amount: number;
  status: TransactionStatus;
  method: PaymentMethod;
  createdAt: string;
}

export const useWalletStore = defineStore("wallet", {
  state: () => ({
    balance: 1045.5,
    transactions: [] as WalletTransaction[],
  }),

  actions: {
    credit(amount: number, method: PaymentMethod) {
      this.balance += amount;

      this.transactions.unshift({
        id: crypto.randomUUID(),
        type: "deposit",
        amount,
        status: "completed",
        method: method,
        createdAt: new Date().toISOString(),
      });
    },

    debit(amount: number) {
      if (amount > this.balance) return;

      this.balance -= amount;

      this.transactions.unshift({
        id: crypto.randomUUID(),
        type: "withdraw",
        amount: -amount,
        status: "pending",
        method: "bank",
        createdAt: new Date().toISOString(),
      });
    },
  },
});
