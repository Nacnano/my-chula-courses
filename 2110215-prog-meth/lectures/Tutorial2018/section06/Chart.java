
public class Chart {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		int x, y, z, n;
		x = 0;
		y = 0;
		z = 0;
		n = 5;

		while (x <= n) {
			y = 0;

			while (y <= x) {
				y++;
			}
			x++;
			z = z + y;
		}
		System.out.println(x +", " + y +", "+ z);
	}

}
