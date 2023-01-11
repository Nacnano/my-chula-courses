public class Count{
	// add method count here.
	public static int count(char[] a,char c){
		int count =0;
		



		return count;
	}

	public static void main(String[] args){
		char[] c1 = {'a','b','d','f','g','g','f','a','d','f','g','f'};
	
		int countA = count(c1,'a');
		int countD = count(c1,'d');
		int countG = count(c1,'g');
		int countF = count(c1,'f');
		
		System.out.println("The number of 'a' is " + countA + "(expected number is 2).");
		System.out.println("The number of 'd' is " + countD + "(expected number is 2).");
		System.out.println("The number of 'g' is " + countG + "(expected number is 3).");
		System.out.println("The number of 'f' is " + countF + "(expected number is 4).");
	
	}
}