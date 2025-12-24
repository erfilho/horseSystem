import type { BetSelection } from "./BetSelection";

export interface Bet {
  id: string;
  selections: BetSelection[];
  stake: number;
  totalOdds: number;
  potentialReturn: number;
  status: "open" | "won" | "lost" | "void";
  createdAt: string;
}
