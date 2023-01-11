public class OverloadingDemo2
{
	public static void main(String[] args) 
	{
		// step1: run the code below		
		h(1,1);
		h(1.0,1.0);
		h(1,1.0);
		h(1.0,1);
		
		// step2: comment the method h(int, int)
	}

	public static void h(int x,int y)
	{
		System.out.println("h(int x, int y) is called.");
	}
	
	public static void h(double x,double y)
	{
		System.out.println("h(double x, double y) is called.");
	}

}
