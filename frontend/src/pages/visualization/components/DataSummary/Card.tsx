import React from "react";
import {
    Card as CnCard,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export interface CardProps {
    title: string;
    value: number;
}

const Card: React.FC<CardProps> = ({ title, value }) => {
    return (
        <CnCard className="w-1/2  rounded-xl dark:bg-transparent dark:border-zinc-500">
            <CardHeader>
                <CardTitle className="text-7xl text-zinc-50">{value.toFixed(2)}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-base font-semibold text-zinc-50">{title}</div>
            </CardContent>
        </CnCard>
    );
};

const SkeletonCard: React.FC = () => {
    return (
        <CnCard className="w-1/2  rounded-xl dark:bg-transparent dark:border-zinc-500">
            <CardHeader>
                <CardTitle>
                    <Skeleton className="h-[72px] w-2/3 mx-auto" />
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Skeleton className="h-6 w-2/3 mx-auto" />
            </CardContent>
        </CnCard>
    );
};

export { SkeletonCard };
export default Card;
