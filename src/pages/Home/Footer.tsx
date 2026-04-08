import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { FlagIcon, WarningCircleIcon } from "@phosphor-icons/react";

export default function Footer() {
    return (
        <CardFooter className="flex gap-1">
            <Button className="flex-1">
                <FlagIcon weight="fill" className="size-3" />
                Blip
            </Button>
            <Button className="flex-1">
                <WarningCircleIcon weight="fill" className="size-3" />
                Distracted
            </Button>
        </CardFooter>
    );
}
