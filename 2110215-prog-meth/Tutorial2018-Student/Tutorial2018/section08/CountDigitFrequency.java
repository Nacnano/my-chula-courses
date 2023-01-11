import java.io.*;
public class CountDigitFrequency 
{
	public static void main(String[] args) throws IOException
	{	BufferedReader stdin
			= new BufferedReader(new InputStreamReader(System.in));
		System.out.print("Enter string:");
		String s = stdin.readLine();
		int freq0 = 0;
		int freq1 = 0;
		int freq2 = 0;
		int freq3 = 0;
		int freq4 = 0;
		int freq5 = 0;
		int freq6 = 0;
		int freq7 = 0;
		int freq8 = 0;
		int freq9 = 0;
		for(int i=0;i<s.length();i++){
			char c = s.charAt(i);
			if(c >= '0' && c <= '9'){
				switch(c){
					case '0': freq0++; break;
					case '1': freq1++; break;
					case '2': freq2++; break;
					case '3': freq3++; break;
					case '4': freq4++; break;
					case '5': freq5++; break;
					case '6': freq6++; break;
					case '7': freq7++; break;
					case '8': freq8++; break;
					case '9': freq9++; break;
					default:
				}
			}
		}
		System.out.println("Number of 0 = "+freq0);
		System.out.println("Number of 1 = "+freq1);
		System.out.println("Number of 2 = "+freq2);
		System.out.println("Number of 3 = "+freq3);
		System.out.println("Number of 4 = "+freq4);
		System.out.println("Number of 5 = "+freq5);
		System.out.println("Number of 6 = "+freq6);
		System.out.println("Number of 7 = "+freq7);
		System.out.println("Number of 8 = "+freq8);
		System.out.println("Number of 9 = "+freq9);
	}
}
