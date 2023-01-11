import java.util.Scanner;
public class BreakDemo1 
{
	public static void main(String[] args)  
	{	String s;
		Scanner stdin = new Scanner(System.in);
		while(true){
			System.out.print("Say the magic word\n>>");
			s = stdin.nextLine();
			if(s.equals("Java")) break;
		}
		System.out.println(":)");
	}
}
