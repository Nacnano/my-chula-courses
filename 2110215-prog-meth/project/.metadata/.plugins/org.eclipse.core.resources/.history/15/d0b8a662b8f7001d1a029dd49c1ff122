package gui;

import controller.GameController;
import controller.InterruptController;
import entity.unit.BaseUnit;
import entity.unit.FieldSwordMan;
import entity.unit.ForestSwordMan;
import entity.unit.MountainSwordMan;
import entity.unit.SwordMan;
import game.GameLogic;
import game.MapRenderer;
import game.Terrain;
import javafx.application.Platform;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.control.Label;
import javafx.scene.input.KeyCode;
import javafx.scene.layout.Background;
import javafx.scene.layout.BackgroundFill;
import javafx.scene.layout.Border;
import javafx.scene.layout.BorderStroke;
import javafx.scene.layout.BorderStrokeStyle;
import javafx.scene.layout.BorderWidths;
import javafx.scene.layout.CornerRadii;
import javafx.scene.layout.HBox;
import javafx.scene.layout.StackPane;
import javafx.scene.layout.VBox;
import javafx.scene.paint.Color;
import javafx.scene.text.Text;
import scene.GameScene;
import utils.AnimationUtil;
import utils.FontUtil;
import utils.GameConfig;

public class HelpMilitaryPopUp extends VBox {

	/**
	 * Represent the height of the pane.
	 */
	private final int heightBox = 50;

	/**
	 * Represent the width of the pane.
	 */
	private final int widthBox = 150;
	Color btnColor = Color.rgb(245, 246, 231);
	
	HBox optionsBox;
	VBox healBox, upgradeSwordManBox;
	Text currentPeopleText, unemployedText;

	BaseUnit unit;
	
	/**
	 * The constructor of the class. Initialize the inside component, event handler
	 * and style.
	 */
	public HelpMilitaryPopUp() {
		styleSetup();
		addTitle();
		addOptions();
		addCloseText();

		setOnKeyPressed((event) -> {
			if (event.getCode() == KeyCode.ESCAPE) {
				remove();
			}
		});

		InterruptController.setIsHelpMilitaryOpen(false);
	}

	/**
	 * Initialize style for pane.
	 */
	private void styleSetup() {
		setBackground(new Background(new BackgroundFill(Color.rgb(245, 246, 231), null, null)));
		setBorder(new Border(
				new BorderStroke(Color.BLACK, BorderStrokeStyle.SOLID, CornerRadii.EMPTY, BorderWidths.DEFAULT)));
		setPadding(new Insets(20));
		setSpacing(20);

		setAlignment(Pos.CENTER);
		setPrefHeight(heightBox * GameConfig.getScale());
		setPrefWidth(widthBox * GameConfig.getScale());
		setMaxHeight(heightBox * GameConfig.getScale());
		setMaxWidth(widthBox * GameConfig.getScale());

	}
	
	private void addOptions() {
		optionsBox = new HBox(5);
		optionsBox.setAlignment(Pos.CENTER);
		
		healBox = heal();
		optionsBox.getChildren().add(healBox);
//		if (unit instanceof SwordMan)
//			box.getChildren().add(upgradeSwordMan());
		
		this.getChildren().add(optionsBox);
	}

	private VBox heal() {
		StyledVBoxButton vbox = new StyledVBoxButton(btnColor);
		vbox.setAlignment(Pos.CENTER);
		Label label = new Label("Heal");
		label.setFont(FontUtil.getFont("extraSmall"));
		currentPeopleText = new Text();
		currentPeopleText.setFont(FontUtil.getFont("extraSmall"));
		unemployedText = new Text();
		unemployedText.setFont(FontUtil.getFont("extraSmall"));
		
		vbox.setOnMouseClicked((event) -> {
			try {
				GameLogic.heal(unit);
				MapRenderer.render();
				remove();
			} catch (UnsupportedOperationException e) {
				e.printStackTrace();
			}
		});

		vbox.getChildren().addAll(label, currentPeopleText, unemployedText);
		return vbox;
	}
	
	private VBox upgradeSwordMan() {
		StyledVBoxButton vbox = new StyledVBoxButton(btnColor);
		vbox.setAlignment(Pos.CENTER);
		Terrain terrain = GameLogic.getOurUnitTerrain(unit);
		Label label = new Label("Upgrade to " + terrain + " Swordman");
		label.setFont(FontUtil.getFont("extraSmall"));
		Text text = new Text("Money: " + GameConfig.MILLITARY_UPGRADE_PRICE);
		text.setFont(FontUtil.getFont("extraSmall"));
		
		// Change military to the upgraded unit
		vbox.setOnMouseClicked((event) -> {
			try {
				GameLogic.upgradeSwordMan(unit);
				GameScene.getMaterialStatus().update();
				
				MapRenderer.render();
				
				remove();
			} catch (UnsupportedOperationException e) {
				e.printStackTrace();
			}
		});

		vbox.getChildren().addAll(label, text);
		return vbox;
	}
	
	/**
	 * Initialize new close text which can be clicked to close pane.
	 */
	private void addCloseText() {
		HBox closeBox = new HBox();
		closeBox.setPadding(new Insets(10, 0, 0, 0));
		closeBox.setAlignment(Pos.CENTER);

		Text closeText = new Text("Cancel");
		closeText.setFont(FontUtil.getFont("small"));
		closeText.setFill(Color.BLACK);
		closeText.setStroke(null);

		closeText.setOnMouseClicked((event) -> {
			try {
				remove();
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
		Text optionTitle = new Text("Military Helper");

		optionTitle.setFont(FontUtil.getFont("small"));
		optionTitle.setFill(Color.BLACK);

		this.getChildren().add(optionTitle);
	}
	
	public void update(BaseUnit unit) {
		setUnit(unit);
		currentPeopleText.setText("Current: " + unit.getPeople() + "/" + GameConfig.MILITARY_SIZE);
		unemployedText.setText("Unemployed: " + GameLogic.getUnemployed());
		if (optionsBox.getChildren().size() > 1) {
			optionsBox.getChildren().remove(optionsBox.getChildren().size() - 1);
		}
		if (unit instanceof SwordMan) {
			if (unit instanceof FieldSwordMan || unit instanceof ForestSwordMan || unit instanceof MountainSwordMan) return;
			
			optionsBox.getChildren().add(upgradeSwordMan());
		}
			
	}
	
	/**
	 * Handle when component is removed from the scene.
	 */
	public void remove() {
		try {
			((StackPane) getParent()).getChildren().remove(this);
			InterruptController.setIsHelpMilitaryOpen(false);
		} catch (ClassCastException e) {
			System.out.println(this.getClass().getName() + " has already closed");
		} catch (NullPointerException e) {
			System.out.println(this.getClass().getName() + " has not opened yet.");
		}
	}

	public BaseUnit getUnit() {
		return unit;
	}

	public void setUnit(BaseUnit unit) {
		this.unit = unit;
	}
	
}
