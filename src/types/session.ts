import { Distraction } from "@/types/distraction";

export interface Session {
    id: string;
    label?: string;
    date: number;
    totalSeconds: number;
    blips: number[];
    distractions: Distraction[];
}
