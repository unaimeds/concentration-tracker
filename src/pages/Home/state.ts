import { Signal, signal } from "@preact/signals";
import { createContext } from "preact";

interface TimerStateValues {
    isRunning: Signal<boolean>;
    isPaused: Signal<boolean>;
    totalSeconds: Signal<number>;
}

export function createTimerState(): TimerStateValues {
    const isRunning = signal(false);
    const isPaused = signal(false);
    const totalSeconds = signal(0);

    return { isRunning, isPaused, totalSeconds };
}

export const TimerState = createContext<TimerStateValues>(null);
