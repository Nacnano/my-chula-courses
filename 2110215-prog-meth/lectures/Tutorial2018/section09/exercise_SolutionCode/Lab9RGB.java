public class Lab9RGB {
	final static int WIDTH = 256;
	final static int HEIGHT = 128;

	public static void main(String[] args) {
		int[][][] yellowPatch = new int[WIDTH][HEIGHT][3];
		int[] yellow = {250, 250, 15};
		for (int i = 0; i < WIDTH; i++) {
			for (int j = 0; j < HEIGHT; j++) {
				yellowPatch[i][j] = yellow;
			}
		}
		Java101ImageUtil.showViewer(yellowPatch, "Yellow patch");
	}
}
