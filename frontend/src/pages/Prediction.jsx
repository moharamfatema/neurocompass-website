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
        <div>
            <h1>Prediction Page</h1>
            <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
            />
            <button onClick={handleSubmit}>Predict</button>

            {prediction && (
                <div>
                    <h2>Prediction Results</h2>
                    <pre>{JSON.stringify(prediction, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default Prediction;
