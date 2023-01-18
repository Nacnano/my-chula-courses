package logic;

import java.util.Scanner;

public class FoodOrder {

	// Fields: description, price, chicken, vegetable, extraChicken, extraRice
	// START CODE HERE

	// END CODE HERE

	// Constructor
	// START CODE HERE
	
	// END CODE HERE

	// Methods
	// START CODE HERE

	// END CODE HERE

	@Override
	public String toString() {
		// START CODE HERE

		// END CODE HERE
	}

	@Override
	public boolean equals(Object other) {
		// START CODE HERE
	
		// END CODE HERE
	}

	public static void main(String[] args) {
		Scanner keyboard = new Scanner(System.in);
		FoodOrder foodOrder = new FoodOrder();
		System.out.println("Hi, Welcome to Kao-Mun-Gai food stall!");
		System.out.println("We only sell " + foodOrder.getDescription());
		System.out.println("Would you like your meal with chicken? (Yes/No)");
		String customerInput = keyboard.next();
		if (customerInput.equals("No")) {
			foodOrder.setHasChicken(false);
			System.out.println("Okay...");
		} else if (customerInput.equals("Yes")) {
			foodOrder.setHasChicken(true);
		}
		System.out.println("Would you like your meal with vegetable? (Yes/No)");
		customerInput = keyboard.next();
		if (customerInput.equals("No")) {
			foodOrder.setHasVegetable(false);
		} else if (customerInput.equals("Yes")) {
			foodOrder.setHasVegetable(true);
		}
		System.out.println("Extra chicken? (Yes/No)");
		customerInput = keyboard.next();
		if (customerInput.equals("Yes")) {
			foodOrder.setHasExtraChicken(true);
			System.out.println("Good Choice!");
		} else if (customerInput.equals("No")) {
			foodOrder.setHasExtraChicken(false);
		}
		System.out.println("Extra Rice? (Yes/No)");
		customerInput = keyboard.next();
		if (customerInput.equals("Yes")) {
			foodOrder.setHasExtraRice(true);
		} else if (customerInput.equals("No")) {
			foodOrder.setHasExtraRice(false);
		}

		System.out.println(foodOrder);

		// Uncomment the following lines to test equals method
		// FoodOrder testOrder = new FoodOrder();
		// testOrder.setHasChicken(false);
		// testOrder.setHasExtraChicken(false);
		// testOrder.setHasExtraRice(true);
		// FoodOrder testOrder2 = new FoodOrder();
		// testOrder2.setHasChicken(false);
		// testOrder2.setHasExtraChicken(false);
		// testOrder2.setHasExtraRice(true);
		// System.out.println("Equal:" + testOrder.equals(testOrder2));
	}

}
