import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

class TestCountEven {

	@Test
	void testCountEven() {
		int[] a = { 1, 2, 5, 3, 6, 90, 21, 46 };
		int[] b = { 1, 3, 5, 7, 9 };
		int[] c = { 2, 4, 6, 8, 10, 12, 13 };

		assertEquals(4, CountEven.countEven(a));
		assertEquals(0, CountEven.countEven(b));
		assertEquals(6, CountEven.countEven(c));

	}

}
