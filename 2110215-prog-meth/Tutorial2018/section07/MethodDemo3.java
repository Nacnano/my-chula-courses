public class MethodDemo3 
{
	public static void main(String[] args) 
	{
		String s1 = "abcdefghi";
		String s2 = "Computer";
		System.out.println(longer(s1,s2));

		System.out.println("5!="+factorial(5));

		System.out.println(hasSimilarChar(s1,s2));
		System.out.println(hasSimilarChar("xyz","XYZ"));

		printGreetings("Atiwong Suchato");

		System.out.println(isOdd(5));

		System.out.println(unicodeOf('@'));

		System.out.println(h(125.5,100.0,86.7,13.8));

	}

	public static String longer(String s1, String s2){
		return ((s1.length() > s2.length())?s1:s2);
	}
	public static int factorial(int n){
		int nFact = 1;
		for(int i=1;i<=n;i++){
			nFact *= i;
		}
		return nFact;
	}
	public static boolean hasSimilarChar(String s1, String s2){
		boolean similarChar = false;
		for(int i=0; i<s1.length() && !similarChar; i++){
			for(int j=0; j<s2.length(); j++){
				if(s1.charAt(i) == s2.charAt(j)){
					similarChar = true;
					break;
				}
			}
		}
		return similarChar;
	}
	public static void printGreetings(String name){
		System.out.println("Hello "+name);
		System.out.println("Welcome to ISE mail system.");
		System.out.println("---------------------------");
	}
	public static boolean isOdd(int n){
		return (n%2 != 0)? true : false;
	}
	public static int unicodeOf(char c){
		return (int)c;
	}
	public static double h(double a, double b, double c, double d){
		double num = g(a);
		double den = g(a)+g(b)+g(c)+g(d);
		return num/den;
	}
	public static double g(double d){
		return Math.exp(-d/2);
	}
}
