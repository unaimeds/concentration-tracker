import { Button } from "@/components/ui/button";
import { TimerState } from "@/context/timer";
import { secondsToDuration } from "@/utils/math";
import { PauseIcon, PlayIcon, StopIcon } from "@phosphor-icons/react";
import { useContext, useEffect } from "preact/hooks";

const SUBTITLES: Record<string, string> = {
    running: "session in progress",
    paused: "paused",
    distracted: "getting distracted...",
};

export default function TimerDisplay() {
    const {
        status,
        totalSeconds,
        blips,
        distractions,
        distractionStart,
        distractionReason,
    } = useContext(TimerState);

    useEffect(() => {
        if (status.value === "stopped" || status.value === "paused") {
            return;
        }

        const interval = setInterval(() => {
            totalSeconds.value++;
        }, 1000);

        return () => clearInterval(interval);
    }, [status.value]);

    const onStart = () => {
        blips.value = [];
        distractions.value = [];
        totalSeconds.value = 0;
        distractionStart.value = null;
        distractionReason.value = "";
        status.value = "running";
    };

    const onStop = () => {
        if (status.value === "distracted" && distractionStart.value !== null) {
            const reason = distractionReason.value.trim() || undefined;
            distractions.value = [
                ...distractions.value,
                { start: distractionStart.value, end: totalSeconds.value, reason },
            ];
            distractionStart.value = null;
            distractionReason.value = "";
        }
        status.value = "stopped";
    };

    const onResume = () => (status.value = "running");
    const onPause = () => (status.value = "paused");

    const subtitle = SUBTITLES[status.value] ?? null;
    const hasSessionData = status.value === "stopped" && totalSeconds.value > 0;

    return (
        <>
            <p className="text-5xl font-medium tracking-tight">
                {secondsToDuration(totalSeconds.value)}
            </p>
            {subtitle && <p className="text-muted-foreground mt-1 text-sm">{subtitle}</p>}
            <div className="mt-4 flex gap-1">
                {status.value !== "stopped" ? (
                    <>
                        {status.value === "paused" ? (
                            <Button onClick={onResume}>
                                <PlayIcon weight="fill" className="size-3" />
                                Resume
                            </Button>
                        ) : (
                            <Button onClick={onPause}>
                                <PauseIcon weight="fill" className="size-3" />
                                Pause
                            </Button>
                        )}
                        <Button variant="destructive" onClick={onStop}>
                            <StopIcon weight="fill" className="size-3" />
                            Stop
                        </Button>
                    </>
                ) : (
                    <Button onClick={onStart}>
                        <PlayIcon weight="fill" className="size-3" />
                        {hasSessionData ? "New session" : "Start"}
                    </Button>
                )}
            </div>
        </>
    );
}
