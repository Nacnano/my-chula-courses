import java.util.Scanner;

public class OverloadingSum {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		System.out.print("Enter the number of inputs (max 3): ");
		Scanner sc = new Scanner(System.in);
		int n = sc.nextInt();
		int a=0, b=0, c=0;
		if(n > 0){
			System.out.print("Enter input1: ");
			a = sc.nextInt();
		}
		if(n > 1){
			System.out.print("Enter input2: ");
			b = sc.nextInt();
		}
		if(n > 2){
			System.out.print("Enter input3: ");
			c = sc.nextInt();
		}
		
		int result = 0;
		if(n == 1) result=sum(a);
		else if(n == 2) result=sum(a, b);
		else if(n == 3) result=sum(a, b, c);
		
		System.out.println("Sum is "+result);
	}
	
	public static int sum(int a){
		int result=0;
		for(int i=1; i<=a; ++i)
			result += i;
		return result;
	}

	public static int sum(int a, int b){
		int result=0;
		for(int i=a; i<=b; ++i)
			result += i;
		return result;
	}
	
	public static int sum(int a, int b, int c){
		int result=0;
		for(int i=a; i<=b; i+=c)
			result += i;
		return result;
	}
}
