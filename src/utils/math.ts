export function secondsToDuration(totalSeconds: number): string {
    const date = new Date(totalSeconds * 1000);
    return `${padded(date.getUTCHours())}:${padded(date.getUTCMinutes())}:${padded(date.getSeconds())}`;
}

export function avgIntervalSeconds(timestamps: number[]): number | null {
    if (timestamps.length < 2) {
        return null;
    }

    const intervals = timestamps.slice(1).map((t, i) => t - timestamps[i]);
    return intervals.reduce((a, b) => a + b, 0) / intervals.length;
}

export function avgDurationSeconds(durations: number[]): number | null {
    if (durations.length === 0) {
        return null;
    }

    return durations.reduce((a, b) => a + b, 0) / durations.length;
}

const padded = (n: number) => n.toString().padStart(2, "0");
