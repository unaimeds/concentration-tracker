import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    FlagIcon,
    HourglassIcon,
    PauseIcon,
    PlayIcon,
    StopIcon,
} from "@phosphor-icons/react";
import { useSignal } from "@preact/signals";
import { Show } from "@preact/signals/utils";
import { useEffect } from "preact/hooks";

export default function Home() {
    const isRunning = useSignal(false);
    const isPaused = useSignal(false);

    const totalSeconds = useSignal(0);

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
    const onStop = () => {
        isRunning.value = false;
        isPaused.value = false;
        totalSeconds.value = 0;
    };
    const onResume = () => (isPaused.value = false);
    const onPause = () => (isPaused.value = true);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Stopwatch</CardTitle>
                <CardDescription>
                    Easily track your concentration time :3
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-3xl">
                    {padded(date.getUTCHours())}:{padded(date.getUTCMinutes())}:
                    {padded(date.getSeconds())}
                </p>
            </CardContent>
            <CardFooter>
                <Show
                    when={isRunning}
                    fallback={
                        <Button onClick={onStart}>
                            <PlayIcon weight="fill" className="size-3" />
                            Start
                        </Button>
                    }
                >
                    <ButtonGroup>
                        <Button onClick={onStop}>
                            <StopIcon weight="fill" className="size-3" />
                            Stop
                        </Button>
                        {/* yeah i think its time to retire from programming */}
                        {/* after writing this abomination */}
                        <Show
                            when={isPaused}
                            fallback={
                                <Button onClick={onPause}>
                                    <PauseIcon
                                        weight="fill"
                                        className="size-3"
                                    />
                                    Pause
                                </Button>
                            }
                        >
                            <Button onClick={onResume}>
                                <PlayIcon weight="fill" className="size-3" />
                                Resume
                            </Button>
                        </Show>
                    </ButtonGroup>
                </Show>
                <ButtonGroup className="ml-auto">
                    <Button>
                        <FlagIcon weight="fill" className="size-3" />
                        Blip
                    </Button>
                    <Button>
                        <HourglassIcon weight="fill" className="size-3" />
                        Distracted
                    </Button>
                </ButtonGroup>
            </CardFooter>
        </Card>
    );
}

const padded = (n: number) => n.toString().padStart(2, "0");
