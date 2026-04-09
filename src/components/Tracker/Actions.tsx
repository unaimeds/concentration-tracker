import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { TimerState } from "@/context/timer";
import { FlagIcon, WarningCircleIcon } from "@phosphor-icons/react";
import { useContext } from "preact/hooks";

export default function Actions() {
    const { status, totalSeconds, blips, distractions, distractionStart } =
        useContext(TimerState);

    const onBlip = () => {
        blips.value = [...blips.value, totalSeconds.value];
    };

    const onDistracted = () => {
        if (status.value === "distracted") {
            distractions.value = [
                ...distractions.value,
                { start: distractionStart.value!, end: totalSeconds.value },
            ];
            distractionStart.value = null;
            status.value = "running";
            return;
        }
        distractionStart.value = totalSeconds.value;
        status.value = "distracted";
    };

    const isDisabled = status.value === "stopped" || status.value === "paused";

    return (
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
    );
}
