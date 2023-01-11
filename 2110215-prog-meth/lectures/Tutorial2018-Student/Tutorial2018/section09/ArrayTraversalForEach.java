public class ArrayTraversalForEach {
	public static void main(String[] args) {
		int [][][] array3D = { 
  			{ {1, 3, 2}, {5, 4}, {7, 6, 8, 9} },
  			{ {3, 2, 1}, {4, 3, 1, 5} } };

  		for (int[][] array2D : array3D) {
  			for (int[] array1D : array2D) {
  				for (int data : array1D) {
  					System.out.print(data + " ");
  				}
  				System.out.print(", ");
  			}
  			System.out.println();
  		}
	}
}


