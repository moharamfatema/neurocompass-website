import pandas as pd
import plotly.graph_objects as go

# Load the dataset
data = pd.read_csv('/Users/kaustubh/Desktop/React/random_sample_1000.csv')


# Group data by activity_type and count occurrences
activity_counts = data['activity_type'].value_counts()

# Create a figure
fig = go.Figure()

# Add traces for each activity type
for activity_type, count in activity_counts.items():
    fig.add_trace(go.Bar(
        x=[activity_type],
        y=[count],
        name=activity_type,
        visible=True  # Initially all are visible, controlled by dropdown later
    ))

# Create dropdown menu buttons
buttons = []


# Add dropdown menu to the layout
fig.update_layout(
    updatemenus=[dict(
        active=0,
        buttons=buttons
    )],
    title="Number of Students by Activity Type",
    xaxis_title="Activity Type",
    yaxis_title="Number of Students"
)

# Show the figure
fig.show()
fig.write_html("BarChart.html")
