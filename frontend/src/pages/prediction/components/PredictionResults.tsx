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
    return (
        <div className="grid gap-4 grid-cols-1">
            <h5 className="text-base font-semibold text-left">
                Recommended Learning Path
            </h5>
            <div className="grid grid-cols-3 gap-4">
                <Card className="bg-zinc-900 rounded-lg p-4 text-sm">
                    {learning_path.engagement}
                </Card>
                <Card className="bg-zinc-900 rounded-lg p-4 text-sm">
                    {learning_path.study_method}
                </Card>
                <Card className="bg-zinc-900 rounded-lg p-4 text-sm ">
                    {learning_path.recommendations}
                </Card>
            </div>
            <div className="grid gap-4">
                <h5 className="text-base font-semibold text-left">
                    {" "}
                    student details here
                </h5>
                {JSON.stringify(student, null, 2)}
            </div>
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
