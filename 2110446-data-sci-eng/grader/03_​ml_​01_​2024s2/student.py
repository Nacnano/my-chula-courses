import pandas as pd
import numpy as np
from sklearn.impute import SimpleImputer
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report

class MushroomClassifier:
    def __init__(self, data_path):  # DO NOT modify this line
        self.data_path = data_path
        self.df = pd.read_csv(data_path)

    def Q1(self):  # DO NOT modify this line
        """Before doing the data prep, how many "na" are there in the "gill-size" variable?"""
        return self.df['gill-size'].isna().sum()

    def _clean_data(self):
        """Prepares the dataset by dropping irrelevant columns and rows with missing target labels."""
        self.df.dropna(subset=['label'], inplace=True)
        columns_to_drop = [
            'id', 'gill-attachment', 'gill-spacing', 'gill-size', 'gill-color-rate',
            'stalk-root', 'stalk-surface-above-ring', 'stalk-surface-below-ring',
            'stalk-color-above-ring-rate', 'stalk-color-below-ring-rate',
            'veil-color-rate', 'veil-type'
        ]
        self.df.drop(columns=columns_to_drop, inplace=True)
        self.df.reset_index(drop=True, inplace=True)

    def Q2(self):  # DO NOT modify this line
        """How many rows and variables remain after cleaning the data?"""
        self._clean_data()
        return self.df.shape

    def _impute_and_encode(self):
        """Fills missing values and encodes the label column."""
        # Numeric imputation
        num_imputer = SimpleImputer(strategy='mean')
        self.df[['cap-color-rate']] = num_imputer.fit_transform(self.df[['cap-color-rate']])

        # Categorical imputation
        cat_imputer = SimpleImputer(strategy='most_frequent')
        categorical_columns = [
            'cap-shape', 'cap-surface', 'bruises', 'odor', 'stalk-shape',
            'ring-number', 'ring-type', 'spore-print-color', 'population', 'habitat'
        ]
        self.df[categorical_columns] = cat_imputer.fit_transform(self.df[categorical_columns])

        # Encode labels
        self.df['label'] = self.df['label'].map({'e': 1, 'p': 0})

    def Q3(self):  # DO NOT modify this line
        """Returns the counts of class 0 and class 1 after imputation and encoding."""
        self._clean_data()
        self._impute_and_encode()
        return (self.df['label'].value_counts()[0], self.df['label'].value_counts()[1])

    def _prepare_train_test_split(self):
        """Encodes nominal variables and splits the dataset into training and testing sets."""
        nominal_columns = [
            'cap-shape', 'cap-surface', 'bruises', 'odor', 'stalk-shape',
            'ring-number', 'ring-type', 'spore-print-color', 'population', 'habitat'
        ]
        self.df = pd.get_dummies(self.df, columns=nominal_columns, drop_first=True)
        y = self.df.pop('label')
        X = self.df
        return train_test_split(X, y, stratify=y, test_size=0.2, random_state=2020)

    def Q4(self):  # DO NOT modify this line
        """Returns the shapes of training and testing sets."""
        self._clean_data()
        self._impute_and_encode()
        X_train, X_test, y_train, y_test = self._prepare_train_test_split()
        return (X_train.shape, X_test.shape)

    def _grid_search_random_forest(self, X_train, y_train):
        """Performs grid search with cross-validation for a Random Forest classifier."""
        param_grid = {
            'criterion': ['gini', 'entropy'],
            'max_depth': [2, 3],
            'min_samples_leaf': [2, 5],
            'n_estimators': [100],
        }
        rf_clf = RandomForestClassifier(random_state=2020)
        grid_search = GridSearchCV(rf_clf, param_grid, cv=5)
        grid_search.fit(X_train, y_train)
        return grid_search

    def Q5(self):  # DO NOT modify this line
        """Returns the best parameters from the Random Forest grid search."""
        self._clean_data()
        self._impute_and_encode()
        X_train, X_test, y_train, y_test = self._prepare_train_test_split()
        grid_search = self._grid_search_random_forest(X_train, y_train)
        best_params = grid_search.best_params_
        return (best_params['criterion'], best_params['max_depth'], best_params['min_samples_leaf'], best_params['n_estimators'], 2020)

    def Q6(self):  # DO NOT modify this line
        """Returns the macro F1 scores for each class."""
        self._clean_data()
        self._impute_and_encode()
        X_train, X_test, y_train, y_test = self._prepare_train_test_split()
        grid_search = self._grid_search_random_forest(X_train, y_train)
        y_pred = grid_search.predict(X_test)
        report = classification_report(y_test, y_pred, output_dict=True)
        return (round(report['0']['f1-score'], 2), round(report['1']['f1-score'], 2))
