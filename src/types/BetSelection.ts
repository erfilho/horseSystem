export interface BetSelection {
  raceId: string;
  raceName: string;
  horseId: string;
  horseName: string;
  shirtColor: string;
  bet: "win" | "place" | "each-way";
  oddType: "SP"
  odds: number;
}
