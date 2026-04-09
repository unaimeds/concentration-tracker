import { Distraction } from "@/types/distraction";
import { Signal, signal } from "@preact/signals";
import { createContext } from "preact";

type TimerStatus = "stopped" | "running" | "paused" | "distracted";

interface TimerStateValues {
    status: Signal<TimerStatus>;
    totalSeconds: Signal<number>;
    blips: Signal<number[]>;
    distractions: Signal<Distraction[]>;
    distractionStart: Signal<number | null>;
}

export function createTimerState(): TimerStateValues {
    const status = signal<TimerStatus>("stopped");
    const totalSeconds = signal(0);
    const blips = signal<number[]>([]);
    const distractions = signal<Distraction[]>([]);
    const distractionStart = signal(null);

    return { status, totalSeconds, blips, distractions, distractionStart };
}

export const TimerState = createContext<TimerStateValues>(null);
