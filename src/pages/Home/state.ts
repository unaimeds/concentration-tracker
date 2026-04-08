import { Signal, signal } from "@preact/signals";
import { createContext } from "preact";

type TimerStatus = "stopped" | "running" | "paused" | "distracted";

interface Distraction {
    start: number;
    end: number;
}

interface TimerStateValues {
    status: Signal<TimerStatus>;
    totalSeconds: Signal<number>;
    blips: Signal<number[]>;
    distractions: Signal<Distraction[]>;
}

export function createTimerState(): TimerStateValues {
    const status = signal<TimerStatus>("stopped");
    const totalSeconds = signal(0);
    const blips = signal([]);
    const distractions = signal([]);

    return { status, totalSeconds, blips, distractions };
}

export const TimerState = createContext<TimerStateValues>(null);
