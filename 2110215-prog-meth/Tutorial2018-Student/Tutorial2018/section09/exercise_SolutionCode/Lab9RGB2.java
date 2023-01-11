import java.util.Scanner;

public class Lab9RGB2 {

	public static void main(String[] args) {
		int w, h;
		Scanner sc = new Scanner(System.in);
		System.out.print("Input width: ");
		w = sc.nextInt();
		System.out.print("Input height: ");
		h = sc.nextInt();
		
		int[] color1 = {250, 250, 15};
		int[] color2 = {0, 0, 0};
		
		int[][][] image = new int[w][h][3];
		for (int row = 0; row < h; row++) { 
			int bound = (int) ((row+1)*(((double) w)/h));
			for (int col = 0; col < w; col++) { 
				if(col <= bound) image[col][row] = color1;
				else image[col][row] = color2;
			}
		}

		Java101ImageUtil.showViewer(image, "Lab9RGB");
	}

}
