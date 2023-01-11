import java.io.File;

public class DesaturateIt_Template{
	public static void main(String [] args){
		int [][][] rgb = Java101ImageUtil.getRGBArrayFromFile();
		if(rgb==null){return;}
		int[][][] gray = grayscale(rgb);
		int[][][] sepia = sepia(rgb);
		// fill code to show all three images
		// - original, grayscale, sepia


		// Java101ImageUtil.showViewer(rgbs, "show all");
	}

	public static int [][][] grayscale(int [][][] rgb) {
		// fill code
		return null;
	}

	public static int [][][] sepia(int [][][] rgb) {
		// fill code
		return null;
	}
}