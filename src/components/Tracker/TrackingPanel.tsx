import Actions from "@/components/Tracker/Actions";
import BlipList from "@/components/Tracker/BlipList";
import DistractionList from "@/components/Tracker/DistractionList";
import SessionSummary from "@/components/Tracker/SessionSummary";
import StatsOverview from "@/components/Tracker/StatsOverview";
import { Separator } from "@/components/ui/separator";
import { TimerState } from "@/context/timer";
import { useContext } from "preact/hooks";

export default function TrackingPanel() {
    const { status, totalSeconds } = useContext(TimerState);

    const isStopped = status.value === "stopped";
    const isIdle = isStopped && totalSeconds.value === 0;

    return (
        <div className="flex w-full flex-col">
            <StatsOverview />
            <div className="mt-4 flex flex-col gap-1">
                <BlipList />
                <DistractionList />
            </div>
            {isStopped && !isIdle && <SessionSummary />}
            <Separator className="my-4" />
            <Actions />
        </div>
    );
}
