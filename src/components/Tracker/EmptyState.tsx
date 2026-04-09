import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";

interface EmptyStateProps {
    icon: PhosphorIcon;
    message: string;
}

export const EmptyState = ({ icon: Icon, message }: EmptyStateProps) => (
    <Empty>
        <EmptyHeader>
            <EmptyMedia>
                <Icon className="size-8 opacity-40" />
            </EmptyMedia>
            <EmptyTitle>{message}</EmptyTitle>
        </EmptyHeader>
    </Empty>
);
