import type { Odds } from "./Odds";

export interface Horse {
  id: string;
  name: string;
  age: number;
  odds: Odds;
  jockey: string;
}
