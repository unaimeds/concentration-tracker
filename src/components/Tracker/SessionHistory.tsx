import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSessionHistory } from "@/hooks/useSessionHistory";
import { Session } from "@/types/session";
import { secondsToDuration } from "@/utils/math";
import {
    ArrowLeftIcon,
    ClockCounterClockwiseIcon,
    TrashIcon,
    XIcon,
} from "@phosphor-icons/react";
import { useComputed, useSignal } from "@preact/signals";
import BlipList from "./BlipList";
import DistractionList from "./DistractionList";
import SessionSummary from "./SessionSummary";
import StatsOverview from "./StatsOverview";

export default function SessionHistory() {
    const { sessions, deleteSession, clearAll } = useSessionHistory();
    const selectedId = useSignal<string | null>(null);

    const selectedSession = useComputed(() =>
        selectedId.value
            ? (sessions.value.find((s) => s.id === selectedId.value) ?? null)
            : null,
    );

    return (
        <Dialog
            onOpenChange={(open) => {
                if (!open) selectedId.value = null;
            }}
        >
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon-sm">
                    <ClockCounterClockwiseIcon />
                    <span className="sr-only">History</span>
                </Button>
            </DialogTrigger>
            <DialogContent
                showCloseButton={false}
                className="flex h-[90svh] flex-col gap-0 p-0 sm:h-[560px] sm:max-w-sm"
            >
                {selectedSession.value ? (
                    <>
                        <div className="flex shrink-0 items-center gap-2 border-b px-3 py-2">
                            <Button
                                variant="ghost"
                                size="icon-sm"
                                onClick={() => (selectedId.value = null)}
                            >
                                <ArrowLeftIcon />
                                <span className="sr-only">Back to history</span>
                            </Button>
                            <div className="min-w-0 flex-1">
                                <DialogTitle className="truncate">
                                    {selectedSession.value.label ?? "Unlabeled session"}
                                </DialogTitle>
                                <DialogDescription>
                                    {formatDate(selectedSession.value.date)}
                                </DialogDescription>
                            </div>
                            <DialogClose asChild>
                                <Button variant="ghost" size="icon-sm">
                                    <XIcon />
                                    <span className="sr-only">Close</span>
                                </Button>
                            </DialogClose>
                        </div>
                        <ScrollArea className="flex-1">
                            <div className="flex flex-col gap-4 p-4">
                                <StatsOverview
                                    totalSeconds={selectedSession.value.totalSeconds}
                                    blips={selectedSession.value.blips}
                                    distractions={selectedSession.value.distractions}
                                />
                                <div className="flex flex-col gap-1">
                                    <BlipList blips={selectedSession.value.blips} />
                                    <DistractionList
                                        distractions={selectedSession.value.distractions}
                                    />
                                </div>
                                <SessionSummary
                                    totalSeconds={selectedSession.value.totalSeconds}
                                    blips={selectedSession.value.blips}
                                    distractions={selectedSession.value.distractions}
                                />
                            </div>
                        </ScrollArea>
                    </>
                ) : (
                    <>
                        <div className="flex shrink-0 items-center justify-between border-b px-4 py-2">
                            <DialogTitle>History</DialogTitle>
                            <div className="flex items-center gap-1">
                                {sessions.value.length > 0 && (
                                    <Button
                                        variant="ghost"
                                        size="xs"
                                        className="text-destructive hover:text-destructive"
                                        onClick={clearAll}
                                    >
                                        <TrashIcon />
                                        Clear all
                                    </Button>
                                )}
                                <DialogClose asChild>
                                    <Button variant="ghost" size="icon-sm">
                                        <XIcon />
                                        <span className="sr-only">Close</span>
                                    </Button>
                                </DialogClose>
                            </div>
                        </div>
                        <DialogDescription className="sr-only">
                            Your past concentration sessions
                        </DialogDescription>
                        <ScrollArea className="flex-1">
                            {sessions.value.length === 0 ? (
                                <div className="flex flex-col items-center justify-center gap-2 p-8 text-center">
                                    <ClockCounterClockwiseIcon className="text-muted-foreground size-8" />
                                    <p className="text-muted-foreground text-sm">
                                        No sessions recorded yet
                                    </p>
                                </div>
                            ) : (
                                <div className="divide-y">
                                    {sessions.value.map((session) => (
                                        <SessionRow
                                            key={session.id}
                                            session={session}
                                            onSelect={() =>
                                                (selectedId.value = session.id)
                                            }
                                            onDelete={() => deleteSession(session.id)}
                                        />
                                    ))}
                                </div>
                            )}
                        </ScrollArea>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}

function SessionRow({
    session,
    onSelect,
    onDelete,
}: {
    session: Session;
    onSelect: () => void;
    onDelete: () => void;
}) {
    return (
        <div
            className="group hover:bg-muted/50 flex cursor-pointer items-center gap-2 px-4 py-3"
            onClick={onSelect}
        >
            <div className="min-w-0 flex-1">
                {session.label ? (
                    <p className="truncate text-sm font-medium">{session.label}</p>
                ) : (
                    <p className="text-muted-foreground truncate text-sm italic">
                        Unlabeled
                    </p>
                )}
                <p className="text-muted-foreground text-xs">
                    {formatDate(session.date)}
                </p>
            </div>
            <span className="text-muted-foreground shrink-0 font-mono text-xs">
                {secondsToDuration(session.totalSeconds)}
            </span>
            <Button
                variant="ghost"
                size="icon-xs"
                className="text-muted-foreground hover:text-destructive shrink-0 opacity-0 group-hover:opacity-100"
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                }}
            >
                <TrashIcon />
                <span className="sr-only">Delete session</span>
            </Button>
        </div>
    );
}

function formatDate(timestamp: number): string {
    const date = new Date(timestamp);
    const now = new Date();
    const time = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    if (date.toDateString() === now.toDateString()) return `Today · ${time}`;
    const isThisYear = date.getFullYear() === now.getFullYear();
    const dateStr = date.toLocaleDateString([], {
        month: "short",
        day: "numeric",
        ...(isThisYear ? {} : { year: "numeric" }),
    });
    return `${dateStr} · ${time}`;
}
