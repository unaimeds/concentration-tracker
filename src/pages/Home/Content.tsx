import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { TimerState } from "@/pages/Home/state";
import { PlayIcon, StopIcon, PauseIcon } from "@phosphor-icons/react";
import { useContext, useEffect } from "preact/hooks";

export default function Content() {
    const { isRunning, isPaused, totalSeconds } = useContext(TimerState);
    const date = new Date(totalSeconds.value * 1000);

    useEffect(() => {
        if (!isRunning.value || isPaused.value) {
            return;
        }

        let interval = setInterval(() => {
            totalSeconds.value += 1;
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [isRunning.value, isPaused.value]);

    const onStart = () => (isRunning.value = true);
    // TODO: ask for confirmation before stopping
    const onStop = () => {
        isRunning.value = false;
        isPaused.value = false;
        totalSeconds.value = 0;
    };
    const onResume = () => (isPaused.value = false);
    const onPause = () => (isPaused.value = true);

    return (
        <CardContent className="flex flex-col items-center">
            <p className="text-5xl">
                {padded(date.getUTCHours())}:{padded(date.getUTCMinutes())}:
                {padded(date.getSeconds())}
            </p>
            {isRunning.value && (
                <p className="text-muted-foreground">session in progress</p>
            )}
            <div className="mt-4 flex gap-1">
                {isRunning.value ? (
                    <>
                        {isPaused.value ? (
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
        </CardContent>
    );
}

const padded = (n: number) => n.toString().padStart(2, "0");
