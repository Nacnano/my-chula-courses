from student import *

def main():
    hw = BankLogistic('./bank-st.csv')
    
    # Get the input command from the user
    input_string = input().strip()
    
    # Dynamically call the method on the hw object and print the result
    input_command = f"hw.{input_string}()"
    print(f"{eval(input_command)}")

if __name__ == "__main__":
    main()
