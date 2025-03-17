import pandas as pd
import numpy as np
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans

class Clustering:
    def __init__(self, file_path): # DO NOT modify this line
        #Add other parameters if needed
        self.file_path = file_path 
        self.df = None #parameter for loading csv
        self.kmeans = None
        self.scaler = StandardScaler()
        
    def load_and_preprocess_data(self):
        """
        Loads the CSV file, filters edible mushrooms, selects specific features,
        imputes missing values with mean, and standardizes the data.
        """
        df = pd.read_csv(self.file_path)
        df = df[df["label"] == 'e'][['cap-color-rate', 'stalk-color-above-ring-rate']]
        df = pd.DataFrame(SimpleImputer(strategy="mean").fit_transform(df), columns=df.columns)
        return pd.DataFrame(self.scaler.fit_transform(df), columns=df.columns)

    def Q1(self): # DO NOT modify this line
        """
        Step1-4
            1. Load the CSV file.
            2. Choose edible mushrooms only.
            3. Only the variables below have been selected to describe the distinctive
               characteristics of edible mushrooms:
               'cap-color-rate','stalk-color-above-ring-rate'
            4. Provide a proper data preprocessing as follows:
                - Fill missing with mean
                - Standardize variables with Standard Scaler
        """
        self.df = self.load_and_preprocess_data()
        return self.df.shape

    def Q2(self): # DO NOT modify this line
        """
        Step5-6
            5. K-means clustering with 5 clusters (n_clusters=5, random_state=0, n_init='auto')
            6. Show the maximum centroid of 2 features ('cap-color-rate' and 'stalk-color-above-ring-rate') in 2 digits.
        """
        self.df = self.df if self.df is not None else self.load_and_preprocess_data()
        self.kmeans = KMeans(n_clusters=5, random_state=0, n_init='auto').fit(self.df)
        return np.round(self.kmeans.cluster_centers_.max(axis=0), 2)

    def Q3(self): # DO NOT modify this line
        """
        Step7
            7. Convert the centroid value to the original scale, and show the minimum centroid of 2 features in 2 digits.

        """
        if self.kmeans is None:
            self.Q2()
        return np.round(self.scaler.inverse_transform(self.kmeans.cluster_centers_).min(axis=0), 2)
