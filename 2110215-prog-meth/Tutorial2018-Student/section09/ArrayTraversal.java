public class ArrayTraversal {
	public static void main(String[] args) {
		int [][][] array3D = { 
  			{ {1, 3, 2}, {5, 4}, {7, 6, 8, 9} },
  			{ {3, 2, 1}, {4, 3, 1, 5} } };

		for (int i = 0; i < array3D.length; i++) {
			for (int j = 0; j < array3D[i].length; j++) {
				for (int k = 0; k < array3D[i][j].length; k++) {
					// you can access element i,j,k
					// d[i][j][k]
					System.out.printf("d[%d][%d][%d] = %d\n", i, j, k, array3D[i][j][k]);
				}
			}	
		}
	}
}


