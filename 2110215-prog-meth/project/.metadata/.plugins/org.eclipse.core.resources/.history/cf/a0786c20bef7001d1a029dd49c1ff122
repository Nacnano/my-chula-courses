package gui;

import game.Camera;
import javafx.animation.FadeTransition;
import javafx.geometry.Insets;
import javafx.scene.layout.AnchorPane;
import javafx.scene.layout.Background;
import javafx.scene.layout.BackgroundFill;
import javafx.scene.layout.CornerRadii;
import javafx.scene.layout.VBox;
import javafx.scene.paint.Color;
import javafx.scene.text.Text;
import javafx.util.Duration;
import utils.FontUtil;
import utils.GameConfig;
import utils.MessageTextUtil;

/**
 * The MessagePane class is the pane that shows the message of each action that
 * the {@link Unit}, {@link Camera}, or {@link Building} did.
 * 
 * @see MessageTextUtil
 *
 */
public class MessagePane extends VBox {

	/**
	 * A constant holding the maximum amount of message in the MessagePane.
	 */
	private final int MAX_MESSAGE = 4;

	/**
	 * Creates new MessagePane.
	 */
	public MessagePane() {
		AnchorPane.setBottomAnchor(this, 0.0);
		AnchorPane.setRightAnchor(this, 0.0);
		this.setPrefHeight(50.0 * GameConfig.getScale());
		this.setPrefWidth(140.0 * GameConfig.getScale());
		this.setBackground(
				new Background(new BackgroundFill(Color.rgb(0, 0, 0, 0), CornerRadii.EMPTY, Insets.EMPTY)));
		this.setPadding(new Insets(7, 7, 7, 14));
	}

	/**
	 * Adds message to this MessagePane.
	 * 
	 * @param text The message to be added
	 */
	public void addMessage(String text) {

		if (this.getChildren().size() >= MAX_MESSAGE) {
			this.getChildren().remove(0);
		}

		Text message = new Text(text);
		message.setWrappingWidth(200.0 * GameConfig.getScale());
		message.setFont(FontUtil.getFont("small"));
		message.setFill(Color.WHITE);
		this.getChildren().add(message);
		
		this.setBackground(
				new Background(new BackgroundFill(Color.rgb(50, 50, 50, 0.75), CornerRadii.EMPTY, Insets.EMPTY)));
        FadeTransition backgroundFadeTransition = new FadeTransition(Duration.seconds(4), this);
        backgroundFadeTransition.setFromValue(1.0);
        backgroundFadeTransition.setToValue(0.0);
        backgroundFadeTransition.play();
	}

	/**
	 * Removes all messages in this MessagePane.
	 */
	public void resetMessage() {
		this.getChildren().clear();
	}
}