import pandas as pd
from student import *

def main():
    input_string = input('Question Input (ex."Q1") : ').strip() 
    df = pd.read_csv('./titanic_to_student.csv', index_col=0)
    if input_string == "Q7":
        df.fillna(df.select_dtypes(
            include='number').mean(), inplace=True)
    input_command = f"{input_string}(df)"
    print(f"Your Answer: {eval(input_command)}")


if __name__ == "__main__":
    main()
