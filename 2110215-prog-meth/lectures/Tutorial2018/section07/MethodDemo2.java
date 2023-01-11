public class MethodDemo2
{
	public static void main(String[] args) 
	{
		double x1,x2,x3,x4;
		x1 = 1.5;
		System.out.println(f(x1,3));
		x2 = 2.5;
		System.out.println(f(x2,3));
		x3 = 3.5;
		System.out.println(f(x3,3));
		x4 = 4.5;
		System.out.println(f(x4,3));
	}

	public static double f(double x,int n){
		double y = 0;
		for(int i=1;i<=n;i++){
			y += i*Math.pow(x,i);
		}
		return y;
	}
}
