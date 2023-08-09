package gui;

import entity.building.BaseBuilding;
import entity.unit.BaseUnit;
import javafx.geometry.Insets;
import javafx.scene.layout.AnchorPane;
import javafx.scene.layout.Background;
import javafx.scene.layout.BackgroundFill;
import javafx.scene.layout.CornerRadii;
import javafx.scene.layout.VBox;
import javafx.scene.paint.Color;
import javafx.scene.text.Text;
import utils.FontUtil;
import utils.GameConfig;
import utils.MessageTextUtil;

/**
 * The MessagePane class is the pane that shows the message of each action that
 * the {@link Player} or {@link Monster} did.
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
		AnchorPane.setLeftAnchor(this, 0.0);
		this.setPrefHeight(50.0 * GameConfig.getScale());
		this.setPrefWidth(140.0 * GameConfig.getScale());
		this.setBackground(
				new Background(new BackgroundFill(Color.rgb(0, 0, 0, 0.5), CornerRadii.EMPTY, Insets.EMPTY)));
		this.setPadding(new Insets(7, 7, 7, 14));
	}

	/**
	 * Adds message to this MessagePane.
	 * 
	 * @param text The message to be added
	 */
	public void addMessage(String text) {

		// If the amount of message is more than MAX_MESSAGE, remove the oldest one.
		if (this.getChildren().size() >= MAX_MESSAGE) {
			this.getChildren().remove(0);
		}

		// Add new message
		Text message = new Text(text);
		message.setWrappingWidth(200.0 * GameConfig.getScale());
		message.setFont(FontUtil.getFont("small"));
		message.setFill(Color.WHITE);
		this.getChildren().add(message);
	}

	/**
	 * Removes all messages in this MessagePane.
	 */
	public void resetMessage() {
		this.getChildren().clear();
	}
}