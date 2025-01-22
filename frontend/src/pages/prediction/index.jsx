import React from 'react';
import PredictionResults from './components/PredictionResults';

const Prediction = () => {
    const [studentId, setStudentId] = React.useState("");
    const [ predictionQuery, setPredictionQuery ] = React.useState(null);

    const handleSubmit = () => {
        setPredictionQuery(parseInt(studentId));
    }


    return (
        <div className='p-4 w-3/4 m-auto gap-5 flex flex-col mt-10 text-center'>
            <div className="grid grid-cols-1 gap-2 w-1/2 m-auto">
                <h5 className='text-sm'>Enter your Student ID to unlock your personalized lecture, materials, and activities</h5>
                <input
                    type="text"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    placeholder="Student ID"
                    className='p-2'
                />
                <button onClick={handleSubmit} className='bg-purple-800'>Generate</button>
            </div>

            <PredictionResults studentId={predictionQuery} />
        </div>
    );
};

export default Prediction;
