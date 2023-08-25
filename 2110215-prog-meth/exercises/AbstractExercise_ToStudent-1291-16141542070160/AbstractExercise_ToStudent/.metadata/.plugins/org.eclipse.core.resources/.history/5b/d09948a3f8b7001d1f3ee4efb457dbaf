package logic;

import java.util.ArrayList;
import java.util.Random;

public class ShoppingCart {
	private int requiredUnitItems;
	private int requiredWeightItems;
	private int discount; // in percentage 1 - 100;
	
	private ArrayList<Item> items;
	
	public ShoppingCart() {
		// TODO Auto-generated constructor stub
		Random random = new Random();
		requiredUnitItems = 1 + random.nextInt(3);
		requiredWeightItems = 1 + random.nextInt(3);
		discount = 20;
		items = new ArrayList<Item>();
	}
	
	public void addItem(Item item)
	{
		if (item instanceof UnitItem)
		{
			if (item.getUnitPrice() <= 0){
				System.out.println("Unable to add. Price should be more than $0");
				return;
			}
			if (((UnitItem) item).getAmount() <= 0){
				System.out.println("Unable to add. Amount should be more than 0");
				return;
			}
		}
		else if (item instanceof WeightItem)
		{
			if (item.getUnitPrice() <= 0){
				System.out.println("Unable to add. Price should be more than $0");
				return;
			}
		}
		items.add(item);
		System.out.printf("Cost is $%.2f\n",item.cost());
	}
	
	public double checkOut(){
		double totalCost = 0;
		
		for(Item item: items) {
			totalCost += item.cost();
		}
		
		return totalCost;
	}
	
	public boolean isDiscounted(){
		int weightCount = 0;
		int unitCount = 0;
		
		for(Item item: items) {
			if(item instanceof UnitItem) {
				unitCount += 1;
			}
			else if(item instanceof WeightItem) {
				weightCount += 1;
			}
		}
		
		if (unitCount > this.requiredUnitItems && weightCount >)
		
		return false;
	}

	//Create Getter&Setter method for all private fields
}
