import java.util.Scanner;

public class PhoneBill {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		System.out.println("Please enter the usage time:");
		Scanner s = new Scanner(System.in);
		int time = s.nextInt();
		double bill = 0;

		int interval1001_OrMore = 0;
		int interval501_1000 = 0;
		int interval201_500 = 0;
		int interval200_OrLess = 0;

		if (time >= 1001) {
			interval1001_OrMore = time - 1000;
			time = 1000;
		}

		if (time >= 501) {
			interval501_1000 = time - 500;
			time = 500;
		}

		if (time >= 201) {
			interval201_500 = time - 200;
			time = 200;
		}

		bill = 200 + interval201_500 * 0.5 + interval501_1000 * 1 + interval1001_OrMore * 2;

		System.out.println("The bill is " + bill + "Baht.");

	}

}
