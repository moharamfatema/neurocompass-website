import React, { createContext, useReducer, ReactNode } from "react";

import { Filter } from "../services/visualization";

// Define the initial state
interface State {
    filters: Filter[];
    selectedValues: Record<string, string[] | number[]>;
}

const initialState: State = {
    filters: [],
    selectedValues: {},
};

// Define the actions
type Action =
    | { type: "SET_FILTERS"; payload: Filter[] }
    | {
          type: "SET_SELECTED_VALUES";
          payload: Record<string, string[] | number[]>;
      }
    | { type: "RESET_SELECTED_VALUES" };

// Create the context
const StoreContext = createContext<{
    state: State;
    dispatch: React.Dispatch<Action>;
}>({
    state: initialState,
    dispatch: () => null,
});

// Create the reducer
const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "SET_FILTERS":
            return { ...state, filters: action.payload };
        case "SET_SELECTED_VALUES":
            return { ...state, selectedValues: { ...state.selectedValues, ...action.payload } };
        case "RESET_SELECTED_VALUES":
            return { ...state, selectedValues: {} };
        default:
            return state;
    }
};

export const getFiltersQueryFromSelectedValues = (state: State) => {
    const selectedValues = state.selectedValues;
    const filters = state.filters;
    const query = [];
    filters.forEach((filter) => {
        if (selectedValues[filter.field]) {
            query.push({
                field: filter.field,
                type: filter.type,
                values: selectedValues[filter.field],
            });
        }
    });
    console.debug("getFiltersQueryFromSelectedValues -> query", query);
    return query;
};

// Create the provider
const StoreProvider : React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <StoreContext.Provider value={{ state, dispatch }}>
            {children}
        </StoreContext.Provider>
    );
};

export { StoreProvider, StoreContext };
