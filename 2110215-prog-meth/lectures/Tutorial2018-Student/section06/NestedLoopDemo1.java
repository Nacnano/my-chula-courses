
public class NestedLoopDemo1 {

	public static void main(String[] args) {
		int N = 6, M = 8;
		int k = 0;
		for(int i=0;i<N;i++){
			System.out.println(">>> loop i="+i);
			// j<i
			for(int j=0;j<M;j++){
				k++;
				System.out.println("i="+i+", j="+j+", k="+k);
			}			
			System.out.println();
		}
		System.out.println(k);
	}

}
