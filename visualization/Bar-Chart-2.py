import pandas as pd
import plotly.graph_objects as go

data = pd.read_csv('/Users/kaustubh/Desktop/React/random_sample_1000.csv')


# Group data by code_module and count occurrences
module_counts = data['code_module'].value_counts()

# Create a figure
fig = go.Figure()

# Add traces for each code module
for code_module, count in module_counts.items():
    fig.add_trace(go.Bar(
        x=[code_module],
        y=[count],
        name=code_module,
        visible=True  # Initially visible; this will be controlled by checkboxes
    ))

# Show the figure
fig.show()
fig.write_html("BarChart-2.html")
