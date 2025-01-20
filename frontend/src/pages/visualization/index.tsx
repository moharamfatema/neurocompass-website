import React from "react";
import Filters from "./components/filters";

const Visualization = () => {
    return (
        <div className=" flex flex-col items-center justify-center gap-10 m-10">
            <h1 className="text-2xl font-semibold text-center">
                Visualization
            </h1>
            <section className="flex w-full rounded-lg bg-zinc-900">
                <aside className="min-w-72 w-1/4 h-full">
                    <Filters />
                </aside>
                <main className="flex flex-col w-full p-4 h-full">
                    <span>tabs to chose the type of visualization</span>
                    <div className="grow text-center align-middle border border-zinc-500 rounded-lg">the chart will be displayed here</div>
                </main>
            </section>
        </div>
    );
};

export default Visualization;
