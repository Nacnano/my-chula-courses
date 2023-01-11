import java.io.*;
import java.util.Scanner;
public class SwitchDemo
{
	public static void main(String[] args) throws IOException
	{
		int n;
		String stringToPrint;
		Scanner s = new Scanner(System.in);
		System.out.print("Enter an integer from 1 to 4:");
		n = Integer.parseInt(s.next());
		switch(n){
			case 1:
				stringToPrint = "*";
				break;
			case 2:
				stringToPrint = "* *";
				break;
			case 3:
				stringToPrint = "* * *";
				break;
			case 4:
				stringToPrint = "* * * *";
				break;
			default:
				stringToPrint = "Integer out of range.";
		}
		System.out.println(stringToPrint);
	}
}
