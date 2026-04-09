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
import {
    avgDurationSeconds,
    avgIntervalSeconds,
    secondsToDuration,
} from "@/pages/Home/math";
import { TimerState } from "@/pages/Home/state";
import { CaretDownIcon, FlagIcon, WarningCircleIcon } from "@phosphor-icons/react";
import { useComputed, useSignal } from "@preact/signals";
import { useContext } from "preact/hooks";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";

export default function Footer() {
    const { status, totalSeconds, blips, distractions, distractionStart } =
        useContext(TimerState);

    const totalDistracted = useComputed(() =>
        distractions.value.reduce((sum, { start, end }) => sum + (end - start), 0),
    );
    const focusRate = useComputed(() =>
        totalSeconds.value > 0
            ? ((totalSeconds.value - totalDistracted.value) / totalSeconds.value) * 100
            : 0,
    );

    const avgBlipInterval = useComputed(() => avgIntervalSeconds(blips.value));
    const avgDistractionDuration = useComputed(() =>
        avgDurationSeconds(distractions.value.map(({ start, end }) => end - start)),
    );
    const avgDistractionInterval = useComputed(() =>
        avgIntervalSeconds(distractions.value.map((d) => d.start)),
    );

    const blipsOpen = useSignal(false);
    const distractionsOpen = useSignal(false);

    const onBlip = () => {
        blips.value = [...blips.value, totalSeconds.value];
    };

    const onDistracted = () => {
        if (status.value === "distracted") {
            distractions.value = [
                ...distractions.value,
                { start: distractionStart.value, end: totalSeconds.value },
            ];
            distractionStart.value = null;
            status.value = "running";
            return;
        }
        distractionStart.value = totalSeconds.value;
        status.value = "distracted";
    };

    const isStopped = status.value === "stopped";
    const isIdle = isStopped && totalSeconds.value === 0;
    const isDisabled = isStopped || status.value === "paused";

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
                            {isIdle ? "—" : `${focusRate.value.toFixed(0)}%`}
                        </ItemDescription>
                        <ItemFooter>
                            <Progress value={isIdle ? 0 : focusRate.value} />
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
                                className="size-3 ml-auto transition-transform group-data-[state=open]:rotate-180"
                            />
                        </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="bg-secondary">
                        {blips.value.length === 0 ? (
                            <EmptyState icon={FlagIcon} message="No blips recorded yet" />
                        ) : (
                            <Table>
                                <TableBody>
                                    {blips.value.map((secs, idx) => (
                                        <TableRow key={idx}>
                                            <TableCell className="pl-2">
                                                Blip #{idx + 1}
                                            </TableCell>
                                            <TableCell className="text-right pr-2">
                                                {secondsToDuration(secs)}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
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
                                className="size-3 ml-auto transition-transform group-data-[state=open]:rotate-180"
                            />
                        </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="bg-secondary">
                        {distractions.value.length === 0 ? (
                            <EmptyState
                                icon={WarningCircleIcon}
                                message="No distractions recorded yet"
                            />
                        ) : (
                            <Table>
                                <TableBody>
                                    {distractions.value.map(({ start, end }, idx) => (
                                        <TableRow key={idx}>
                                            <TableCell className="pl-2">
                                                Distraction #{idx + 1}
                                            </TableCell>
                                            <TableCell className="text-right pr-2">
                                                {secondsToDuration(end - start)}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CollapsibleContent>
                </Collapsible>
            </div>

            {isStopped && !isIdle && (
                <>
                    <Separator className="my-4" />
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                        Session summary
                    </p>
                    <div className="border divide-y text-sm">
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
                                    {secondsToDuration(
                                        Math.round(avgDistractionDuration.value),
                                    )}
                                </span>
                            </div>
                        )}
                        {avgDistractionInterval.value !== null && (
                            <div className="flex justify-between px-3 py-2">
                                <span className="text-muted-foreground">
                                    Avg. time between distractions
                                </span>
                                <span>
                                    {secondsToDuration(
                                        Math.round(avgDistractionInterval.value),
                                    )}
                                </span>
                            </div>
                        )}
                    </div>
                </>
            )}

            <Separator className="my-4" />
            <ButtonGroup className="w-full gap-1">
                <Button
                    variant="secondary"
                    className="flex-1"
                    onClick={onBlip}
                    disabled={isDisabled}
                >
                    <FlagIcon weight="fill" className="size-3" />
                    Blip
                </Button>
                <Button
                    variant="secondary"
                    className="flex-1"
                    onClick={onDistracted}
                    disabled={isDisabled}
                >
                    <WarningCircleIcon weight="fill" className="size-3" />
                    {status.value === "distracted" ? "Not distracted" : "Distracted"}
                </Button>
            </ButtonGroup>
        </div>
    );
}

const EmptyState = ({ icon: Icon, message }: { icon: PhosphorIcon; message: string }) => (
    <Empty>
        <EmptyHeader>
            <EmptyMedia>
                <Icon className="size-8 opacity-40" />
            </EmptyMedia>
            <EmptyTitle>{message}</EmptyTitle>
        </EmptyHeader>
    </Empty>
);
