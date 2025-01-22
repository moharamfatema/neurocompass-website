import React from 'react';
import { Link } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';

import image1 from '../assets/vis_1.avif'; 
import image2 from '../assets/recommender_1.avif';  

const Home = () => (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "80px" }}>
        <header>
            <h1 style={{ fontSize: "4rem", fontWeight: "bold", marginBottom: "50px" }}>NeuroCompass</h1>
        </header>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "50px", gap: "30px", flexWrap: "wrap" }}>
            {/* Image block 1: Visualization */}
            <Link to={"/visualization"} style={{ width: "48%", textDecoration: "none" }}>
                <div style={{ position: "relative", width: "100%", paddingBottom: "50%", backgroundColor: "#ccc", borderRadius: "12px", overflow: "hidden" }}>
                    <img src={image1} alt="Visualization" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", borderRadius: "12px" }} />
                    <h3 style={{
                        position: "absolute",
                        bottom: "12px",
                        left: "30px",
                        fontSize: "2rem",
                        fontWeight: "bold",
                        color: "white",
                        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)"
                    }}>
                        Visualization
                    </h3>
                </div>
            </Link>

            {/* Image block 2: Recommender */}
            <Link to={"/prediction"} style={{ width: "48%", textDecoration: "none" }}>
                <div style={{ position: "relative", width: "100%", paddingBottom: "50%", backgroundColor: "#ccc", borderRadius: "12px", overflow: "hidden" }}>
                    <img src={image2} alt="Recommender" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", borderRadius: "12px" }} />
                    <h3 style={{
                        position: "absolute",
                        bottom: "12px",
                        left: "30px",
                        fontSize: "2rem",
                        fontWeight: "bold",
                        color: "white",
                        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)"
                    }}>
                        Recommender
                    </h3>
                </div>
            </Link>
        </div>

        <div style={{ marginTop: "50px", display: "flex", justifyContent: "space-between", gap: "30px", flexWrap: "wrap" }}>
            <section style={{ width: "48%" }}>
                <p>
                NeuroCompass provides clear data visualizations that help educators quickly identify student performance, learning trends, and potential factors influencing learning outcomes. With intuitive charts, real-time dashboards, and powerful filtering options, teachers can customize views to analyze specific groups or performance patterns. This allows them to easily track students' progress and uncover underlying feature distributions, enabling more informed teaching decisions.               
                </p>
            </section>

            <section style={{ width: "48%" }}>
                <p>
                NeuroCompass's personalized recommendation system provides students with tailored learning paths, ensuring they receive the most suitable resources. The system intelligently suggests courses and materials, helping students progress steadily, while also guiding educators to optimize their teaching content.
                </p>
            </section>
        </div>

        <footer style={{
            position: "fixed",
            bottom: "0",
            left: "0",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            padding: "10px 20px"
        }}>
            <p style={{ marginLeft: "10px" }}>Neurobooster 2024-2025</p>
            <p style={{ marginRight: "10px" }}>Learning Analytics @UDE</p>
        </footer>

    </div>
);

export default Home;
