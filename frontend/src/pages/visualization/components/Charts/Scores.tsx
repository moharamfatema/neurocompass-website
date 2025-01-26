import React from "react";
import Plot from "react-plotly.js";
import { ScoresHistogram, useScoresHistogram } from "@/services/visualization";
import { getFiltersQueryFromSelectedValues, StoreContext } from "@/store/root";
import { Skeleton } from "@/components/ui/skeleton";

const Scores = () => {
    const { state } = React.useContext(StoreContext);
    const [queryFilters, setQueryFilters] = React.useState<any[]>([]);
    const { selectedValues } = state;

    React.useEffect(() => {
        setQueryFilters(getFiltersQueryFromSelectedValues(state));
    }, [selectedValues]);

    const { data, isLoading, isError } = useScoresHistogram({
        filters: queryFilters,
    });

    if (isLoading) {
        return (
            <Skeleton className="flex flex-col justify-center items-center p-10 gap-10">
                <Skeleton className="w-full h-64 bg-gray-300"/>
            </Skeleton>
        );
    }

    if (isError) {
        return <div>Error fetching data</div>;
    }

    return (
        <Plot
            data={[
                {
                    x: data?.map((score: ScoresHistogram) => score.score),
                    y: data?.map((score: ScoresHistogram) => score.count),
                    type: "bar",
                },
            ]}
            layout={{
                paper_bgcolor: "transparent",
                plot_bgcolor: "transparent",
                font: {
                    color: "#fff",
                },
                title: { text: "Scores histogram" },
            }}
        />
    );
};

export default Scores;
