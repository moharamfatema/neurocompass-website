import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./utils";

interface ValuesNumeric {
    min: number;
    max: number;
}

export interface Filter {
    field: string;
    type: "categorical" | "numerical";
    values: string[] | ValuesNumeric;
}

// Function to fetch visualization filters
const fetchVisualizationFilters: () => Promise<Filter[]> = async () => {
    try {
        const response = await axiosInstance.get("/visualize/filters");
        return response.data;
    } catch (error) {
        console.error("fetchVisualizationFilters -> error", error);
        throw new Error("Error fetching visualization filters");
    }
};

// Custom hook to use visualization filters
export const useVisualizationFilters = () => {
    return useQuery({
        queryKey: ["visualizationFilters"],
        queryFn: fetchVisualizationFilters,
    });
};
