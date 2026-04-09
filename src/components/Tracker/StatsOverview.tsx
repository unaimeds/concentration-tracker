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
import { useComputed } from "@preact/signals";
import { useContext } from "preact/hooks";

export default function StatsOverview() {
    const { status, totalSeconds, blips, distractions } = useContext(TimerState);

    const totalDistracted = useComputed(() =>
        distractions.value.reduce((sum, { start, end }) => sum + (end - start), 0),
    );
    const focusRate = useComputed(() =>
        totalSeconds.value > 0
            ? ((totalSeconds.value - totalDistracted.value) / totalSeconds.value) * 100
            : 0,
    );

    const isIdle = status.value === "stopped" && totalSeconds.value === 0;

    return (
        <ItemGroup className="flex-row">
            <Item variant="outline">
                <ItemContent>
                    <ItemTitle>Blips</ItemTitle>
                    <ItemDescription className="text-xl">
                        {blips.value.length}
                    </ItemDescription>
                </ItemContent>
            </Item>
            <Item variant="outline">
                <ItemContent>
                    <ItemTitle>Distractions</ItemTitle>
                    <ItemDescription className="text-xl">
                        {distractions.value.length}
                    </ItemDescription>
                </ItemContent>
            </Item>
            <Item variant="outline">
                <ItemContent>
                    <ItemTitle>Focus rate</ItemTitle>
                    <ItemDescription className="text-xl">
                        {isIdle ? "—" : `${focusRate.value.toFixed(0)}%`}
                    </ItemDescription>
                    <ItemFooter>
                        <Progress value={isIdle ? 0 : focusRate.value} />
                    </ItemFooter>
                </ItemContent>
            </Item>
        </ItemGroup>
    );
}
