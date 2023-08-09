package gui;

import javafx.geometry.Insets;
import javafx.scene.layout.Background;
import javafx.scene.layout.BackgroundFill;
import javafx.scene.layout.Border;
import javafx.scene.layout.BorderStroke;
import javafx.scene.layout.BorderStrokeStyle;
import javafx.scene.layout.BorderWidths;
import javafx.scene.layout.CornerRadii;
import javafx.scene.layout.VBox;
import javafx.scene.paint.Color;
import utils.GameConfig;

public class StyledVBoxButton extends VBox {

	/**
	 * The constructor of class.
	 * 
	 * @param bgColor the background color of button
	 */
	public StyledVBoxButton(Color bgColor) {
		
		this.setPadding(new Insets(5 * GameConfig.getScale()));
		this.setBackground(new Background(new BackgroundFill(bgColor, null, null)));
		this.setBorder(new Border(new BorderStroke(bgColor, BorderStrokeStyle.SOLID, CornerRadii.EMPTY,
				new BorderWidths(1 * GameConfig.getScale()))));

		this.setOnMouseEntered((event) -> {
			this.setBorder(new Border(new BorderStroke(Color.BLACK, BorderStrokeStyle.SOLID, CornerRadii.EMPTY,
					new BorderWidths(1 * GameConfig.getScale()))));
		});
		this.setOnMouseExited((event) -> {
			this.setBorder(new Border(new BorderStroke(bgColor, BorderStrokeStyle.SOLID, CornerRadii.EMPTY,
					new BorderWidths(1 * GameConfig.getScale()))));
		});

	}
}
