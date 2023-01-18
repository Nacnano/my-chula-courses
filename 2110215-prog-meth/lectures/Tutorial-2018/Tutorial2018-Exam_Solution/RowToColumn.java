
public class RowToColumn {
	public static int[][] rowToColumn(int[][] a) {
		int[][] answer = new int[a[0].length][a.length];

		for (int i = 0; i < a.length; i++) {
			for (int j = 0; j < a[i].length; j++) {
				answer[j][i] = a[i][j];
			}
		}

		return answer;

	}
}
