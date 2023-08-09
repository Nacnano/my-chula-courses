package gui;

import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.event.EventType;
import javafx.geometry.Pos;
import javafx.scene.control.Button;
import javafx.scene.input.MouseEvent;
import javafx.scene.layout.Border;
import javafx.scene.layout.BorderStroke;
import javafx.scene.layout.BorderStrokeStyle;
import javafx.scene.layout.BorderWidths;
import javafx.scene.layout.CornerRadii;
import javafx.scene.layout.VBox;
import javafx.scene.paint.Color;
import javafx.scene.text.Font;
import javafx.scene.text.Text;

//You might need to do something to the following line
public class ControlPane extends VBox{
	
	private Text drawnNumberText;
	private Text drawCountText;
	private Text bingoText;
	private Button drawButton;
	private Button newRoundButton;
	private NumberGrid numberGrid;

	
	public ControlPane(NumberGrid numberGrid) {
		this.setNumberGrid(numberGrid);
		this.setAlignment(Pos.CENTER);
		this.setPrefWidth(300);
		this.setSpacing(20);
		this.setBorder(new Border(new BorderStroke(Color.LIGHTGRAY, BorderStrokeStyle.SOLID, CornerRadii.EMPTY, BorderWidths.DEFAULT)));
		
		this.setDrawnNumberText(new Text());
		this.getDrawnNumberText().setFont(new Font(20));
		
		this.setDrawCountText(new Text());
		
		initializeBingoText();
		
		initializeDrawButton();
		
		initializeNewRoundButton();
		
		this.getChildren().addAll(drawnNumberText, drawButton, newRoundButton, bingoText, drawCountText);
		
		BingoUtil.setTextsBeginning(drawnNumberText, drawCountText);
		
	}
	
	private void initializeBingoText() {
		this.setBingoText(new Text("Bingo!!"));
		this.getBingoText().setFont(new Font(40));
		this.getBingoText().setVisible(false);
	}

	private void initializeDrawButton() {
		this.setDrawButton(new Button("Draw a number"));
		this.getDrawButton().setPrefWidth(100);
		this.getDrawButton().setOnAction((event) -> drawButtonHandler());
	}

	private void initializeNewRoundButton() {
		this.setNewRoundButton(new Button("New Round"));
		this.getNewRoundButton().setPrefWidth(100);
		this.getNewRoundButton().setDisable(true);
		this.getNewRoundButton().setOnAction((event) -> newRoundButtonHandler());
	}
	
	private void drawButtonHandler() {
		int randomNumber = BingoUtil.drawNumber();
		if (this.getNumberGrid().highlightNumber(randomNumber)) {
			this.getBingoText().setVisible(true);
			this.getDrawButton().setDisable(true);
			this.getNewRoundButton().setDisable(false);
		}
		BingoUtil.updateTextsAfterDrawn(randomNumber, drawnNumberText, drawCountText);	
	}
	
	private void newRoundButtonHandler() {
		BingoUtil.assignRandomNumbers(this.getNumberGrid().getNumberSquares());
		this.getBingoText().setVisible(false);
		this.getDrawButton().setDisable(false);
		this.getNewRoundButton().setDisable(true);
		BingoUtil.setTextsBeginning(drawnNumberText, drawCountText);
	}

	public Text getDrawnNumberText() {
		return drawnNumberText;
	}

	public void setDrawnNumberText(Text drawnNumberText) {
		this.drawnNumberText = drawnNumberText;
	}

	public Text getDrawCountText() {
		return drawCountText;
	}

	public void setDrawCountText(Text drawCountText) {
		this.drawCountText = drawCountText;
	}

	public Text getBingoText() {
		return bingoText;
	}

	public void setBingoText(Text bingoText) {
		this.bingoText = bingoText;
	}

	public Button getDrawButton() {
		return drawButton;
	}

	public void setDrawButton(Button drawButton) {
		this.drawButton = drawButton;
	}

	public Button getNewRoundButton() {
		return newRoundButton;
	}

	public void setNewRoundButton(Button newRoundButton) {
		this.newRoundButton = newRoundButton;
	}

	public NumberGrid getNumberGrid() {
		return numberGrid;
	}

	public void setNumberGrid(NumberGrid numberGrid) {
		this.numberGrid = numberGrid;
	}

	
}
