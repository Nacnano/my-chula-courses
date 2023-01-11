
public class Overflow1 {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		int veryBigInteger = 2147483647;
		System.out.println("veryBigInteger     = " + veryBigInteger);
		System.out.println("veryBigInteger+1   = " + (veryBigInteger + 1));
		int verySmallInteger = -2147483648;
		System.out.println("verySmallInteger    = " + verySmallInteger);
		System.out.println("verySmallInteger-1  = " + (verySmallInteger - 1));
		System.out.println("veryBigInteger*2  = " + (veryBigInteger * 2));
	}

}
