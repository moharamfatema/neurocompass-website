import { FilterCategorical as FilterCategoricalType } from "@/services/visualization";
import React from "react";
import { snakeToTitle } from "@/components/ui/utils";
import { MultiSelect } from "@/components/ui/multi-select";

interface FilterCategoricalProps {
    filter: FilterCategoricalType;
    value: string[];
    onChange: (value: string[]) => void;
}

const FilterCategorical: React.FC<FilterCategoricalProps> = ({
    filter,
    onChange,
}) => {
    return (
        <React.Fragment>
            <h3 className="text-sm font-semibold">
                {snakeToTitle(filter.field)}
            </h3>
            <MultiSelect
                options={(filter.values as string[]).map((value) => ({
                    label: value,
                    value,
                }))}
                defaultValue={filter.values}
                onValueChange={onChange}
                maxCount={1}
                className="h-16 w-full text-xs dark:bg-zinc-800 dark:text-white hover:dark:bg-zinc-700"
            />
        </React.Fragment>
    );
};
export default FilterCategorical;
