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

export interface FilterCategorical{
    field: string;
    type: "categorical";
    values: string[];
}

export interface FilterNumerical{
    field: string;
    type: "numerical";
    values: ValuesNumeric;
}

export interface RegionCount {
    count: number;
    region: string;
}
export interface RegionCountResponse {
    regions: RegionCount[];
    is_cached: boolean;
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

const fetchVisualizationDataSummary = async (filters: Filter[]) => {
    try {
        const response = await axiosInstance.get("/visualize/data-summary", {
            params: {
                filters: JSON.stringify(filters),
            },
        });
        return response.data;
    } catch (error) {
        console.error("fetchVisualizationDataSummary -> error", error);
        throw new Error("Error fetching visualization data summary");
    }
}

const fetchRegionCount = async (filters: Filter[]) => {
    try {
        const response = await axiosInstance.get("/visualize/regions-count", {
            params: {
                filters: JSON.stringify(filters),
            },
        });
        return response.data.regions;
    } catch (error) {
        console.error("fetchRegionCount -> error", error);
        throw new Error("Error fetching region count");
    }
};

// Custom hook to use visualization filters
export const useVisualizationFilters = () => {
    return useQuery({
        queryKey: ["visualizationFilters"],
        queryFn: fetchVisualizationFilters,
    });
};


export const useDataSummary = ({ filters }:any) => {
    return useQuery({
        queryKey: ["dataSummary", filters],
        queryFn: () => fetchVisualizationDataSummary(filters),
    });
}

export const useRegionCount = ({ filters }:any) => {
    return useQuery({
        queryKey: ["regionCount", filters],
        queryFn: () => fetchRegionCount(filters),
    });
}