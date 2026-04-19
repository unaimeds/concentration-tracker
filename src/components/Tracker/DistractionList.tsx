import { Button } from "@/components/ui/button";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { EmptyState } from "@/components/Tracker/EmptyState";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { TimerState } from "@/context/timer";
import { Distraction } from "@/types/distraction";
import { secondsToDuration } from "@/utils/math";
import { CaretDownIcon, WarningCircleIcon } from "@phosphor-icons/react";
import { useSignal } from "@preact/signals";
import { useContext } from "preact/hooks";

export default function DistractionList({
    distractions: distractionsProp,
}: { distractions?: Distraction[] } = {}) {
    const ctx = useContext(TimerState);
    const distractions = distractionsProp ?? ctx.distractions.value;

    const isOpen = useSignal(false);

    return (
        <Collapsible open={isOpen.value} onOpenChange={(v) => (isOpen.value = v)}>
            <CollapsibleTrigger asChild>
                <Button variant="outline" className="group w-full">
                    Distractions
                    <CaretDownIcon
                        weight="fill"
                        className="ml-auto size-3 transition-transform group-data-[state=open]:rotate-180"
                    />
                </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="bg-secondary">
                {distractions.length === 0 ? (
                    <EmptyState
                        icon={WarningCircleIcon}
                        message="No distractions recorded yet"
                    />
                ) : (
                    <Table>
                        <TableBody>
                            {distractions.map(({ start, end, reason }, idx) => (
                                <TableRow key={idx}>
                                    <TableCell className="pl-2">
                                        <div>
                                            Distraction #{idx + 1}
                                            {reason && (
                                                <p className="text-muted-foreground text-xs">
                                                    {reason}
                                                </p>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="pr-2 text-right">
                                        {secondsToDuration(end - start)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </CollapsibleContent>
        </Collapsible>
    );
}
