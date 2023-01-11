import java.util.Scanner;

public class ToFarenheit_Argu {

	public static void main(String[] args) {

		//Scanner s = new Scanner(System.in);
		final double TEMP_CONVERT = 1.8;

		//System.out.println("Type in temp- in celcius:");
		
		
		String cel = args[0];
		double celD = Double.parseDouble(cel);
		
		double fa;

		fa = (celD * TEMP_CONVERT) + 32;

		System.out.println("The Farenheit equivalence is " + fa + ".");

	}

}
