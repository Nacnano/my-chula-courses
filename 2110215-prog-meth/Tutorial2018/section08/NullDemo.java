public class NullDemo{
	public static void main(String [] args){
		String [] s = new String[5];
		for(int i=0;i<s.length;i++){
			System.out.println("s["+i+"] = "+s[i]);
		}
		if(s[0]==null){
			System.out.println("Yes, s[0] is null.");
		}
		System.out.println("Its length is "+s[0].length());
	}
}