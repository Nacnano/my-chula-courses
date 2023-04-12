import javafx.event.Event;
import javafx.event.EventHandler;
import javafx.scene.control.TextArea;
import javafx.scene.input.KeyEvent;

public class MyKeyHandler implements EventHandler{
	boolean trigger = false;
	TextArea area;
	public MyKeyHandler(TextArea a) {
		super();
		area = a;
	}

	public void setTrigger(boolean t) {
		trigger =t;
	}

	@Override
	public void handle(Event event) {
		if(trigger) {
			//do nothing
		}else {
			trigger = true; 
			area.setText(area.getText()+ "Ora! ");
		}
	}
}
