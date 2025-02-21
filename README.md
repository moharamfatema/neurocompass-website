# Neurocompass Web Application

This repository contains the source code for the Neurocompass web application. It is a *monorepo* that contains two packages: `backend` and `frontend`. The `backend` package is a FastAPI application that serves the API for the web application. The `frontend` package is a React application that serves the user interface for the web application.

## Requirements

- [Python 3.11](https://www.python.org/downloads/)
- [Node.js 23.1](https://nodejs.org/en/download/)
- [npm 10.9](https://www.npmjs.com/get-npm)
- [uv](https://docs.astral.sh/uv/) (optional)

All the provided bash commands are for Unix-based systems. If you are using a Windows system, you can use the Windows Subsystem for Linux (WSL) to run the commands, or find the equivalent commands for your system.

## Getting Started

To get started you need to setup the backend and frontend packages. First, clone the repository, then navigate to the `backend` directory and create a virtual environment:

```bash
cd backend
uv venv
source .venv/bin/activate
uv pip install -r requirements.txt
```

To setup the frontend, navigate to the `frontend` directory and install the required dependencies:

```bash
cd frontend
npm install
```

Add the required assets to the `backend/assets` directory. The assets include the models and the dataset. The models should be placed in the `backend/assets/models` directory, and the dataset should be placed in the `backend/assets/data` directory.

To start the backend development server, run the following command inside the `backend` directory:

```bash
source .venv/bin/activate
python3 src/main.py
```

This will start the FastAPI server on `http://localhost:8000`.

To start the React development server, open a new terminal and run the following command inside the `frontend` directory:

```bash
npm run dev
```

This will start the React development server on `http://localhost:5173`. You can now navigate to `http://localhost:5173` in your browser to view the web application.

## Initializing the Database

After adding the files `merged_df.csv` and `processed_data.csv` to the `backend/assets/data` directory, you can initialize the database by running the python script in the `backend/Scripts` directory:

```bash
cd backend
python3 Scripts/import_csv.py
```

You only need to run this script once to initialize the database. (It takes a while to run)

## Resources

- [FastAPI Guides][fastapi]
- [React Guides][react]
- [React Router Documentation][react-router]
- [Vite Guides][vite]
- [UV Documentation][uv]
- [PlotlyJS Documentation][plotlyJS]
- [Shadcn Documentation][shadcn]

# Technologies, Libraries, and Algorithms Used

## Technologies
- Jupyter Notebook: Used for code execution, visualization, and documentation.
- Pandas DataFrames: Used for data manipulation, merging, and preprocessing.
- Plotly Dash / Tableau: Used for interactive data visualization and reporting.

## Libraries
- Data Handling & Processing:
    - pandas: For data manipulation and merging multiple tables.
    - numpy: For numerical computations and array operations.

- Data Visualization:
    - matplotlib: For static visualizations such as histograms and boxplots.
    - seaborn: For statistical visualizations, heatmaps, and correlation plots.
  
- Machine Learning:
  - scikit-learn: Provides tools for classification, clustering, regression, dimensionality reduction, feature engineering, and model selection.
  
## Algorithm - classification in machine learning
- 1. Data Analysis & Preprocessing
  - Descriptive Statistics: Summarizes dataset features.
  - Data Merging: Uses composite keys (id_student, code_module, code_presentation).
  - Handling Missing Data: Imputation or removal of missing values.
  
- 2. Feature Engineering
  - Map raw date into features
  - Two main features: Student study method frature and student engagement feature
    
- 3. Scaling & Normalization: prepares data for ML
  - One-Hot Encoding: Converts categorical feetures into 0 or 1.
  - MinMaxScaler: Converts numerical features into [0,1]
  
- 4. Choosing Machine Learning Models
  - Classification: predict the class of student study method
    - Support Vector Classification (SVC)
    - Gradient Boosting
    - Decision Tree
   
- 5. Evaluation models
 - Compare the accuracy, precision and recall beteewn different models (compare classification performance)
 - Confusion Matrix (Analyzes classification results)
 - Finally choose Gradient Boosting because of its best performance
  
- 4. Recommendation System
 - Based on the ML prediction(student study method preference) and student study engagement feature to recommend some learning recourses
  

## Common issues and solutions

### Connection refused to mongodb

If you are running the mongoDB server on windows, and running the backend on WSL, you may encounter a connection refused error. To fix this, you need to change the `bindIp` in the `mongod.conf` file to `0.0.0.0`. 
[See this article][article1]

<!-- References -->
[fastapi]: https://fastapi.tiangolo.com/tutorial/
[react]: https://reactjs.org/docs/getting-started.html
[react-router]: https://reactrouter.com/start/library/installation
[vite]: https://vitejs.dev/guide/
[uv]: https://docs.astral.sh/uv/
[plotly]: https://plotly.com/python/
[plotlyJS]: https://plotly.com/javascript/react/
[shadcn]: https://ui.shadcn.com/docs

[article1]:https://medium.com/@uncledev/how-to-connect-a-project-running-wsl-to-mongodb-running-on-windows-609bb7a6e1e8
