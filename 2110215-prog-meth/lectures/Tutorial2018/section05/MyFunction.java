import java.util.Scanner;

public class MyFunction {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		
		Scanner s = new Scanner(System.in);
		System.out.println("Type your number:");
		double x = s.nextDouble();
		
		String answer = "Your result is ";
		if(-10 <= x && x <= -5){
			System.out.println(answer+ -1*Math.pow(x,2)); 
		} else if(-5 < x && x <= 0){
			System.out.println(answer+ 0);
		} else if (0 < x && x <= 5) {
			System.out.println(answer+ Math.pow(x,2)); 
		} else if (5 < x && x <= 10){
			System.out.println(answer+ 0);
		} else{
			System.out.println(answer+ Math.pow(x,3));
		}
	}

}
