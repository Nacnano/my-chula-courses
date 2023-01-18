public class SelectionSortDemo
{
	public static void main(String[] args) 
	{	double [] a = {6.0,5.9,-10.5,-8,1.3};
		for(int i=0;i<a.length;i++)
			System.out.print(a[i]+",");
		System.out.println();
		selectionSort(a);
		for(int i=0;i<a.length;i++)
			System.out.print(a[i]+",");
		System.out.println();
	}
	public static void selectionSort(double [] a){
		int k = 0, minIdx;
		while(k<a.length-1){
			minIdx = findMinIdx(a,k);
			swapElement(a,k,minIdx);
			k++;
		}
	}
	public static int findMinIdx(double [] a,int k){
	//This method finds the index of the minimum value
	//among a[k] to a[a.length-1]
		int minIdx = k;
		for(int i=k+1;i<a.length;i++)
			if(a[i]<a[minIdx]) minIdx = i;
		return minIdx;
	}
	public static void swapElement(double [] a,int i,int j){
		double temp;
		temp = a[i];
		a[i] = a[j];
		a[j] = temp;
	}
}
