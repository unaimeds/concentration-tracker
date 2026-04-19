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
import { CaretDownIcon, FlagIcon } from "@phosphor-icons/react";
import { useSignal } from "@preact/signals";
import { useContext } from "preact/hooks";

export default function BlipList({ blips: blipsProp }: { blips?: number[] } = {}) {
    const ctx = useContext(TimerState);
    const blips = blipsProp ?? ctx.blips.value;

    const isOpen = useSignal(false);

    return (
        <Collapsible open={isOpen.value} onOpenChange={(v) => (isOpen.value = v)}>
            <CollapsibleTrigger asChild>
                <Button variant="outline" className="group w-full">
                    Blips
                    <CaretDownIcon
                        weight="fill"
                        className="ml-auto size-3 transition-transform group-data-[state=open]:rotate-180"
                    />
                </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="bg-secondary">
                {blips.length === 0 ? (
                    <EmptyState icon={FlagIcon} message="No blips recorded yet" />
                ) : (
                    <Table>
                        <TableBody>
                            {blips.map((secs, idx) => (
                                <TableRow key={idx}>
                                    <TableCell className="pl-2">
                                        Blip #{idx + 1}
                                    </TableCell>
                                    <TableCell className="pr-2 text-right">
                                        {secondsToDuration(secs)}
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
