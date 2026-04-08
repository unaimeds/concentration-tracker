import { Card } from "@/components/ui/card";
import { createTimerState, TimerState } from "@/pages/Home/state";
import Header from "@/pages/Home/Header";
import Content from "@/pages/Home/Content";
import Footer from "@/pages/Home/Footer";

export default function Home() {
    return (
        <TimerState.Provider value={createTimerState()}>
            <Card>
                <Header />
                <Content />
                <Footer />
            </Card>
        </TimerState.Provider>
    );
}
