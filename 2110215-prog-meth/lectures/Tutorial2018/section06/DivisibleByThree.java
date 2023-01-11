
public class DivisibleByThree {

	public static void main(String[] args) {
		// while
		/*
		 * int i=0; while(i<=1000) { if(i%3 ==0) { System.out.println(i); } i++; }
		 */

		// dowhile
		/*
		 * int i=0; do { if(i%3 ==0) { System.out.println(i); } i++; }while(i<=1000);
		 */

		
		//for 
		for (int i = 0; i <= 1000; i++) {
			if (i % 3 == 0) {
				System.out.println(i);
			}
		}

	}

}
