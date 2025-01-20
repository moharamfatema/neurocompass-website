import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Filter, useVisualizationFilters } from "@/services/visualization";
import FilterCategorical from "./FilterCategorical";
import FilterNumerical from "./FilterNumerical";

const filtersSkeleton = () => (
    <div className="flex flex-col space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="w-1/2 h-10" />
        ))}
    </div>
);

const Filters = () => {
    const { data, isLoading, isError } = useVisualizationFilters();

    if (isLoading) return filtersSkeleton();
    if (isError) return <div>Error fetching filters</div>;

    return (
        <div className="grid p-4 grid-cols-1 gap-4 w-full border-r border-zinc-500 overflow-y-auto h-[600px] overflow-x-hidden">
            {data.map((filter: Filter) => (
                <React.Fragment key={filter.field}>
                    {filter.type === "categorical" && (
                        <FilterCategorical
                            filter={filter}
                            key={filter.field}
                            value={filter.values[0]}
                        />
                    )}
                    {filter.type === "numerical" && (
                        <FilterNumerical filter={filter} key={filter.field} />
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

export default Filters;
