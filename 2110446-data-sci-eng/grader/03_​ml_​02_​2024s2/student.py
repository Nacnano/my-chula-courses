import pandas as pd
from sklearn.preprocessing import OneHotEncoder
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import f1_score
from sklearn.model_selection import train_test_split
import warnings  # DO NOT modify this line
from sklearn.exceptions import ConvergenceWarning  # DO NOT modify this line
warnings.filterwarnings("ignore", category=ConvergenceWarning)  # DO NOT modify this line


class BankLogistic:
    def __init__(self, data_path):  # DO NOT modify this line
        self.df = pd.read_csv(data_path, sep=',')
        self.X_train = self.y_train = self.X_test = self.y_test = None

    def Q1(self):  # DO NOT modify this line
        """Return the number of rows in the dataset."""
        return len(self.df)

    def Q2(self):  # DO NOT modify this line
        """Return the count of numeric and categorical variables as a tuple."""
        return (
            self.df.select_dtypes(include=['int64', 'float64']).shape[1],
            self.df.select_dtypes(include=['object']).shape[1],
        )

    def Q3(self):  # DO NOT modify this line
        """Return class distribution of 'y' column rounded to 3 decimals."""
        return tuple(round(self.df['y'].value_counts(normalize=True), 3))

    def Q4(self):  # DO NOT modify this line
        """Remove duplicate rows and return new dataset shape."""
        self.df.drop_duplicates(inplace=True)
        return self.df.shape

    def Q5(self):  # DO NOT modify this line
        """Preprocess dataset by handling missing values, removing flat features, and splitting data."""
        self.Q4()
        self.df.replace('unknown', None, inplace=True)

        # Remove columns with >99% identical values
        self.df.drop(columns=[col for col in self.df if self.df[col].value_counts(normalize=True).max() > 0.99], inplace=True)

        X, y = self.df.drop(columns='y'), self.df['y']
        self.X_train, self.X_test, self.y_train, self.y_test = train_test_split(
            X, y, test_size=0.3, random_state=0, stratify=y
        )
        return self.X_train.shape, self.X_test.shape

    def Q6(self):  # DO NOT modify this line
        """Handle missing values and encode categorical variables."""
        self.Q5()

        num_cols = self.X_train.select_dtypes(include=['number']).columns
        cat_cols = self.X_train.select_dtypes(include=['object']).columns

        # Fill missing values
        self.X_train[num_cols] = self.X_train[num_cols].fillna(self.X_train[num_cols].mean())
        self.X_test[num_cols] = self.X_test[num_cols].fillna(self.X_train[num_cols].mean())
        self.X_train[cat_cols] = self.X_train[cat_cols].fillna(self.X_train[cat_cols].mode().iloc[0])
        self.X_test[cat_cols] = self.X_test[cat_cols].fillna(self.X_train[cat_cols].mode().iloc[0])

        # Encode 'education' ordinally
        education_order = {
            'illiterate': 1, 'basic.4y': 2, 'basic.6y': 3, 'basic.9y': 4,
            'high.school': 5, 'professional.course': 6, 'university.degree': 7
        }
        if 'education' in self.X_train:
            self.X_train['education'] = self.X_train['education'].map(education_order)
            self.X_test['education'] = self.X_test['education'].map(education_order)

        # One-hot encode remaining categorical features
        self.X_train = pd.get_dummies(self.X_train)
        self.X_test = pd.get_dummies(self.X_test)
        return self.X_train.shape

    def Q7(self):  # DO NOT modify this line
        """Train logistic regression model and return macro F1 score rounded to 2 decimals."""
        self.Q6()
        model = LogisticRegression(random_state=2025, class_weight='balanced', max_iter=500)
        model.fit(self.X_train, self.y_train)
        return round(f1_score(self.y_test, model.predict(self.X_test), average='macro'), 2)