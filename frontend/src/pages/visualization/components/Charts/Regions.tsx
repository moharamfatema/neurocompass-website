import React from "react";
import Plot from "react-plotly.js";
import { RegionCount, useRegionCount } from "@/services/visualization";
import { getFiltersQueryFromSelectedValues, StoreContext } from "@/store/root";
import { Skeleton } from "@/components/ui/skeleton";

const Regions = () => {
    const { state } = React.useContext(StoreContext);
    const [queryFilters, setQueryFilters] = React.useState<any[]>([]);
    const { selectedValues } = state;

    React.useEffect(() => {
        setQueryFilters(getFiltersQueryFromSelectedValues(state));
    }, [selectedValues]);

    const { data, isLoading, isError } = useRegionCount({
        filters: queryFilters,
    });
    if (isLoading) {
        return (
            <Skeleton className="flex flex-col justify-center items-center p-10 gap-10">
                <Skeleton className="w-96 h-4 bg-gray-300 rounded" />
                <div className="flex items-center gap-4">
                    <Skeleton className="w-72 h-72 rounded-full bg-gray-300" />
                    <div className="flex flex-col gap-2 ml-4">
                        {Array.from({ length: 10 }).map((_, index) => (
                            <Skeleton
                                key={index}
                                className="w-40 h-4 bg-gray-300 rounded"
                            />
                        ))}
                    </div>
                </div>
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
                    labels: data?.map((region: RegionCount) => region.region),
                    values: data?.map((region: RegionCount) => region.count),
                    type: "pie",
                },
            ]}
            layout={{
                paper_bgcolor: "transparent",
                font: {
                    color: "#fff",
                },
                title: { text: "Number of students per region" },
            }}
        />
    );
};

export default Regions;
