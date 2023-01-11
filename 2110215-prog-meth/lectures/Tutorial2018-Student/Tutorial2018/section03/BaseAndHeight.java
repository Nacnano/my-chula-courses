import java.util.Scanner;

public class BaseAndHeight {

	public static void main(String[] args) {
    Scanner s = new Scanner(System.in);
    System.out.println("Type in the diagonal");
    double a = s.nextDouble();
    
    System.out.println("Type in the angle, in degree");
    double b = s.nextDouble();
    b = Math.toRadians(b);
    
    double height, width;
    height = a*Math.sin(b);
    width = a*Math.cos(b);
    
    System.out.println("Height =" + height);
    System.out.println("Width =" + width);
		
		

	}

}
