import { Badge } from "@/components/ui/badge";
import { CardAction, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TimerState } from "@/context/timer";
import SessionHistory from "@/components/Tracker/SessionHistory";
import { useContext } from "preact/hooks";

const STATUS_BADGE: Record<string, { className: string; label: string }> = {
    running: { className: "bg-green-950 text-green-300", label: "Running" },
    paused: { className: "bg-orange-950 text-orange-300", label: "Paused" },
    distracted: { className: "bg-red-950 text-red-300", label: "Distracted" },
};

export default function Header() {
    const { status, totalSeconds, sessionLabel } = useContext(TimerState);
    const badge = STATUS_BADGE[status.value];
    const isIdle = status.value === "stopped" && totalSeconds.value === 0;

    return (
        <CardHeader>
            <CardTitle>Stopwatch</CardTitle>
            <CardDescription>Track your concentration time :3</CardDescription>
            <CardAction className="flex items-center gap-1">
                <SessionHistory />
                {badge && <Badge className={badge.className}>{badge.label}</Badge>}
            </CardAction>
            {isIdle && (
                <Input
                    className="col-span-full"
                    placeholder="Session label (optional)"
                    value={sessionLabel.value}
                    onInput={(e) =>
                        (sessionLabel.value = (e.target as HTMLInputElement).value)
                    }
                />
            )}
        </CardHeader>
    );
}
