import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
    <div>
        <h1>Learning Path Predictor</h1>
        <p>This model predicts optimal learning paths for students.</p>
        <div>
            <Link to="/visualization">Visualization</Link>
            <Link to="/prediction">Prediction</Link>
        </div>
    </div>
);

export default Home;
