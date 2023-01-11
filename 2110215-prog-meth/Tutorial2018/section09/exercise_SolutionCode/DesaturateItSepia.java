import java.io.File;

public class DesaturateItSepia {
	public static void main(String [] args){
		int [][][] rgb = Java101ImageUtil.getRGBArrayFromFile();
		if(rgb==null){return;}
		// fill code to let the user select
		// choice 1: display original + desaturage
		// choice 2: display original + sepia
		// choice 3: display original + desaturage + sepia
		// then using Java101ImageUtil.showViewer() to 
		// show the images
		int[][][] gray = desaturate(rgb);
		int[][][] sepia = sepia(rgb);
		int[][][][] rgbs = new int[3][][][];
		rgbs[0] = rgb;
		rgbs[1] = gray;
		rgbs[2] = sepia;
		Java101ImageUtil.showViewer(rgbs, "show all");
		// int [][][] gray = desaturate(rgb);
		// Java101ImageUtil.showViewer(rgb,gray,"Desaturate It!");
	}

	public static int [][][] desaturate(int [][][] rgb) {
		// fill code
		int[][][] result = new int[rgb.length][rgb[0].length][3];
		for (int x = 0; x < rgb.length; x++) {
			for (int y = 0; y < rgb[0].length; y++) {
				int r = rgb[x][y][0];
				int g = rgb[x][y][1];
				int b = rgb[x][y][2];
				result[x][y][0] = (r+g+b)/3;
				result[x][y][1] = (r+g+b)/3;
				result[x][y][2] = (r+g+b)/3;
			}
		}
		return result;
	}

	public static int [][][] sepia(int [][][] rgb) {
		int[][][] result = new int[rgb.length][rgb[0].length][3];
		for (int x = 0; x < rgb.length; x++) {
			for (int y = 0; y < rgb[0].length; y++) {
				int r = rgb[x][y][0];
				int g = rgb[x][y][1];
				int b = rgb[x][y][2];
				int tr = (int)(0.393*r + 0.769*g + 0.189*b);
				int tg = (int)(0.349*r + 0.686*g + 0.168*b);
				int tb = (int)(0.272*r + 0.534*g + 0.131*b);
				result[x][y][0] = tr > 255 ? 255 : tr;
				result[x][y][1] = tg > 255 ? 255 : tg;
				result[x][y][2] = tg > 255 ? 255 : tg;
			}
		}
		return result;
	}
}