package entity.building;

public abstract class Resource extends BaseBuilding {

	private int maxPeople;
	private int currentPeople;
	private float fatalityRate;
	
	public Resource(int durability, int maxPeople, float fatalityRate) {
		super(durability);
		setMaxPeople(maxPeople);
		setCurrentPeople(0);
		setFatalityRate(fatalityRate);
	}
	
	public int getMaxPeople() {
		return maxPeople;
	}
	
	public void setMaxPeople(int maxPeople) {
		this.maxPeople = maxPeople;
	}
	
	public int getCurrentPeople() {
		return currentPeople;
	}
	
	public void setCurrentPeople(int currentPeople) {
		this.currentPeople = currentPeople;
	}
	
	public float getFatalityRate() {
		return fatalityRate;
	}
	
	public void setFatalityRate(float fatalityRate) {
		this.fatalityRate = fatalityRate;
	}
}
