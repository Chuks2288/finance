"use client";

import { Button } from "@/components/ui/button";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Loader2, Plus } from "lucide-react";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { useGetAccounts } from "@/features/accounts/api/use-get-account";
import { TableSkeleton } from "@/features/accounts/components/skeleton/table-skeleton";
import { useBulkDeleteAccounts } from "@/features/accounts/api/use-bulk-delete";

// const data = [
//     {
//         id: "728ed52f",
//         amount: 100,
//         status: "pending",
//         email: "m@example.com",
//     },
//     {
//         id: "728ed52f",
//         amount: 50,
//         status: "success",
//         email: "a@example.com",
//     },
// ]

const AccountsPage = () => {
    const { onOpen } = useNewAccount();

    const deleteAccounts = useBulkDeleteAccounts();
    const accountsQuery = useGetAccounts();
    const accounts = accountsQuery.data || [];

    const isDisabled =
        accountsQuery.isLoading ||
        deleteAccounts.isPending;

    return (
        <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
            <Card className="border-none drop-shadow-sm">
                <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-xl line-clamp-1">
                        Account Page
                    </CardTitle>
                    <Button
                        size="sm"
                        onClick={onOpen}
                    >
                        <Plus className="size-4 mr-2" />
                        Add new
                    </Button>
                </CardHeader>
                <CardContent>
                    {accountsQuery.isLoading ?
                        <>
                            <TableSkeleton columns={columns} />
                        </>
                        : <>
                            <DataTable
                                filterKey="email"
                                columns={columns}
                                data={accounts}
                                onDelete={(row) => {
                                    const ids = row.map((r) => r.original.id);
                                    deleteAccounts.mutate({ ids })
                                }}
                                disabled={isDisabled}
                            />
                        </>
                    }
                </CardContent>
            </Card>
        </div>
    )
}

export default AccountsPage