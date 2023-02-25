package playground;

public abstract class Animal implements Cloneable{
	private String name;
	
	public Animal () {
		setName("Unnamed");
	}
	public abstract void speak();
	
	protected Object clone() {
		try {
			Animal s = (Animal)super.clone();
			return s;
		}
		catch(CloneNotSupportedException e) {
			throw new InternalError();
		}
	}
	
	public void setName (String name) {
		this.name = name;
	}
	
	public String getName () {
		return this.name;
	}
}
