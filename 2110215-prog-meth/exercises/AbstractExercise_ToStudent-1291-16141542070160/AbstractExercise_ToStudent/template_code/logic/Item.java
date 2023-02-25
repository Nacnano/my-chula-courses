package logic;

public abstract class Item {
	protected String name;
	protected double unitPrice;
	
	public abstract double cost();
	
	
	//	getters & setters
	public void setName (String name) {
		this.name = name;
	}
	
	public void setUnitPrice(double unitPrice ) {
		this.unitPrice = unitPrice;
	}
	
	public String getName() {
		return this.name;
	}
	
	public double getUnitPrice() {
		return this.unitPrice;
	}
}
