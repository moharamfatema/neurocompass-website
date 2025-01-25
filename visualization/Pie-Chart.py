from dash import Dash, dcc, html, Input, Output
import pandas as pd
import plotly.express as px

data = pd.read_csv('/Users/kaustubh/Desktop/React/random_sample_1000.csv')

# Prepare data for pie chart
region_counts = data['region'].value_counts()

# Create a Dash app
app = Dash(__name__)

# Layout
app.layout = html.Div([
    dcc.Dropdown(
        id='region-dropdown',
        options=[{'label': region, 'value': region} for region in region_counts.index],
        multi=True,
        placeholder="Select regions..."
    ),
    dcc.Graph(id='pie-chart')
])

# Callback for interactivity
@app.callback(
    Output('pie-chart', 'figure'),
    [Input('region-dropdown', 'value')]
)
def update_pie_chart(selected_regions):
    if not selected_regions:
        filtered_data = region_counts
    else:
        filtered_data = region_counts[region_counts.index.isin(selected_regions)]
    
    # Create pie chart
    fig = px.pie(filtered_data, names=filtered_data.index, values=filtered_data.values,
                 title="Distribution of Students by Region")
    return fig

# Run the app
if __name__ == '__main__':
    app.run_server(debug=True)
