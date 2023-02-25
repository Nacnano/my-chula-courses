package playground;

public class TestAbstract {
	public static void main(String args[]) {
		
		// You can define abstract perimeter method like this
		Shape x = new Shape() {
			double perimeter(){
				return 0;
			}
		};
		System.out.println(x.perimeter());
		
		Shape square = new Square(1);
		System.out.println(square.perimeter());
		
	}
}


abstract class Shape {
	abstract double perimeter();
}

class Square extends Shape {
	private double side;
	
	public Square(double side) {
		setSide(side);
	}
	
	public double perimeter() {
		return 4*side;
	};
	
	public void setSide(double side) {
		this.side = side;
	}
	
	public double getSide() {
		return this.side;
	}
}
