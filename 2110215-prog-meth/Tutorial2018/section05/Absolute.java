import java.util.Scanner;

public class Absolute {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Scanner s = new Scanner(System.in);
		System.out.println("Type your number:");
		double number=0;
		try {
			number = s.nextDouble();
		} catch (NumberFormatException e) {
            System.out.println("Not a number. Program terminated.");
            System.exit(0);
		}
		
		if(number <0) {
			number = number*-1;
		}
		
		System.out.println(number);
		
		
		
		//Conditional assignment
		double result = (number<0) ? (-1*number) : number;
		System.out.println(result);
		
		
		

	}

}
