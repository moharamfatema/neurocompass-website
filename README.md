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
