
public class EqualityTest {

	public static void main(String[] args) {
		int i,j,k;
		
		i=3;
		j=31;
		k=1;
		
		if(i==j) {
			System.out.println("i is equal to j.");
		} else {
			System.out.println("i is NOT equal to j.");
		}
		
		if(i<j) {
			System.out.println("i is less than j.");
		}else if (i==j) {
			System.out.println("i is equal to j.");
		}else {
			System.out.println("i is more than j.");
		}
		System.out.println("i is " + i +", and j is " + j + ".");
		 

	}

}
