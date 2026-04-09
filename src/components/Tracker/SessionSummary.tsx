import { Separator } from "@/components/ui/separator";
import { TimerState } from "@/context/timer";
import { avgDurationSeconds, avgIntervalSeconds, secondsToDuration } from "@/utils/math";
import { useComputed } from "@preact/signals";
import { useContext } from "preact/hooks";

export default function SessionSummary() {
    const { totalSeconds, blips, distractions } = useContext(TimerState);

    const avgBlipInterval = useComputed(() => avgIntervalSeconds(blips.value));
    const avgDistractionDuration = useComputed(() =>
        avgDurationSeconds(distractions.value.map(({ start, end }) => end - start)),
    );
    const avgDistractionInterval = useComputed(() =>
        avgIntervalSeconds(distractions.value.map((d) => d.start)),
    );

    return (
        <>
            <Separator className="my-4" />
            <p className="text-muted-foreground mb-2 text-xs font-medium tracking-wider uppercase">
                Session summary
            </p>
            <div className="divide-y border text-sm">
                <div className="flex justify-between px-3 py-2">
                    <span className="text-muted-foreground">Total duration</span>
                    <span>{secondsToDuration(totalSeconds.value)}</span>
                </div>
                {avgBlipInterval.value !== null && (
                    <div className="flex justify-between px-3 py-2">
                        <span className="text-muted-foreground">
                            Avg. time between blips
                        </span>
                        <span>
                            {secondsToDuration(Math.round(avgBlipInterval.value))}
                        </span>
                    </div>
                )}
                {avgDistractionDuration.value !== null && (
                    <div className="flex justify-between px-3 py-2">
                        <span className="text-muted-foreground">
                            Avg. distraction duration
                        </span>
                        <span>
                            {secondsToDuration(Math.round(avgDistractionDuration.value))}
                        </span>
                    </div>
                )}
                {avgDistractionInterval.value !== null && (
                    <div className="flex justify-between px-3 py-2">
                        <span className="text-muted-foreground">
                            Avg. time between distractions
                        </span>
                        <span>
                            {secondsToDuration(Math.round(avgDistractionInterval.value))}
                        </span>
                    </div>
                )}
            </div>
        </>
    );
}
