import pandas as pd
import sys

def main():
    # Read inputs
    input_file = input().strip()
    question = input().strip()
    
    try:
        # Read the CSV file
        data = pd.read_csv(input_file)
        
        if question == "Q1":
            # Output the shape of the data
            print(data.shape)
        elif question == "Q2":
            # Output the max score
            print(data['score'].max())
        elif question == "Q3":
            # Output the count of students with scores >= 80
            print((data['score'] >= 80).sum())
        else:
            # If the question is not Q1, Q2, or Q3, print "No Output"
            print("No Output")
    except Exception as e:
        # Handle exceptions (e.g., file not found, malformed input)
        print("Error:", e)

if __name__ == "__main__":
    main()
