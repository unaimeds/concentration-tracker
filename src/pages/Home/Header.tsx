import { Badge } from "@/components/ui/badge";
import {
    CardAction,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { TimerState } from "@/pages/Home/state";
import { useContext } from "preact/hooks";

export default function Header() {
    const { isRunning, isPaused } = useContext(TimerState);

    return (
        <CardHeader>
            <CardTitle>Stopwatch</CardTitle>
            <CardDescription>
                Easily track your concentration time :3
            </CardDescription>
            {isRunning.value && (
                <CardAction>
                    <Badge
                        className={`${isPaused.value ? "bg-orange-950 text-orange-300" : "bg-green-950 text-green-300"}`}
                    >
                        {isPaused.value ? "Paused" : "Running"}
                    </Badge>
                </CardAction>
            )}
        </CardHeader>
    );
}
