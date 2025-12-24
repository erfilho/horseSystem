export interface BetSelection {
  raceId: string;
  horseId: string;
  type: "win" | "place" | "each-way";
  odds: number;
}
