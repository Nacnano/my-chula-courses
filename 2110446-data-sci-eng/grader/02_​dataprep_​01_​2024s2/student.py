import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.impute import SimpleImputer

"""
    ASSIGNMENT 2 (STUDENT VERSION):
    Using pandas to explore Titanic data from Kaggle (titanic_to_student.csv) and answer the questions.
    (Note that the following functions already take the Titanic dataset as a DataFrame, so you don’t need to use read_csv.)
"""

def Q1(df):
    """
        Problem 1:
            How many rows are there in the "titanic_to_student.csv"?
    """
    return df.shape[0]

def Q2(df):
    '''
        Problem 2:
            Drop unqualified variables
            Drop variables with missing > 50%
            Drop categorical variables with flat values > 70% (variables with the same value in the same column)
            How many columns do we have left?
    '''
    # Drop columns with more than 50% missing values
    df = df.loc[:, df.isnull().sum() <= df.shape[0] * 0.5]

    # Drop categorical columns with > 70% of the same value
    for col in df.select_dtypes(include='object').columns:
        if df[col].value_counts(normalize=True).max() > 0.7:
            df = df.drop(columns=[col])

    return df.shape[1]

def Q3(df):
    '''
       Problem 3:
            Remove all rows with missing targets (the variable "Survived")
            How many rows do we have left?
    '''
    df = df.dropna(subset=['Survived'])
    return df.shape[0]

def Q4(df):
    '''
       Problem 4:
            Handle outliers
            For the variable “Fare”, replace outlier values with the boundary values
            If value < (Q1 - 1.5IQR), replace with (Q1 - 1.5IQR)
            If value > (Q3 + 1.5IQR), replace with (Q3 + 1.5IQR)
            What is the mean of “Fare” after replacing the outliers (round 2 decimal points)?
            Hint: Use function round(_, 2)
    '''
    Q1 = df['Fare'].quantile(0.25)
    Q3 = df['Fare'].quantile(0.75)
    IQR = Q3 - Q1

    lower_bound = Q1 - 1.5 * IQR
    upper_bound = Q3 + 1.5 * IQR

    df['Fare'] = df['Fare'].clip(lower=lower_bound, upper=upper_bound)
    return round(df['Fare'].mean(), 2)

def Q5(df):
    '''
       Problem 5:
            Impute missing value
            For number type column, impute missing values with mean
            What is the average (mean) of “Age” after imputing the missing values (round 2 decimal points)?
            Hint: Use function round(_, 2)
    '''
    df['Age'] = df['Age'].fillna(df['Age'].mean())
    return round(df['Age'].mean(), 2)

def Q6(df):
    '''
        Problem 6:
            Convert categorical to numeric values
            For the variable “Embarked”, perform the dummy coding.
            What is the average (mean) of “Embarked_Q” after performing dummy coding (round 2 decimal points)?
            Hint: Use function round(_, 2)
    '''
    df = pd.get_dummies(df, columns=['Embarked'], drop_first=False)
    return round(df['Embarked_Q'].mean(), 2)

def Q7(df):
    '''
        Problem 7:
            Split train/test split with stratification using 70%:30% and random seed with 123
            Show a proportion between survived (1) and died (0) in all data sets (total data, train, test)
            What is the proportion of survivors (survived = 1) in the training data (round 2 decimal points)?
            Hint: Use function round(_, 2), and train_test_split() from sklearn.model_selection, 
            Don't forget to impute missing values with mean.
    '''
    # Impute missing values for numerical columns
    imputer = SimpleImputer(missing_values=np.nan, strategy='mean')
    
    df["Survived"] = pd.DataFrame(imputer.fit_transform(df[["Survived"]]))
    df["Survived"] = df["Survived"].apply(lambda x: 1.0 if x > 0.5 else 0.0)
    
    

    train, test = train_test_split(df, test_size=0.3, random_state=123, stratify=df['Survived'])

    train_survived_proportion = train['Survived'].mean()
    return round(train_survived_proportion, 2)
