import java.io.*;
public class SwitchDemo2 
{
	public static void main(String[] args) throws IOException 
	{
		int n;
		BufferedReader stdin =
			new BufferedReader(new InputStreamReader(System.in));
		System.out.print("Enter an integer from 1 to 4:");
		n = Integer.parseInt(stdin.readLine());
		switch(n){			
			case 1:
				System.out.println("*");
			case 2:
				System.out.println("* *");
			case 3:
				System.out.println("* * *");
			case 4:
				System.out.println("* * * *");
			default:
				System.out.println("Integer out of range.");

		}
		
	}
}
