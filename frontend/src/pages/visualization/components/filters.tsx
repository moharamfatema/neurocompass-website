import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Filter,
    FilterNumerical as FilterNumericalType,
    FilterCategorical as FilterCategoricalType,
    useVisualizationFilters,
} from "@/services/visualization";
import FilterCategorical from "./FilterCategorical";
import FilterNumerical from "./FilterNumerical";
import { StoreContext } from "@/store/root";

const filtersSkeleton = () => (
    <div className="grid p-4 grid-cols-1 gap-4 w-full border-r border-zinc-500 overflow-y-auto h-[600px] overflow-x-hidden">
        {Array.from({ length: 4 }).map((_, index) => (
            <React.Fragment key={index}>
                <Skeleton key={`${index}.label`} className="w-2/3 h-8" />
                <Skeleton key={index} className="w-full h-20" />
            </React.Fragment>
        ))}
    </div>
);

const Filters = () => {
    const { data, isLoading, isError } = useVisualizationFilters();
    const {
        state: { filters, selectedValues },
        dispatch,
    } = React.useContext(StoreContext);

    React.useEffect(() => {
        if (data) {
            dispatch({ type: "SET_FILTERS", payload: data });
        }
    }, [data]);

    const handleSelectMultiple = (
        field: string,
        value: string[] | number[],
    ) => {
        dispatch({
            type: "SET_SELECTED_VALUES",
            payload: { [field]: value },
        });
    };
    if (isLoading) return filtersSkeleton();
    if (isError) return <div>Error fetching filters</div>;

    return (
        filters &&
        filters.length && (
            <div className="grid p-4 grid-cols-1 gap-4 w-full border-r border-zinc-500 overflow-y-auto h-[600px] overflow-x-hidden">
                {filters.map((filter: Filter) => (
                    <React.Fragment key={filter.field}>
                        {filter.type === "categorical" && (
                            <FilterCategorical
                                filter={filter as FilterCategoricalType}
                                key={filter.field}
                                value={selectedValues[filter.field] as string[]}
                                onChange={(value) =>
                                    handleSelectMultiple(filter.field, value)
                                }
                            />
                        )}
                        {filter.type === "numerical" && (
                            <FilterNumerical
                                filter={filter as FilterNumericalType}
                                value={selectedValues[filter.field] as number[]}
                                key={filter.field}
                                onChange={(value) =>
                                    handleSelectMultiple(filter.field, value)
                                }
                            />
                        )}
                    </React.Fragment>
                ))}
            </div>
        )
    );
};

export default Filters;
