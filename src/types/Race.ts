export interface Race {
  id: string;
  name: string;
  startTime: string;
  finishTime: string;
  status: "scheduled" | "open" | "closed" | "finished";
  result?: string;
}
