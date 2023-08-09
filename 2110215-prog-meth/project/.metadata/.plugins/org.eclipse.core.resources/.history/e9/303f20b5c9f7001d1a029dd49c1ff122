package gui;

import controller.InterruptController;
import javafx.beans.value.ChangeListener;
import javafx.beans.value.ObservableValue;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.control.CheckBox;
import javafx.scene.control.Label;
import javafx.scene.control.Slider;
import javafx.scene.input.KeyCode;
import javafx.scene.layout.Background;
import javafx.scene.layout.BackgroundFill;
import javafx.scene.layout.Border;
import javafx.scene.layout.BorderStroke;
import javafx.scene.layout.BorderStrokeStyle;
import javafx.scene.layout.BorderWidths;
import javafx.scene.layout.CornerRadii;
import javafx.scene.layout.GridPane;
import javafx.scene.layout.HBox;
import javafx.scene.layout.Pane;
import javafx.scene.layout.VBox;
import javafx.scene.paint.Color;
import javafx.scene.text.Text;
import utils.FontUtil;
import utils.AudioUtil;
import utils.GameConfig;

/**
 * The SettingPane is the pane that contains all the setting which available to
 * adjust in this game.
 */

public class SettingPane extends VBox {

	/**
	 * Represent the height of the pane.
	 */
	private final int heightBox = 140;

	/**
	 * Represent the width of the pane.
	 */
	private final int widthBox = 200;

	/**
	 * The container for all option components.
	 */
	private GridPane optionContainer;

	/**
	 * Represent the {@link Slider} that control music volume.
	 */
	private Slider bgmVolumeSlider;

	/**
	 * Represent the {@link Slider} that control effect volume.
	 */
	private Slider effectVolumeSlider;

	/**
	 * Represent the {@link CheckBox} that disable the animation when entity is
	 * moving.
	 */
	private CheckBox animationCheckBox;
	
	/**
	 * The constructor of the class. Initialize the inside component, event handler
	 * and style.
	 */
	public SettingPane() {
		styleSetup();
		addTitle();
		addBgmVolumeSlider();
		addEffectVolumeSlider();
		addDisableAnimation();
		addOptionContainer();
		addCloseText();

		setOnKeyPressed((event) -> {
			if (event.getCode() == KeyCode.ESCAPE) {
				((Pane) this.getParent()).getChildren().remove(this);
			}
		});

		InterruptController.setSettingOpen(true);
	}

	/**
	 * Update value inside setting to current value.
	 */
	public void updateSetting() {
		effectVolumeSlider.setValue((int) (GameConfig.getEffectVolume() * 100));
		bgmVolumeSlider.setValue((int) (GameConfig.getBgmVolume() * 100));
		animationCheckBox.setSelected(GameConfig.isSkipMoveAnimation());
	}

	/**
	 * Initialize style for pane.
	 */
	private void styleSetup() {
		setBackground(new Background(new BackgroundFill(Color.rgb(245, 246, 231), null, null)));
		setBorder(new Border(
				new BorderStroke(Color.BLACK, BorderStrokeStyle.SOLID, CornerRadii.EMPTY, BorderWidths.DEFAULT)));
		setPadding(new Insets(20));
		setSpacing(10);

		setAlignment(Pos.CENTER);
		setPrefHeight(heightBox * GameConfig.getScale());
		setPrefWidth(widthBox * GameConfig.getScale());
		setMaxHeight(heightBox * GameConfig.getScale());
		setMaxWidth(widthBox * GameConfig.getScale());

	}

	/**
	 * Initialize new {@link #optionContainer} and add component to container.
	 */
	public void addOptionContainer() {
		optionContainer = new GridPane();
		optionContainer.setPadding(new Insets(10));
		optionContainer.setVgap(20);

		Label effectVolumeLabel = new Label("Effect Volume");
		effectVolumeLabel.setFont(FontUtil.getFont("small"));
		effectVolumeLabel.setTextFill(Color.BLACK);

		Label bgmVolumeLabel = new Label("Music Volume");
		bgmVolumeLabel.setFont(FontUtil.getFont("small"));
		bgmVolumeLabel.setTextFill(Color.BLACK);

		Label disableLabel = new Label("Disable Animation ");
		disableLabel.setFont(FontUtil.getFont("small"));
		disableLabel.setTextFill(Color.BLACK);
		
		Label endlessLabel = new Label("Endless Mode");
		endlessLabel.setFont(FontUtil.getFont("small"));
		endlessLabel.setTextFill(Color.BLACK);

		optionContainer.add(bgmVolumeLabel, 0, 0);
		optionContainer.add(bgmVolumeSlider, 1, 0);

		optionContainer.add(effectVolumeLabel, 0, 1);
		optionContainer.add(effectVolumeSlider, 1, 1);

		optionContainer.add(disableLabel, 0, 2);
		optionContainer.add(animationCheckBox, 1, 2);
		
		getChildren().add(optionContainer);
	}

	/**
	 * Initialize new {@link #effectVolumeSlider}.
	 */
	public void addEffectVolumeSlider() {
		effectVolumeSlider = new Slider(0, 100, (int) (GameConfig.getEffectVolume() * 100));
		effectVolumeSlider.valueProperty().addListener(new ChangeListener<Number>() {

			@Override
			public void changed(ObservableValue<? extends Number> observable, Number oldValue, Number newValue) {
				GameConfig.setEffectVolume((double) newValue / 100);
				AudioUtil.updateEffectVolume();
			}

		});
	}

	/**
	 * Initialize new close text which can be clicked to close pane.
	 */
	private void addCloseText() {
		HBox closeBox = new HBox();
		closeBox.setPadding(new Insets(10, 0, 0, 0));
		closeBox.setAlignment(Pos.CENTER);

		Text closeText = new Text("OK");
		closeText.setFont(FontUtil.getFont("medium"));
		closeText.setFill(Color.BLACK);
		closeText.setStroke(null);

		closeText.setOnMouseClicked((event) -> {
			try {
				((Pane) this.getParent()).getChildren().remove(this);
				InterruptController.setSettingOpen(false);
			} catch (UnsupportedOperationException e) {
				e.printStackTrace();
			}
		});

		closeBox.getChildren().addAll(closeText);

		this.getChildren().add(closeBox);
	}

	/**
	 * Initialize new title text.
	 */
	private void addTitle() {
		Text optionTitle = new Text("Setting");

		optionTitle.setFont(FontUtil.getFont("large"));
		optionTitle.setFill(Color.BLACK);

		this.getChildren().add(optionTitle);
	}

	/**
	 * Initialize new {@link #bgmVolumeSlider} with current value.
	 */
	private void addBgmVolumeSlider() {
		bgmVolumeSlider = new Slider(0, 100, (int) (GameConfig.getBgmVolume() * 100));
		bgmVolumeSlider.valueProperty().addListener(new ChangeListener<Number>() {

			@Override
			public void changed(ObservableValue<? extends Number> observable, Number oldValue, Number newValue) {
				GameConfig.setBgmVolume((double) newValue / 100);
				AudioUtil.updateBGMVolume();
			}

		});
	}

	/**
	 * Initialize new {@link #animationCheckBox}.
	 */
	private void addDisableAnimation() {
		animationCheckBox = new CheckBox();
		animationCheckBox.setSelected(GameConfig.isSkipMoveAnimation());

		animationCheckBox.setOnMouseClicked((event) -> {
			boolean newSkipMove = !GameConfig.isSkipMoveAnimation();

			GameConfig.setSkipMoveAnimation(newSkipMove);
			animationCheckBox.setSelected(newSkipMove);
		});
	}
}