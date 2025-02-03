import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import OneHotEncoder
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import f1_score

import warnings
from sklearn.exceptions import ConvergenceWarning
warnings.filterwarnings("ignore", category=ConvergenceWarning)

class BankLogistic:
    def __init__(self, data_path):
        self.data_path = data_path
        self.df = pd.read_csv(data_path, sep=',')
        self.X_train = None
        self.y_train = None
        self.X_test = None
        self.y_test = None
    
    def Q1(self):
        """ Return the total number of rows in the dataset. """
        return self.df.shape[0]
    
    def Q2(self):
        """ Return a tuple of (number of numeric variables, number of categorical variables). """
        numeric_vars = self.df.select_dtypes(include=[np.number]).shape[1]
        categorical_vars = self.df.select_dtypes(exclude=[np.number]).shape[1]
        return (numeric_vars, categorical_vars)
    
    def Q3(self):
        """ Return a tuple of class distribution (no, yes) rounded to 3 decimal places. """
        class_counts = self.df['y'].value_counts(normalize=True)
        return (round(class_counts['no'], 3), round(class_counts['yes'], 3))
    
    def Q4(self):
        """ Remove duplicate records and return the new shape of the dataset. """
        self.df.drop_duplicates(inplace=True)
        return self.df.shape
    
    def Q5(self):
        """ Process unknown values, remove nearly constant features, and split the data. """
        self.Q4()
        self.df.replace('unknown', None, inplace=True)
        
        flat_cols = [col for col in self.df.columns if self.df[col].value_counts(normalize=True).max() > 0.99]
        self.df.drop(columns=flat_cols, inplace=True)
        
        X, y = self.df.drop(columns='y'), self.df['y']
        self.X_train, self.X_test, self.y_train, self.y_test = train_test_split(
            X, y, test_size=0.3, random_state=0, stratify=y
        )
        return self.X_train.shape, self.X_test.shape
    
    def onehot_encode(self, X: pd.DataFrame, nominal_cols: list):
        """One-hot encodes the given categorical columns in X."""
        enc = OneHotEncoder(handle_unknown="ignore", sparse_output=False)
        encoded_array = enc.fit_transform(X[nominal_cols])

        new_col_names = [
            f"{col}_{val}" for col, vals in zip(nominal_cols, enc.categories_) for val in vals
        ]

        encoded_df = pd.DataFrame(encoded_array, columns=new_col_names, index=X.index)
        X = pd.concat([X.drop(columns=nominal_cols), encoded_df], axis=1)

        return X

    def impute_missing(self):
        """Imputes missing values using mean for numeric and mode for categorical variables."""
        num_impute = SimpleImputer(missing_values=np.nan, strategy="mean")
        cat_impute = SimpleImputer(missing_values="unknown", strategy="most_frequent")
        
        num_cols = self.X_train.select_dtypes(include=["number"]).columns
        cat_cols = self.X_train.select_dtypes(include=["object"]).columns
        
        self.X_train[num_cols] = pd.DataFrame(
            num_impute.fit_transform(self.X_train[num_cols])
        )
        self.X_test[num_cols] = pd.DataFrame(
            num_impute.transform(self.X_test[num_cols])
        )
        
        self.X_train[cat_cols] = pd.DataFrame(
            cat_impute.fit_transform(self.X_train[cat_cols])
        )
        self.X_test[cat_cols] = pd.DataFrame(
            cat_impute.transform(self.X_test[cat_cols])
        )

    def Q6(self):
        """Processes data by imputing missing values, encoding categorical features, and returns training set shape."""
        self.Q5()  

        self.impute_missing()

        education_order = {
            "illiterate": 1,
            "basic.4y": 2,
            "basic.6y": 3,
            "basic.9y": 4,
            "high.school": 5,
            "professional.course": 6,
            "university.degree": 7,
        }
        
        self.X_train["education"] = self.X_train["education"].map(education_order)
        self.X_test["education"] = self.X_test["education"].map(education_order)

        nominal_cols = [col for col in self.X_train.select_dtypes(include=["object"]).columns if col != "education"]
        self.X_train = self.onehot_encode(self.X_train, nominal_cols)
        self.X_test = self.onehot_encode(self.X_test, nominal_cols)

        self.y_train = self.y_train.map({"yes": 1, "no": 0})
        self.y_test = self.y_test.map({"yes": 1, "no": 0})

        return self.X_train.shape

    def Q7(self):
        """ Train a logistic regression model and return the macro F1 score. """
        
        self.Q6()
        
        model = LogisticRegression(random_state=2025, class_weight='balanced', max_iter=500)
        model.fit(self.X_train, self.y_train)
        
        y_pred = model.predict(self.X_test)
        
        return  round(f1_score(self.y_test, y_pred, average='macro'), 2)
