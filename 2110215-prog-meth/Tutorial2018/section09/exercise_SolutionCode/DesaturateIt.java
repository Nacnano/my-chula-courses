public class DesaturateIt {
	public static void main(String[] args) {
		int[][][] rgb = Java101ImageUtil.getRGBArrayFromFile();
		if (rgb == null) {
			return;
		}
		int[][][] gray = desaturate(rgb);
		Java101ImageUtil.showViewer(rgb, gray, "Desaturate It!");
	}

	public static int[][][] desaturate(int[][][] rgb) {
		int[][][] gray = new int[rgb.length][rgb[0].length][3];
		int color;
		for (int i = 0; i < rgb.length; i++) {
			for (int j = 0; j < rgb[0].length; j++) {
				color = (rgb[i][j][0] + rgb[i][j][1] + rgb[i][j][2]) / 3;
				gray[i][j][0] = color;
				gray[i][j][1] = color;
				gray[i][j][2] = color;
			}
		}
		return gray;
	}
}
