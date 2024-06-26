import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import { client } from "@/lib/hono";
import { convertAmountFromiliunits } from "@/lib/utils";

export const useGetSummary = () => {
    const params = useSearchParams();
    const from = params.get("from") || "";
    const to = params.get("to") || "";
    const accountId = params.get("accountId") || "";

    const query = useQuery({
        // TODO: Check if params are needed in the key
        queryKey: ["summary", { from, to, accountId }],
        queryFn: async () => {
            const response = await client.api.summary.$get({
                query: {
                    from,
                    to,
                    accountId
                }
            });

            if (!response.ok) {
                throw new Error("Failed to fetch summary")
            }

            const { data } = await response.json();
            return {
                ...data,
                incomeAmount: convertAmountFromiliunits(data.incomeAmount),
                expensesAmount: convertAmountFromiliunits(data.expensesAmount),
                remainingAmount: convertAmountFromiliunits(data.remainingAmount),
                categories: data.categories.map((category) => ({
                    ...category,
                    value: convertAmountFromiliunits(category.value),
                })),
                days: data.days.map((day) => ({
                    ...day,
                    income: convertAmountFromiliunits(day.income),
                    expenses: convertAmountFromiliunits(day.expenses),
                }))
            };
        }
    });

    return query;
}


