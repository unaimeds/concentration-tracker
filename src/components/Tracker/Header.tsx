import { Badge } from "@/components/ui/badge";
import { CardAction, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TimerState } from "@/context/timer";
import { useContext } from "preact/hooks";

const STATUS_BADGE: Record<string, { className: string; label: string }> = {
    running: { className: "bg-green-950 text-green-300", label: "Running" },
    paused: { className: "bg-orange-950 text-orange-300", label: "Paused" },
    distracted: { className: "bg-red-950 text-red-300", label: "Distracted" },
};

export default function Header() {
    const { status } = useContext(TimerState);
    const badge = STATUS_BADGE[status.value];

    return (
        <CardHeader>
            <CardTitle>Stopwatch</CardTitle>
            <CardDescription>Track your concentration time :3</CardDescription>
            {badge && (
                <CardAction>
                    <Badge className={badge.className}>{badge.label}</Badge>
                </CardAction>
            )}
        </CardHeader>
    );
}
