import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Footer from "@/pages/Home/Footer";
import { secondsToDuration } from "@/pages/Home/math";
import { TimerState } from "@/pages/Home/state";
import { PlayIcon, StopIcon, PauseIcon } from "@phosphor-icons/react";
import { useContext, useEffect } from "preact/hooks";

const SUBTITLES: Record<string, string> = {
    running: "session in progress",
    paused: "paused",
    distracted: "getting distracted...",
};

export default function Content() {
    const { status, totalSeconds, blips, distractions, distractionStart } =
        useContext(TimerState);

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
        status.value = "running";
    };

    const onStop = () => {
        if (status.value === "distracted" && distractionStart.value !== null) {
            distractions.value = [
                ...distractions.value,
                { start: distractionStart.value, end: totalSeconds.value },
            ];
            distractionStart.value = null;
        }
        status.value = "stopped";
    };

    const onResume = () => (status.value = "running");
    const onPause = () => (status.value = "paused");

    const subtitle = SUBTITLES[status.value] ?? null;
    const hasSessionData = status.value === "stopped" && totalSeconds.value > 0;

    return (
        <CardContent className="flex flex-col items-center">
            <p className="text-5xl font-medium tracking-tight">
                {secondsToDuration(totalSeconds.value)}
            </p>
            {subtitle && <p className="text-muted-foreground text-sm mt-1">{subtitle}</p>}
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
            <Separator className="my-4" />
            <Footer />
        </CardContent>
    );
}
