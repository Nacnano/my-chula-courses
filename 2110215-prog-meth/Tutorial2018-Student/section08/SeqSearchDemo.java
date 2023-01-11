public class SeqSearchDemo 
{
	public static void main(String[] args) 
	{	int [] a = {99,105,86,34,108,25,11,96};
		System.out.println("a={99,105,86,34,108,25,11,96}");
		System.out.println("86 is found at a["+seqSearch(a,86)+"]");
		System.out.println("96 is found at a["+seqSearch(a,96)+"]");
		System.out.println("0 is found at a["+seqSearch(a,0)+"]");
	}
	public static int seqSearch(int [] a, int k){
		int i = 0;
		int len = a.length;
		while(i<len && a[i]!=k){
			i++;
		}
		if(i>=len) i=-1;
		return i;
	}
}
