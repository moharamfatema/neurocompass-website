import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./utils";

interface LearningPath {
    recommendations: string[];
    study_method: string;
    engagement: string;
}

interface Student {
    id_student: number;
    code_module: string;
    code_presentation: string;
    activity_type: string;
    sum: number;
    count: number;
    id_assessment: number;
    assessment_type: string;
    date: number;
    weight: number;
    date_submitted: number;
    is_banked: number;
    score: number;
    date_registration: number;
    gender: "M" | "F";
    region: string;
    highest_education: string;
    imd_band: string;
    age_band: string;
    num_of_prev_attempts: number;
    studied_credits: number;
    disability: "Y" | "N";
    final_result: string;
    module_presentation_length: number;
    study_status: string;
    withdrawal_status: string;
}

export interface PredictionResult {
    student: Student;
    learning_path: LearningPath;
}

const StudentNotFoundError = new Error("Student not found");

const fetchPrediction = async (
    studentId: number | null,
): Promise<PredictionResult | null> => {
    if (studentId === null) {
        return null;
    }
    try {
        const response = await axiosInstance.get(`/predict`, {
            params: {
                student_id: studentId,
            },
        });
        return response.data;
    } catch (error) {
        console.error("fetchPrediction -> error", error);
        if (error.response?.status === 404) {
            throw StudentNotFoundError;
        } else {
            throw new Error("Error fetching prediction");
        }
    }
};

export const usePrediction = (studentId: number) => {
    return useQuery({
        queryKey: ["prediction", studentId],
        queryFn: () => fetchPrediction(studentId),
        retry(failureCount, error) {
            if (error === StudentNotFoundError) {
                return false;
            }
            return failureCount < 3;
        },
    });
};

export default usePrediction;
