package components;

import java.util.List;

import controller.GameController;
import effects.base.EntityEffect;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.layout.AnchorPane;
import javafx.scene.layout.Background;
import javafx.scene.layout.BackgroundFill;
import javafx.scene.layout.CornerRadii;
import javafx.scene.layout.VBox;
import javafx.scene.paint.Color;
import javafx.scene.text.Text;
import utils.FontUtil;
import utils.GameConfig;

/**
 * The EffectPane class is the pane that shows information about the current
 * {@link EntityEffect} that the player has.
 *
 */
public class EffectPane extends VBox {
	/**
	 * Create new EffectPane.
	 */
	public EffectPane() {

		AnchorPane.setTopAnchor(this, 25.0 * GameConfig.getScale());
		AnchorPane.setRightAnchor(this, 0.0);

		this.setPadding(new Insets(7));
		BackgroundFill black = new BackgroundFill(Color.rgb(0, 0, 0, 0.5), CornerRadii.EMPTY, Insets.EMPTY);
		this.setBackground(new Background(black));
		this.setAlignment(Pos.CENTER_RIGHT);

		update();
	}

	/**
	 * Update effect information in this EffectPane.
	 */
	public void update() {

		// Clears old text
		this.getChildren().clear();

		List<EntityEffect> playerEffect = GameController.getPlayer().getEffectList();
		if (playerEffect.size() == 0) {
			this.setVisible(false);
		} else {
			this.setVisible(true);
		}

		// Adds effect information
		for (EntityEffect effect : playerEffect) {
			Text effectText = new Text(effect.toString());
			effectText.setFont(FontUtil.getFont("small"));
			effectText.setFill(Color.WHITE);
			this.getChildren().add(effectText);
		}
	}
}
