import streamlit as st
import pandas as pd
import pydeck as pdk
import plotly.express as px
from sklearn.cluster import DBSCAN
import matplotlib.pyplot as plt
from datetime import datetime

st.set_page_config(page_title="Bangkok Airbnb Analysis", layout="wide")
st.title('Bangkok Airbnb Listings Analysis')

# Load and prepare data
@st.cache_data
def load_data():
    data = pd.read_csv('airbnb_listings.csv')
    
    # Clean and prepare data
    data['price'] = pd.to_numeric(data['price'], errors='coerce')
    data = data.dropna(subset=['latitude', 'longitude', 'price'])
    return data

# Load data
data = load_data()

# Sidebar filters
st.sidebar.header('Filters')

# Price range filter
max_price = int(data['price'].max())
min_price = int(data['price'].min())
price_range = st.sidebar.slider(
    'Price Range (THB)',
    min_value=min_price,
    max_value=max_price,
    value=(min_price, max_price)
)


# DBSCAN clustering parameters
st.sidebar.header('DBSCAN Parameters')

st.sidebar.write("eps (degree)")
st.sidebar.write("Create a slider for eps here")
                               
st.sidebar.write("min_samples")
st.sidebar.write("Create a slider for min_sample here")                                


num_top_clusters = st.sidebar.slider('Number of Top Clusters to Show', 1, 10, 5)

# Map style selection
map_style = st.sidebar.selectbox(
    'Select Base Map Style',
    options=['Dark', 'Light', 'Road', 'Satellite'],
    index=0
)

# Define map style dictionary
MAP_STYLES = {
    'Dark': 'mapbox://styles/mapbox/dark-v10',
    'Light': 'mapbox://styles/mapbox/light-v10',
    'Road': 'mapbox://styles/mapbox/streets-v11',
    'Satellite': 'mapbox://styles/mapbox/satellite-v9'
}

# Filter data based on selections
filtered_data = data.copy()
filtered_data = filtered_data[
    (filtered_data['price'] >= price_range[0]) &
    (filtered_data['price'] <= price_range[1]) 
]


# Main content - Key metrics
col1, col2, col3, col4 = st.columns(4)
with col1:
    st.metric("Total Listings", len(filtered_data))
with col2:
    st.metric("Average Price", f"฿{filtered_data['price'].mean():.0f}")
with col3:
    st.metric("Average Reviews", f"{filtered_data['number_of_reviews'].mean():.1f}")
with col4:
    st.metric("Neighborhoods", filtered_data['neighbourhood'].nunique())

# Price Distribution
st.header('Price Distribution')

fig_hist = px.histogram(
    filtered_data,
    x='price',
    nbins=100,  # You can adjust the number of bins
    title='Distribution of Listing Prices',
    labels={'price': 'Price (THB)', 'count': 'Number of Listings'},
)

st.plotly_chart(fig_hist)

# Hotspot Analysis
st.header('Accommodation Hotspot Analysis')

try:
    # Perform DBSCAN clustering
    coords = filtered_data[['latitude', 'longitude']] 
    eps_degrees = 0.002
    min_samples = 3
    db = DBSCAN(eps=eps_degrees, min_samples=min_samples).fit(coords)
    
    # Add cluster labels to dataframe
    filtered_data['cluster'] = db.labels_
    
    # Analyze clusters
    clusters_count = filtered_data['cluster'].value_counts()
    clusters_count = clusters_count[clusters_count.index != -1]  # Exclude noise points
    top_clusters = clusters_count.head(num_top_clusters)
    
    # Generate colors for clusters
    unique_clusters = filtered_data[filtered_data['cluster'].isin(top_clusters.index)]['cluster'].unique()
    colormap = plt.get_cmap('hsv')
    cluster_colors = {cluster: [int(x*255) for x in colormap(i/len(unique_clusters))[:3]] + [160] 
                     for i, cluster in enumerate(unique_clusters)}
    
    # Create visualization dataframe
    viz_data = filtered_data[filtered_data['cluster'].isin(top_clusters.index)].copy()
    viz_data['color'] = viz_data['cluster'].map(cluster_colors)
    
    st.write("Draw a scatter map for clusters here")
    
    # Create cluster layer

    
    # Create and display the map

    st.write("Draw a heatmap for clusters here")
    
    # Create heatmap layer    

    
    # Create and display the map

    st.write("Draw a hexagon map for clusters here")
    
    # Create hexagon layer    


    # Create and display the map

    
    # Cluster Analysis
    st.subheader('Cluster Statistics')

except Exception as e:
    st.error(f"Error in clustering analysis: {e}")



# Price by neighborhood
price_by_neighborhood = filtered_data.groupby('neighbourhood')['price'].agg(['mean', 'count']).reset_index()
price_by_neighborhood.columns = ['neighbourhood', 'avg_price', 'listings_count']

fig_scatter = px.scatter(price_by_neighborhood,
                        x='listings_count',
                        y='avg_price',
                        text='neighbourhood',
                        title='Average Price vs Number of Listings by Neighborhood',
                        labels={'listings_count': 'Number of Listings',
                               'avg_price': 'Average Price (THB)'})
fig_scatter.update_traces(textposition='top center')
st.plotly_chart(fig_scatter)

