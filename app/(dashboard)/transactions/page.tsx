"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction";
import { useGetTransactions } from "@/features/transactions/api/use-get-transactions";
import { TableSkeleton } from "@/features/transactions/components/skeleton/table-skeleton";
import { useBulkDeleteTransactions } from "@/features/transactions/api/use-bulk-delete-transactions";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { UploadButton } from "./upload-button";
import { ImportCard } from "./import-card";

enum VARIANTS {
    LIST = "LIST",
    IMPORT = "IMPORT"
}

const INITIAL_IMPORT_RESULTS = {
    data: [],
    errors: [],
    meta: {},
}

const TransactionsPage = () => {
    const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST);
    const [importResults, setImportResults] = useState(INITIAL_IMPORT_RESULTS);

    const onUpload = (results: typeof INITIAL_IMPORT_RESULTS) => {
        setImportResults(results);
        setVariant(VARIANTS.IMPORT);
    }

    const onCancelImport = () => {
        setImportResults(INITIAL_IMPORT_RESULTS);
        setVariant(VARIANTS.LIST);
    }

    const { onOpen } = useNewTransaction();

    const deleteTransactions = useBulkDeleteTransactions();
    const transactionsQuery = useGetTransactions();
    const transactions = transactionsQuery.data || [];

    const isDisabled =
        transactionsQuery.isLoading ||
        deleteTransactions.isPending;


    if (variant === VARIANTS.IMPORT) {
        return (
            <>
                <ImportCard
                    data={importResults.data}
                    onCancel={onCancelImport}
                    onSubmit={() => { }}
                />
            </>
        )
    }

    return (
        <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
            <Card className="border-none drop-shadow-sm">
                <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-xl line-clamp-1">
                        Transactions History
                    </CardTitle>
                    <div className="flex flex-col lg:flex-row items-center gap-2">
                        <Button
                            size="sm"
                            onClick={onOpen}
                            className="w-full lg:w-auto"
                        >
                            <Plus className="size-4 mr-2" />
                            Add new
                        </Button>
                        <UploadButton
                            onUpload={onUpload}
                        />
                    </div>
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