package gui;

import javafx.geometry.Insets;
import javafx.scene.layout.Background;
import javafx.scene.layout.BackgroundFill;
import javafx.scene.layout.CornerRadii;
import javafx.scene.layout.HBox;
import javafx.scene.paint.Color;
import javafx.scene.text.Font;
import javafx.scene.text.Text;

public class NumberSquare extends HBox {
	
	private int number;
	private boolean isDrawn;
	private Text numberText;

	public NumberSquare() {
		BingoUtil.initializeNumberSquare(this);		
	}

	public void setupNumber(int number) {
		this.setNumber(number);
		this.setIsDrawn(false);
		numberText.setText(Integer.toString(number));
		numberText.setFont(new Font(20));
		this.setBackground(new Background(new BackgroundFill(Color.WHITE, null, getInsets())));
	}	
	
	public void highlight() {
		this.setBackground(new Background(new BackgroundFill(Color.ORANGE, null, getInsets())));
		this.setIsDrawn(true);
	}
	
	public int getNumber() {
		return number;
	}	

	public void setNumber(int number) {
		this.number = number;
	}
	
	public boolean isDrawn() {
		return isDrawn;
	}

	public void setIsDrawn(boolean isDrawn) {
		this.isDrawn = isDrawn;
	}
	
	public void setNumberText(Text numberText) {
		this.numberText = numberText;
	}
}
