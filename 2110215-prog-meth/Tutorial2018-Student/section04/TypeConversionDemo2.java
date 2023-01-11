
public class TypeConversionDemo2 {

	public static void main(String[] args) {
		int i, j, k;
		double d1 = 0.5, d2 = 0.5, d3, d4;

		i = d1 + 8.735f;
		j = d1 + d2;    // cast the result 
		k= d1 + d2; // cast each one
		System.out.println("i = " + i);
		System.out.println("j = " + j);
		System.out.println("k = " + k);
		

		d3 = i - j;
		d4 = i - j;
		System.out.println("d3= " + d3);
		System.out.println("d4= " + d4);
		
//		short s1;
//		s1 = (short)2000;
//		System.out.println(s1);
//
//		short s2;
//		s2 = (short)327674;
//		System.out.println(s2);

	}

}
