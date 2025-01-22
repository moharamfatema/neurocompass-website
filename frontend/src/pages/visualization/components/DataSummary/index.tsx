import { getFiltersQueryFromSelectedValues, StoreContext } from "@/store/root";
import { useDataSummary } from "@/services/visualization";
import React from "react";
import Card, { CardProps, SkeletonCard } from "./Card";

const DataSummary = () => {
    const { state } = React.useContext(StoreContext);
    const [queryFilters, setQueryFilters] = React.useState<any[]>([]);
    const { selectedValues } = state;
    const { data, isLoading, isError } = useDataSummary({
        filters: queryFilters,
    });
    React.useEffect(() => {
        setQueryFilters(getFiltersQueryFromSelectedValues(state));
    }, [selectedValues]);

    const [cards, setCards] = React.useState<CardProps[]>([]);
    React.useEffect(() => {
        if (data) {
            setCards([
                { title: "Average score", value: data.averageScore },
                {
                    title: "Average studied credits",
                    value: data.averageStudiedCredits,
                },
            ]);
        }
    }, [data]);
    if (isLoading) {
        return (
            <div className="flex gap-5">
                {Array.from({ length: 2 }).map((_, index) => (
                    <SkeletonCard key={index} />
                ))}
            </div>
        );
    }
    if (isError) {
        return <div>Error fetching data summary</div>;
    }
    return (
        <div className="flex gap-5 text-center">
            {cards?.map((card: CardProps) => (
                <Card key={card.title} title={card.title} value={card.value} />
            ))}
        </div>
    );
};

export default DataSummary;
