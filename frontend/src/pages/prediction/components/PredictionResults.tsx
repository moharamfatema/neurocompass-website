import usePrediction, { PredictionResult } from "@/services/prediction";
import React from "react";
import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

const ErrorAlert: React.FC<{ error: Error }> = ({ error }) => (
    <Alert variant="destructive" className="bg-red-100">
        <AlertCircle />
        <AlertTitle>{"Oops! Something went wrong"}</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
    </Alert>
);

const PredictionSkeleton: React.FC = () => (
    <div className="grid gap-4 grid-cols-1">
        <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} className="h-60">
                    <Skeleton className="h-40 rounded-none border-b border-zinc-700" />
                    <Skeleton className="h-20 rounded-none flex flex-col justify-center items-start p-2 gap-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-1/2" />
                    </Skeleton>
                </Skeleton>
            ))}
        </div>
    </div>
);

const PredictionCards: React.FC<{ prediction: PredictionResult }> = ({
    prediction,
}) => {
    const { student, learning_path } = prediction;
    const cardData = [
        {
            title: "Engagement Level",
            content: learning_path.engagement,
            description: "Indicates the student's current level of participation."
        },
        {
            title: "Preferred Study Method",
            content: learning_path.study_method,
            description: "The recommended study approach based on previous learning habits."
        },
        {
            title: "Recommended Learning Resources & Materials",
            content: learning_path.recommendations,
            description: "Personalized recommendations based on the engagement level and preferred study method to satisfy student's unique learning needs."
        }
    ];

    return (
        <div className="grid grid-cols-3 gap-4">
            {/* 2 blocks on the left */}
            <div className="grid grid-rows-2 gap-4 col-span-1">
                {cardData.slice(0, 2).map((card, index) => (
                    <Card
                        key={index}
                        className="bg-zinc-900 rounded-lg px-2 py-4 text-sm flex flex-col gap-5 justify-between h-full"
                    >
                        <h3 className="text-xs text-white">
                            {card.title}
                        </h3>
                        <p className="text-center px-2 text-xl font-extrabold">
                            {card.content}
                        </p>

                        <p className="text-gray-400 text-xs border-t border-zinc-700 pt-2">
                            {card.description}
                        </p>
                    </Card>
                ))}
            </div>

            {/* 1 block on the right */}
            <div className="col-span-2 flex flex-col">
                <Card className="bg-zinc-900 rounded-lg p-4 text-sm flex flex-col justify-between h-full">
                        <h3 className="text-xs text-white ">
                            {cardData[2].title}
                        </h3>
                        <p className="text-lg flex flex-col">
                            {(cardData[2].content as string[]).map(
                                (course, i) => (
                                    <span
                                        key={i}
                                        className="h-full block border-b border-zinc-700 py-3 text-left hover:bg-zinc-800 px-2 text-sm font-semibold"
                                    >
                                        {course}
                                    </span>
                                ),
                            )}
                        </p>
                    <p className="text-gray-400 mt-4 text-xs border-t border-zinc-700 pt-2">
                        {cardData[2].description}
                    </p>
                </Card>
            </div>

            {/* Student details */}
            {/* <div className=" col-span-4 flex flex-col text-gray-400 text-xs">
                <h5 className="text-basetext-left">
                    {" "}
                    student details here: 
                </h5>
                {JSON.stringify(student, null, 2)}
            </div> */}
        </div>
    );
};

interface PredictionResultsProps {
    studentId: number;
}
const PredictionResults: React.FC<PredictionResultsProps> = ({ studentId }) => {
    const { data: prediction, isLoading, error } = usePrediction(studentId);

    if (isLoading) {
        return <PredictionSkeleton />;
    }

    if (error) {
        return <ErrorAlert error={error} />;
    }
    return prediction && <PredictionCards prediction={prediction} />;
};

export default PredictionResults;
