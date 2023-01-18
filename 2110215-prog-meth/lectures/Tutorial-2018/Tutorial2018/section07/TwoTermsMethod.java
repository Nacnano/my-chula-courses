import java.util.Scanner;

import com.sun.prism.image.CompoundTexture;

public class TwoTermsMethod {

	public static void main(String[] args) {
		System.out.print("Enter 5 inputs (a, x, b, r, n): ");
		Scanner sc = new Scanner(System.in);
		int a = sc.nextInt();
		int x = sc.nextInt();
		int b = sc.nextInt();
		int r = sc.nextInt();
		int n = sc.nextInt();
		int y = calculateY(a, x, b, r, n);
		printInputsAndOutput(a, x, b, r, n, y);
	}

	public static int axPlusB(int a, int x, int b){
		return a*x + b;
	}
	
	public static int sumSquaredI(int n){
		int result=0;
		for(int i=0; i<n; ++i) result+=i*i;
		return result;
	}
	
	public static int calculateY(int a, int x, int b, int r, int n){
		return axPlusB(a, x, b)*r*r + sumSquaredI(n)*r; 
	}
	
	public static void printInputsAndOutput(int a, int x, int b, int r, int n, int y){
		System.out.println("Inputs (a,x,b,r,n) = "+a+","+x+","+b+","+r+","+n);
		System.out.println("Output (y) = "+y);
	}
}
