import React from "react";
import Filters from "./components/filters";
import DataSummary from "./components/DataSummary";

const Visualization = () => {
    return (
        <div className=" flex flex-col items-center justify-center gap-2 m-5 max-h-full">
            <section className="flex w-full rounded-lg bg-zinc-900 h-full">
                <aside className="min-w-72 w-1/4 h-full">
                    <Filters />
                </aside>
                <main className="flex flex-col w-full p-4 h-full gap-2">
                    {/* data summary cards */}
                    <DataSummary />
                    <span>tabs to chose the type of visualization</span>
                    <div className="grow text-center align-middle border border-zinc-500 rounded-lg">
                        the chart will be displayed here
                    </div>
                </main>
            </section>
        </div>
    );
};

export default Visualization;
