import { Filter } from "@/services/visualization";
import React from "react";
import { DualRangeSlider } from "@/components/ui/RangeSlider";
import { snakeToTitle } from "@/components/ui/utils";

interface FilterNumericalProps {
    filter: Filter;
}
const FilterNumerical: React.FC<FilterNumericalProps> = ({ filter }) => {
    return (
        <React.Fragment>
            <h3 className="text-base font-semibold">{snakeToTitle(filter.field)}</h3>
            <DualRangeSlider
                className="w-48"
                min={filter.values.min}
                max={filter.values.max}
                step={1}
                value={[filter.values.min, filter.values.max]}
                label={(value) => value}
            />
        </React.Fragment>
    );
};

export default FilterNumerical;
