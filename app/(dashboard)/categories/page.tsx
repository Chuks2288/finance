"use client";

import { Button } from "@/components/ui/button";
import { useNewCategory } from "@/features/categories/hooks/use-new-category";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Plus } from "lucide-react";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { TableSkeleton } from "@/features/accounts/components/skeleton/table-skeleton";
import { useBulkDeleteCategories } from "@/features/categories/api/use-bulk-delete-categories";

const CategoriesPage = () => {
    const { onOpen } = useNewCategory();

    const deleteCategories = useBulkDeleteCategories();
    const categoriesQuery = useGetCategories();
    const categories = categoriesQuery.data || [];

    const isDisabled =
        categoriesQuery.isLoading ||
        deleteCategories.isPending;


    return (
        <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
            <Card className="border-none drop-shadow-sm">
                <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-xl line-clamp-1">
                        Categories Page
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
                    {categoriesQuery.isLoading ?
                        <>
                            <TableSkeleton columns={columns} />
                        </>
                        : <>
                            <DataTable
                                filterKey="name"
                                columns={columns}
                                data={categories}
                                onDelete={(row) => {
                                    const ids = row.map((r) => r.original.id);
                                    deleteCategories.mutate({ ids })
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

export default CategoriesPage;