import java.util.Scanner;

public class Bigger {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Scanner s = new Scanner(System.in);
		double firstNumber=0;
		double secondNumber =0;
		
		System.out.println("Type your first number:");
		try {
			firstNumber = s.nextDouble();
		} catch (NumberFormatException e) {
            System.out.println("Not a number. Program terminated.");
            System.exit(0);
		}
		
		System.out.println("Type your second number:");
		try {
			secondNumber = s.nextDouble();
		} catch (NumberFormatException e) {
            System.out.println("Not a number. Program terminated.");
            System.exit(0);
		}
		
		if(firstNumber>secondNumber) {
			System.out.println("The first number is larger.");
		}else if(firstNumber<secondNumber){
			System.out.println("The second number is larger.");
		}else {
			System.out.println("The two numbers are equal.");
		}
		
		
	}

}
