import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    Item,
    ItemContent,
    ItemDescription,
    ItemFooter,
    ItemGroup,
    ItemTitle,
} from "@/components/ui/item";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { secondsToDuration } from "@/pages/Home/math";
import { TimerState } from "@/pages/Home/state";
import {
    CaretDownIcon,
    FlagIcon,
    WarningCircleIcon,
} from "@phosphor-icons/react";
import { useComputed, useSignal } from "@preact/signals";
import { useContext } from "preact/hooks";

export default function Footer() {
    const { status, totalSeconds, blips, distractions } =
        useContext(TimerState);

    const totalDistracted = useComputed(() =>
        distractions.value
            .flatMap(({ start, end }) => end - start)
            .reduce((partialSum, c) => partialSum + c, 0),
    );
    const focusRate = useComputed(() =>
        totalSeconds.value > 0
            ? (totalSeconds.value /
                  (totalSeconds.value + totalDistracted.value)) *
              100
            : 0,
    );

    const blipsOpen = useSignal(false);
    const distractionsOpen = useSignal(false);
    const distractionStart = useSignal<number | null>(null);

    const onBlip = () => {
        blips.value = [totalSeconds.value, ...blips.value];
    };

    const onDistracted = () => {
        if (status.value === "distracted") {
            distractions.value = [
                { start: distractionStart.value, end: totalSeconds.value },
                ...distractions.value,
            ];
            status.value = "running";
            return;
        }
        status.value = "distracted";
        distractionStart.value = totalSeconds.value;
    };

    return (
        <div className="flex flex-col w-full">
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
                            {status.value !== "stopped"
                                ? `${focusRate.value.toFixed(0)}%`
                                : "?%"}
                        </ItemDescription>
                        <ItemFooter>
                            <Progress value={focusRate.value} />
                        </ItemFooter>
                    </ItemContent>
                </Item>
            </ItemGroup>

            <div className="flex flex-col gap-1 mt-4">
                <Collapsible
                    open={blipsOpen.value}
                    onOpenChange={(v) => (blipsOpen.value = v)}
                >
                    <CollapsibleTrigger asChild>
                        <Button variant="outline" className="group w-full">
                            Blips
                            <CaretDownIcon
                                weight="fill"
                                className="size-3 ml-auto group-data-[state=open]:rotate-180"
                            />
                        </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <Table>
                            <TableBody>
                                {blips.value.map((secs, idx) => (
                                    <TableRow>
                                        <TableCell className="pl-2">
                                            Blip #{idx}
                                        </TableCell>
                                        <TableCell className="text-right pr-2">
                                            {secondsToDuration(secs)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CollapsibleContent>
                </Collapsible>
                <Collapsible
                    open={distractionsOpen.value}
                    onOpenChange={(v) => (distractionsOpen.value = v)}
                >
                    <CollapsibleTrigger asChild>
                        <Button variant="outline" className="group w-full">
                            Distractions
                            <CaretDownIcon
                                weight="fill"
                                className="size-3 ml-auto group-data-[state=open]:rotate-180"
                            />
                        </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <Table>
                            <TableBody>
                                {distractions.value.map(
                                    ({ start, end }, idx) => (
                                        <TableRow>
                                            <TableCell className="pl-2">
                                                Distraction #{idx}
                                            </TableCell>
                                            <TableCell className="text-right pr-2">
                                                {secondsToDuration(end - start)}
                                            </TableCell>
                                        </TableRow>
                                    ),
                                )}
                            </TableBody>
                        </Table>
                    </CollapsibleContent>
                </Collapsible>
            </div>

            <Separator className="my-4" />
            <ButtonGroup className="w-full gap-1">
                <Button
                    variant="secondary"
                    className="flex-1"
                    onClick={onBlip}
                    disabled={status.value === "stopped"}
                >
                    <FlagIcon weight="fill" className="size-3" />
                    Blip
                </Button>
                <Button
                    variant="secondary"
                    className="flex-1"
                    onClick={onDistracted}
                    disabled={status.value === "stopped"}
                >
                    <WarningCircleIcon weight="fill" className="size-3" />
                    {status.value === "distracted"
                        ? "Not distracted"
                        : "Distracted"}
                </Button>
            </ButtonGroup>
        </div>
    );
}
