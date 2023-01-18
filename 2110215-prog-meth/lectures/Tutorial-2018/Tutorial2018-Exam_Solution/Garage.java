
public class Garage {
	Car[] cars;

	public void removeDup() {
		Car[] cars2 = new Car[cars.length];
		int indexCars2 = 0;

		for (int i = 0; i < cars.length; i++) {
			if (!isIn(cars[i], cars2)) {
				cars2[indexCars2++] = cars[i];
			}
		}

		int indexNull;
		for (indexNull = 0; indexNull < cars2.length; indexNull++) {
			if (cars2[indexNull] == null)
				break;
		}

		Car[] cars3 = new Car[indexNull];
		for (int i = 0; i < cars3.length; i++) {
			cars3[i] = cars2[i];
		}

		cars = cars3;

	}

	public static boolean isIn(Car c, Car[] a) {
		for (int i = 0; i < a.length; i++) {
			if (c.equals(a[i])) {
				return true;
			}
		}
		return false;
	}

}
