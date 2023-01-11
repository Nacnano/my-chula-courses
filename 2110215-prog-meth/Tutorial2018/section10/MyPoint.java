public class MyPoint 
{
	// data members
	private double x;
	private double y;

	// constructors
	public MyPoint(){
		this(1.0,1.0);
	}
	public MyPoint(double x,double y){
		this.x = x;
		this.y = y;
	}
	public MyPoint(MyPoint p){
		this(p.getX(),p.getY());
	}

	// accessor methods
	public double getX(){
		return x;
	}
	public double getY(){
		return y;
	}

	// mutator methods
	public void setX(double x){
		this.x = x;
	}
	public void setY(double y){
		this.y = y;
	}

	// other methods
	public void setLocation(double x, double y){
		this.x = x;
		this.y = y;
	}
	public double distanceTo(MyPoint p){
		double diffXSquare = Math.pow((p.getX()-x),2);
		double diffYSquare = Math.pow((p.getY()-y),2);
		return Math.sqrt(diffXSquare+diffYSquare);
	}
	public String toString(){
		return "("+x+","+y+")";
	}
}
