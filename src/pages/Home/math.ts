export function secondsToDuration(totalSeconds: number): string {
    const date = new Date(totalSeconds * 1000);
    return `${padded(date.getUTCHours())}:${padded(date.getUTCMinutes())}:${padded(date.getSeconds())}`;
}

const padded = (n: number) => n.toString().padStart(2, "0");
