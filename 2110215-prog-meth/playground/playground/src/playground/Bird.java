package playground;

public class Bird extends Animal implements Flyable {
	
	public Bird() {};
	
	public Bird(String name) {
		super(name);
	}
	public void speak() {
		System.out.println("Chip Chip");
	}
	
	public void fly() {
		System.out.println("Bird " + getName() + " flew");
	}
}
