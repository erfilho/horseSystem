import type { Horse } from "./Horse";

export interface Race {
  id: string;
  name: string;
  location: string;
  startTime: string;
  status: "scheduled" | "open" | "closed" | "finished";
  horses: Horse[];
}
