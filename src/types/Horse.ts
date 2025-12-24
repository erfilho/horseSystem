import type { Odds } from "./Odds";

export interface Horse {
  id: string;
  name: string;
  jockey: string;
  age: number;
  odds: Odds;
}
