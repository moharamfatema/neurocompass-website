import { Filter } from "@/services/visualization";
import React from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {  snakeToTitle } from "@/components/ui/utils";

interface FilterCategoricalProps {
    filter: Filter;
    value: string;
}

const FilterCategorical: React.FC<FilterCategoricalProps> = ({ filter, value }) => {
    return (
        <React.Fragment>
            <h3 className="text-base font-semibold">{snakeToTitle(filter.field)}</h3>
            <Select value={value}>
                <SelectTrigger>
                    <SelectValue>Select a value</SelectValue>
                </SelectTrigger>
                <SelectContent>
                    {filter.values.map((value: string) => (
                        <SelectItem key={value} value={value}>
                            {value}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </React.Fragment>
    );
};
export default FilterCategorical;
