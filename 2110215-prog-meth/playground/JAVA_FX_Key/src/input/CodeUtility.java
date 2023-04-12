package input;

public class CodeUtility {
	public static String code = "";
	public static int counter = 0;
	
	public static void receiveInput(String new_code){
		if(code.equalsIgnoreCase(new_code)) counter++;
		else counter = 1;
		code = new_code;
	}
}
