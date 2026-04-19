import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";
import { TimerState } from "@/context/timer";
import { FlagIcon, WarningCircleIcon } from "@phosphor-icons/react";
import { useContext } from "preact/hooks";

export default function Actions() {
    const {
        status,
        totalSeconds,
        blips,
        distractions,
        distractionStart,
        distractionReason,
    } = useContext(TimerState);

    const onBlip = () => {
        blips.value = [...blips.value, totalSeconds.value];
    };

    const onDistracted = () => {
        if (status.value === "distracted") {
            const reason = distractionReason.value.trim() || undefined;
            distractions.value = [
                ...distractions.value,
                { start: distractionStart.value!, end: totalSeconds.value, reason },
            ];
            distractionStart.value = null;
            distractionReason.value = "";
            status.value = "running";
            return;
        }
        distractionStart.value = totalSeconds.value;
        status.value = "distracted";
    };

    const isDisabled = status.value === "stopped" || status.value === "paused";

    return (
        <div class="flex w-full flex-col gap-1">
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
            {status.value === "distracted" && (
                <Input
                    placeholder="Reason (optional)"
                    value={distractionReason.value}
                    onInput={(e) =>
                        (distractionReason.value = (e.target as HTMLInputElement).value)
                    }
                />
            )}
        </div>
    );
}
