import {
    Item,
    ItemContent,
    ItemDescription,
    ItemFooter,
    ItemGroup,
    ItemTitle,
} from "@/components/ui/item";
import { Progress } from "@/components/ui/progress";
import { TimerState } from "@/context/timer";
import { Distraction } from "@/types/distraction";
import { useContext } from "preact/hooks";

interface StatsOverviewProps {
    totalSeconds?: number;
    blips?: number[];
    distractions?: Distraction[];
}

export default function StatsOverview({
    totalSeconds: tsProp,
    blips: blipsProp,
    distractions: distractionsProp,
}: StatsOverviewProps = {}) {
    const ctx = useContext(TimerState);
    const totalSeconds = tsProp ?? ctx.totalSeconds.value;
    const blips = blipsProp ?? ctx.blips.value;
    const distractions = distractionsProp ?? ctx.distractions.value;

    const isIdle =
        tsProp === undefined
            ? ctx.status.value === "stopped" && totalSeconds === 0
            : false;

    const totalDistracted = distractions.reduce(
        (sum, { start, end }) => sum + (end - start),
        0,
    );
    const focusRate =
        totalSeconds > 0 ? ((totalSeconds - totalDistracted) / totalSeconds) * 100 : 0;

    return (
        <ItemGroup className="flex-row">
            <Item variant="outline">
                <ItemContent>
                    <ItemTitle>Blips</ItemTitle>
                    <ItemDescription className="text-xl">{blips.length}</ItemDescription>
                </ItemContent>
            </Item>
            <Item variant="outline">
                <ItemContent>
                    <ItemTitle>Distractions</ItemTitle>
                    <ItemDescription className="text-xl">
                        {distractions.length}
                    </ItemDescription>
                </ItemContent>
            </Item>
            <Item variant="outline">
                <ItemContent>
                    <ItemTitle>Focus rate</ItemTitle>
                    <ItemDescription className="text-xl">
                        {isIdle ? "—" : `${focusRate.toFixed(0)}%`}
                    </ItemDescription>
                    <ItemFooter>
                        <Progress value={isIdle ? 0 : focusRate} />
                    </ItemFooter>
                </ItemContent>
            </Item>
        </ItemGroup>
    );
}
