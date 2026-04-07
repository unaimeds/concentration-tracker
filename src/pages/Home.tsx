import { Button } from "@/components/ui/button";
import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";

export default function Home() {
    const totalSeconds = useSignal(0);
    const date = new Date(totalSeconds.value * 1000);

    useEffect(() => {
        let interval = setInterval(() => {
            totalSeconds.value += 1;
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div>
            <h1 className="font-bold text-4xl">Stopwatch</h1>
            <p>
                {padded(date.getUTCHours())}:{padded(date.getUTCMinutes())}:
                {padded(date.getSeconds())}
            </p>
            <Button>Start</Button>
        </div>
    );
}

const padded = (n: number) => n.toString().padStart(2, "0");
