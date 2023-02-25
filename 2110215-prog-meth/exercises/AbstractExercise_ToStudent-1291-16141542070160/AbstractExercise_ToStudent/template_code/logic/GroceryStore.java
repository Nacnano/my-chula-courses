package logic;

import java.util.ArrayList;
import java.util.Scanner;

public class GroceryStore {

	public static Scanner in;
	public static ShoppingCart cart;

	public static void main(String[] args) {
		String command;
		in = new Scanner(System.in);
		cart = new ShoppingCart();

		viewPromotion();
		
		while (true) {
			showMenu();
			command = in.nextLine();

			switch (command) {
			case "U":
				addUnitItemMenu();
				break;
			case "W":
				addWeightItemMenu();
				break;
			case "V":
				viewAllItemMenu();
				break;
			case "":
				checkOutMenu();
				System.exit(0);
				break;
			default:
				System.out.println("Invalid command.");
				break;
			}
			
			/*
			if (command.equals("U"))
			{
				addUnitItemMenu();
			}
			else if (command.equals("W"))
			{
				addWeightItemMenu();
			}
			else if (command.equals("V"))
			{
				viewAllItemMenu();
			}
			else if (command.equals(""))
			{
				checkOutMenu();
				System.exit(0);
			}
			else
			{
				System.out.println("Invalid command.");
			}
			*/
		}
	}

	public static void showMenu() {
		// TODO Auto-generated method stub
		System.out.println("----------------------------------------");
		System.out.println("Grocery Store Menu");
		System.out.println("----------------------------------------");
		System.out.println("U)\tAdd Unit item to shopping cart");
		System.out.println("W)\tAdd Weight item to shopping cart");
		System.out.println("V)\tView all items in shopping cart");
		System.out.println("Enter)\tCheck out your shopping cart");
		System.out.println("----------------------------------------");
		System.out.print("Enter input command : ");
	}

	public static void addWeightItemMenu() {
		// TODO Auto-generated method stub
		String name;
		double unitPrice;

		System.out.println("----------------------------------------");
		System.out.println("Add Weight item to shopping cart");
		System.out.println("----------------------------------------");

		//fill code
	}

	public static void addUnitItemMenu() {
		// TODO Auto-generated method stub
		String name;
		int amount;
		double unitPrice;

		System.out.println("----------------------------------------");
		System.out.println("Add Unit item to shopping cart");
		System.out.println("----------------------------------------");
		
		//fill code
	}

	public static void viewAllItemMenu() {
		// TODO Auto-generated method stub
		System.out.println("----------------------------------------");
		System.out.println("View all items in shopping cart");
		System.out.println("----------------------------------------");

		//fill code
	}
	
	public static void checkOutMenu(){
		System.out.println("----------------------------------------");
		System.out.println("Check out your shopping cart");
		System.out.println("----------------------------------------");
		
		//fill code
	}
	
	public static void viewPromotion(){
		System.out.println("**************************************************");
		System.out.println("Today Promotion");
		System.out.println("Buy at least " + cart.getRequiredUnitItems() +  " UnitItem(s) & " + cart.getRequiredWeightItems() + " WeightItem(s),Get " + cart.getDiscount() + "% off");
		System.out.println("**************************************************");
	}
	
}
