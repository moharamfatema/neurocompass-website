import React, { useState } from 'react';

const Prediction = () => {
    const [studentId, setStudentId] = useState("");
    const [prediction, setPrediction] = useState(null);

    const handleSubmit = async () => {
        const response = await fetch(`/api/predict?student_id=${studentId}`);
        const data = await response.json();
        setPrediction(data);
    };

    return (
        <div className='p-4 w-3/4 m-auto gap-5 flex flex-col mt-10 text-center'>
            <h1>Prediction</h1>
            <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="Student ID"
                className='p-2'
            />
            <button onClick={handleSubmit} className='bg-purple-800'>Predict</button>

            {prediction && (
                <div className='text-left'>
                    <h2>Prediction Results</h2>
                    <pre>{JSON.stringify(prediction, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default Prediction;
