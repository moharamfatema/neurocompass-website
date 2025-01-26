import React from "react";
import Filters from "./components/filters";
import DataSummary from "./components/DataSummary";
import Regions from "./components/Charts/Regions";
import Scores from "./components/Charts/Scores";

const ChartTypes = ["regions","scores"];

const ChartTypeTabs: React.FC<{
    selectedTab: number;
    setSelectedTab: (tab: number) => void;
}> = ({ selectedTab, setSelectedTab }) => {
    return (
        <div className="flex justify-center gap-4">
            {ChartTypes.map((tab, index) => (
                <button
                    key={index}
                    className={`${
                        selectedTab === index
                            ? "bg-zinc-500 text-zinc-900"
                            : "bg-zinc-900 text-zinc-500"
                    } p-2 rounded-lg`}
                    onClick={() => setSelectedTab(index)}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
};

const Charts: React.FC = () => {
    const [selectedTab, setSelectedTab] = React.useState(0);

    return (
        <React.Fragment>
            <ChartTypeTabs
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
            />
            <div className="grow text-center align-middle border border-zinc-500 rounded-lg">
                {/* visualization */}
                {selectedTab === 0 && <Regions />}
                {selectedTab === 1 && <Scores />}
            </div>
        </React.Fragment>
    );
};

const Visualization = () => {
    return (
        <div className=" flex flex-col items-center justify-center gap-2 m-5 max-h-full">
            <section className="flex w-full rounded-lg bg-zinc-900 h-full">
                <aside className="min-w-72 w-1/4 h-full">
                    <Filters />
                </aside>
                <main className="flex flex-col w-full p-4 h-full max-h-[80dvh] overflow-y-auto gap-2">
                    {/* data summary cards */}
                    <DataSummary />
                    <Charts />
                </main>
            </section>
        </div>
    );
};

export default Visualization;
