import java.io.*;
public class CountDigitFrequency2 
{
	public static void main(String[] args) throws IOException
	{	BufferedReader stdin
			= new BufferedReader(new InputStreamReader(System.in));
		System.out.print("Enter string:");
		String s = stdin.readLine();
		int [] freq = new int[10];
		for(int i=0;i<s.length();i++){
			char c = s.charAt(i);
			if(c >= '0' && c <= '9'){
				freq[c-'0']++;
			}
		}
		for(int i=0;i<freq.length;i++){
			System.out.println("Number of "+i+" = "+freq[i]);
		}
	}
}
