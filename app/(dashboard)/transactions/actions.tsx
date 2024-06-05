"use client";

import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useOpenAccount } from "@/features/accounts/hooks/use-open-account";
import { useDeleteAccount } from "@/features/accounts/api/use-delete-account";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import { useConfirm } from "@/hooks/use-confirm";


type Props = {
    id: string;
}

export const Actions = ({
    id
}: Props) => {
    const { onOpen } = useOpenAccount();
    const deleteMutation = useDeleteAccount(id);

    const [ConfirmDialog, confirm] = useConfirm(
        "Are you sure?",
        "You are about to delete this account",
    )

    const onDelete = async () => {
        const ok = await confirm();

        if (ok) {
            deleteMutation.mutate();
        }
    }

    const isPending = deleteMutation.isPending;


    return (
        <>
            <ConfirmDialog />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="size-8 p-0"
                    >
                        <MoreHorizontal className="size-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {/* @ts-ignore */}
                    <DropdownMenuItem
                        disabled={isPending}
                        onClick={() => onOpen(id)}
                    >
                        <Edit className="size-4 mr-2" />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        disabled={isPending}
                        onClick={onDelete}
                    >
                        <Trash className="size-4 mr-2" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu >
        </>
    )
}

