package playground;

public class Main {
	public static void main(String args[]) {
		Cat A = new Cat();
		Dog B = new Dog();
		A.speak();
		B.speak();
		
		Cat A2 = (Cat) A.clone();
		System.out.println(A2.getName());
		
		A2.setName("Nac");
		System.out.println(A.getName() + " " + A2.getName());
		
		if (A instanceof Cat cat) {
			cat.speak();
		}
	}
}
 