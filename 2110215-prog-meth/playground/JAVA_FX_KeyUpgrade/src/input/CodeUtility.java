package input;

public class CodeUtility {
	public static String code = "";
	public static int counter = 0;
	private static boolean pressed = false;
	private static boolean triggered = false;

	public static boolean getPressed() {
		return CodeUtility.pressed;
	}

	public static void setPressed(boolean pressed) {
		if (pressed) {
			CodeUtility.pressed = true;
		} else {
			CodeUtility.pressed = false;
		}
	}

	public static boolean getTriggered() {
		return CodeUtility.triggered;
	}

	public static void setTriggered(String code, boolean pressed) {
		if (pressed) {
			CodeUtility.triggered = true;
			if (CodeUtility.code.equals(code))
				counter++;
			else {
				CodeUtility.code = code;
				counter = 1;
			}
		} else {
			CodeUtility.triggered = false;
		}
	}

	public static void postUpdate() {
		CodeUtility.triggered = false;
	}
}
