import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

class TestCar {

	@Test
	void testEqualsObject() {
		Car c1 = new Car(1111, "Honda");
		Car c2 = new Car(1111, "Honda");
		Car c3 = new Car(1112, "Honda");
		Car c4 = new Car(1111, "Toyota");
		Car c5 = new Car(1114, "Toyota");
		Car c6 = new Car(1114, "Toyota");

		assertEquals(true, c1.equals(c2));

		assertEquals(false, c1.equals(c3));
		assertEquals(false, c1.equals(c4));
		assertEquals(false, c1.equals(c5));
		assertEquals(true, c5.equals(c6));

	}

}
