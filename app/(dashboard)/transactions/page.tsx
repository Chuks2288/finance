"use client";

import { Button } from "@/components/ui/button";
import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Plus } from "lucide-react";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { useGetTransactions } from "@/features/transactions/api/use-get-transactions";
import { TableSkeleton } from "@/features/transactions/components/skeleton/table-skeleton";
import { useBulkDeleteTransactions } from "@/features/transactions/api/use-bulk-delete-transactions";

const TransactionsPage = () => {
    const { onOpen } = useNewTransaction();

    const deleteTransactions = useBulkDeleteTransactions();
    const transactionsQuery = useGetTransactions();
    const transactions = transactionsQuery.data || [];

    const isDisabled =
        transactionsQuery.isLoading ||
        deleteTransactions.isPending;

    return (
        <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
            <Card className="border-none drop-shadow-sm">
                <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-xl line-clamp-1">
                        Transactions History
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
                    {transactionsQuery.isLoading ?
                        <>
                            <TableSkeleton columns={columns} />
                        </>
                        : <>
                            <DataTable
                                filterKey="payee"
                                columns={columns}
                                data={transactions}
                                onDelete={(row) => {
                                    const ids = row.map((r) => r.original.id);
                                    deleteTransactions.mutate({ ids })
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

export default TransactionsPage