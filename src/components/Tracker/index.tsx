import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { createTimerState, TimerState } from "@/context/timer";
import Header from "@/components/Tracker/Header";
import TimerDisplay from "@/components/Tracker/TimerDisplay";
import TrackingPanel from "@/components/Tracker/TrackingPanel";

export default function Tracker() {
    return (
        <TimerState.Provider value={createTimerState()}>
            <Card>
                <Header />
                <CardContent className="flex flex-col items-center">
                    <TimerDisplay />
                    <Separator className="my-4" />
                    <TrackingPanel />
                </CardContent>
            </Card>
        </TimerState.Provider>
    );
}
