import { Button } from "@/components/ui/button";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { EmptyState } from "@/components/Tracker/EmptyState";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { TimerState } from "@/context/timer";
import { secondsToDuration } from "@/utils/math";
import { CaretDownIcon, WarningCircleIcon } from "@phosphor-icons/react";
import { useSignal } from "@preact/signals";
import { useContext } from "preact/hooks";

export default function DistractionList() {
    const { distractions } = useContext(TimerState);
    const open = useSignal(false);

    return (
        <Collapsible open={open.value} onOpenChange={(v) => (open.value = v)}>
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
