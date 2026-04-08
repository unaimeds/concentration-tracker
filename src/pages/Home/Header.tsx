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
    const { status } = useContext(TimerState);

    return (
        <CardHeader>
            <CardTitle>Stopwatch</CardTitle>
            <CardDescription>Track your concentration time :3</CardDescription>
            {status.value !== "stopped" && (
                <CardAction>
                    <Badge
                        className={
                            status.value === "paused"
                                ? "bg-orange-950 text-orange-300"
                                : "bg-green-950 text-green-300"
                        }
                    >
                        {status.value === "paused" ? "Paused" : "Running"}
                    </Badge>
                </CardAction>
            )}
        </CardHeader>
    );
}
