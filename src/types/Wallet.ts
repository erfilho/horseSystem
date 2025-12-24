export interface WalletTransaction {
  id: string;
  type: "deposit" | "withdraw" | "bet" | "win";
  amount: number;
  createdAt: string;
}

export interface Wallet {
  balance: number;
  transactions: WalletTransaction[];
}
