import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Footer from "@/pages/Home/Footer";
import { secondsToDuration } from "@/pages/Home/math";
import { TimerState } from "@/pages/Home/state";
import { PlayIcon, StopIcon, PauseIcon } from "@phosphor-icons/react";
import { useContext, useEffect } from "preact/hooks";

export default function Content() {
    const { status, totalSeconds, blips, distractions } =
        useContext(TimerState);
    const date = new Date(totalSeconds.value * 1000);

    useEffect(() => {
        if (status.value === "stopped" || status.value === "paused") {
            return;
        }

        let interval = setInterval(() => {
            totalSeconds.value += 1;
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [status.value]);

    const onStart = () => {
        blips.value = [];
        distractions.value = [];
        status.value = "running";
    };
    // TODO: ask for confirmation before stopping
    const onStop = () => {
        status.value = "stopped";
        totalSeconds.value = 0;
    };
    const onResume = () => (status.value = "running");
    const onPause = () => (status.value = "paused");

    return (
        <CardContent className="flex flex-col items-center">
            <p className="text-5xl">{secondsToDuration(totalSeconds.value)}</p>
            {status.value !== "stopped" && (
                <p className="text-muted-foreground">session in progress</p>
            )}
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
                        <Button onClick={onStop}>
                            <StopIcon weight="fill" className="size-3" />
                            Stop
                        </Button>
                    </>
                ) : (
                    <Button onClick={onStart}>
                        <PlayIcon weight="fill" className="size-3" />
                        Start
                    </Button>
                )}
            </div>
            <Separator className="my-4" />
            <Footer />
        </CardContent>
    );
}
