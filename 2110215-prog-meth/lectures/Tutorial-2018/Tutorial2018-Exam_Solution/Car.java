
public class Car {
	int serial;
	String brand;

	public Car(int serial, String brand) {
		super();
		this.serial = serial;
		this.brand = brand;
	}

	public int getSerial() {
		return serial;
	}

	public void setSerial(int serial) {
		this.serial = serial;
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public boolean equals(Object o) {
		if (o instanceof Car) {
			Car c2 = (Car) o;
			return getSerial() == c2.getSerial() && getBrand().equals(c2.getBrand());

		} else {
			return false;
		}
	}

}
