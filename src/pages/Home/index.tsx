import { Card } from "@/components/ui/card";
import { createTimerState, TimerState } from "@/pages/Home/state";
import Header from "@/pages/Home/Header";
import Content from "@/pages/Home/Content";

export default function Home() {
    return (
        <TimerState.Provider value={createTimerState()}>
            <Card>
                <Header />
                <Content />
            </Card>
        </TimerState.Provider>
    );
}
