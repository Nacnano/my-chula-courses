package gui;

import controller.GameController;
import controller.InterruptController;
import game.GameLogic;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.layout.Background;
import javafx.scene.layout.BackgroundFill;
import javafx.scene.layout.Border;
import javafx.scene.layout.BorderStroke;
import javafx.scene.layout.BorderStrokeStyle;
import javafx.scene.layout.BorderWidths;
import javafx.scene.layout.CornerRadii;
import javafx.scene.layout.HBox;
import javafx.scene.layout.Pane;
import javafx.scene.paint.Color;
import javafx.scene.text.Text;
import utils.FontUtil;
import utils.GameConfig;

public class NextDay extends HBox {

	/**
	 * Represent the height of the pane.
	 */
	private final int heightBox = 16;

	/**
	 * Represent the width of the pane.
	 */
	private final int widthBox = 40;
	
	public NextDay() {
		styleSetup();
		Text text = new Text("Next Day >>>");
		text.setFont(FontUtil.getFont("extraSmall"));
		this.getChildren().add(text);
		
		setOnMouseClicked((event) -> {
			try {
//				((Pane) this.getParent()).getChildren().remove(this);
				GameController.nextDay();
//				InterruptController.setSettingOpen(false);
			} catch (UnsupportedOperationException e) {
				e.printStackTrace();
			}
		});

	}
	
	private void styleSetup() {
		setBackground(new Background(new BackgroundFill(Color.LIGHTCORAL, null, null)));
		setBorder(new Border(
				new BorderStroke(Color.BLACK, BorderStrokeStyle.SOLID, CornerRadii.EMPTY, BorderWidths.DEFAULT)));
//		setPadding(new Insets(20));
//		setSpacing(10);

		setAlignment(Pos.CENTER);
		setPrefHeight(heightBox * GameConfig.getScale());
		setPrefWidth(widthBox * GameConfig.getScale());
		setMaxHeight(heightBox * GameConfig.getScale());
		setMaxWidth(widthBox * GameConfig.getScale());

	}
}
