
import {
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip
} from "recharts";

import { formatPercentage } from "@/lib/utils";

const COLORS = ["#0062FF", "#12C6FF", "#FF647F", "#FF9354"];

type Props = {
    data?: {
        name: string;
        value: number;
    }[];
}

export const PieVariant = ({
    data,
}: Props) => {


    return (
        <div>
            PieVariant
        </div>
    )
}

