export interface BetSelection {
  raceId: string;
  horseId: string;
  horseName: string;
  raceName: string;
  shirtColor: string;
  type: "win" | "place" | "each-way";
  odds: number;
}
