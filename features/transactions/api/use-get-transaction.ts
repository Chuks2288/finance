import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { convertAmountFromiliunits } from "@/lib/utils";

export const useGetTransaction = (id?: string) => {
    const query = useQuery({
        enabled: !!id,
        queryKey: ["transactions", { id }],
        queryFn: async () => {
            const response = await client.api.transactions[":id"].$get({
                param: { id }
            });

            if (!response.ok) {
                throw new Error("Failed to fetch transaction")
            }

            const { data } = await response.json();
            return {
                ...data,
                amount: convertAmountFromiliunits(data.amount),
            };
        }
    });

    return query;
}