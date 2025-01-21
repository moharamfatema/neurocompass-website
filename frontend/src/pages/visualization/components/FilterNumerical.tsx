import {
    Filter,
    FilterNumerical as FilterNumericalType,
} from "@/services/visualization";
import React from "react";
import { DualRangeSlider } from "@/components/ui/RangeSlider";
import { snakeToTitle } from "@/components/ui/utils";

interface FilterNumericalProps {
    filter: FilterNumericalType;
    value: number[];
    onChange: (value: number[]) => void;
}
const FilterNumerical: React.FC<FilterNumericalProps> = ({
    filter,
    value = [filter.values.min, filter.values.max],
    onChange,
}) => {
    return (
        <React.Fragment>
            <h3 className="text-sm font-semibold">
                {snakeToTitle(filter.field)}
            </h3>
            <DualRangeSlider
                className="w-full h-16 text-xs font-bold"
                min={filter.values.min}
                max={filter.values.max}
                step={1}
                value={value}
                label={(value) => value}
                onValueChange={onChange}
            />
        </React.Fragment>
    );
};

export default FilterNumerical;
