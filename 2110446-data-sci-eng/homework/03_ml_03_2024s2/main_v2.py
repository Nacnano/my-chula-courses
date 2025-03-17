from student import *
from student import *
import os
os.environ["LOKY_MAX_CPU_COUNT"] = "1"

def main():
    hw = Clustering('ModifiedEdibleMushroom.csv')

    # Get the input command from the user
    input_string = input().strip()
    
    # Dynamically call the method on the hw object and print the result
    input_command = f"hw.{input_string}()"
    print(f"{eval(input_command)}")

if __name__ == "__main__":
    main()

