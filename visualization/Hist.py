import dash
from dash import dcc, html
from dash.dependencies import Input, Output
import plotly.express as px
import pandas as pd
import numpy as np

data = pd.read_csv('/Users/kaustubh/Desktop/React/random_sample_1000.csv')

# Prepare data for the histogram and pie chart
scores = data['Scores'] if 'Scores' in data.columns else np.random.normal(50, 20, 1000)
scores = np.clip(scores, 0, 100)  # Ensure scores are between 0 and 100
data['Scores'] = scores

region_counts = data['region'].value_counts()  # Count regions for pie chart

# Create a Dash app
app = dash.Dash(__name__)

# Layout
app.layout = html.Div([
    html.H1("Interactive Dash App"),

    # Histogram Section
    html.Div([
        html.H2("Histogram of Scores"),
        dcc.Graph(id="histogram-chart"),
        html.Label("Select Score Range:"),
        dcc.RangeSlider(
            id="score-slider",
            min=0,
            max=100,
            step=5,
            marks={i: str(i) for i in range(0, 101, 10)},
            value=[0, 100]
        ),
        html.Label("Select Bin Size:"),
        dcc.Dropdown(
            id="bin-size-dropdown",
            options=[
                {"label": "5", "value": 5},
                {"label": "10", "value": 10},
                {"label": "20", "value": 20}
            ],
            value=10,
            clearable=False
        )
    ], style={'margin-bottom': '50px'})
])
    



# Callback for updating histogram
@app.callback(
    Output("histogram-chart", "figure"),
    [Input("score-slider", "value"),
     Input("bin-size-dropdown", "value")]
)
def update_histogram(score_range, bin_size):
    filtered_data = data[(data["Scores"] >= score_range[0]) & (data["Scores"] <= score_range[1])]
    fig = px.histogram(
        filtered_data, x="Scores",
        nbins=int((score_range[1] - score_range[0]) / bin_size),
        title="Distribution of Scores",
        labels={"Scores": "Score"},
        color_discrete_sequence=["orange"]
    )
    return fig



# Run the app
if __name__ == '__main__':
    app.run_server(debug=True)
    
    


