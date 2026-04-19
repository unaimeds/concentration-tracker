import { Separator } from "@/components/ui/separator";
import { TimerState } from "@/context/timer";
import { Distraction } from "@/types/distraction";
import { avgDurationSeconds, avgIntervalSeconds, secondsToDuration } from "@/utils/math";
import { useContext } from "preact/hooks";

interface SessionSummaryProps {
    totalSeconds?: number;
    blips?: number[];
    distractions?: Distraction[];
}

export default function SessionSummary({
    totalSeconds: tsProp,
    blips: blipsProp,
    distractions: distractionsProp,
}: SessionSummaryProps = {}) {
    const ctx = useContext(TimerState);
    const totalSeconds = tsProp ?? ctx.totalSeconds.value;
    const blips = blipsProp ?? ctx.blips.value;
    const distractions = distractionsProp ?? ctx.distractions.value;

    const avgBlipInterval = avgIntervalSeconds(blips);
    const avgDistractionDuration = avgDurationSeconds(
        distractions.map(({ start, end }) => end - start),
    );
    const avgDistractionInterval = avgIntervalSeconds(distractions.map((d) => d.start));

    return (
        <>
            <Separator className="my-4" />
            <p className="text-muted-foreground mb-2 text-xs font-medium tracking-wider uppercase">
                Session summary
            </p>
            <div className="divide-y border text-sm">
                <div className="flex justify-between px-3 py-2">
                    <span className="text-muted-foreground">Total duration</span>
                    <span>{secondsToDuration(totalSeconds)}</span>
                </div>
                {avgBlipInterval !== null && (
                    <div className="flex justify-between px-3 py-2">
                        <span className="text-muted-foreground">
                            Avg. time between blips
                        </span>
                        <span>{secondsToDuration(Math.round(avgBlipInterval))}</span>
                    </div>
                )}
                {avgDistractionDuration !== null && (
                    <div className="flex justify-between px-3 py-2">
                        <span className="text-muted-foreground">
                            Avg. distraction duration
                        </span>
                        <span>
                            {secondsToDuration(Math.round(avgDistractionDuration))}
                        </span>
                    </div>
                )}
                {avgDistractionInterval !== null && (
                    <div className="flex justify-between px-3 py-2">
                        <span className="text-muted-foreground">
                            Avg. time between distractions
                        </span>
                        <span>
                            {secondsToDuration(Math.round(avgDistractionInterval))}
                        </span>
                    </div>
                )}
            </div>
        </>
    );
}
