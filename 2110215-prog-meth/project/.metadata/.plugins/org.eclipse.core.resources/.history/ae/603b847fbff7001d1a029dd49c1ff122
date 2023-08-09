package gui;

import controller.InterruptController;
import entity.building.BaseBuilding;
import game.GameLogic;
import game.MapRenderer;
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
import utils.FontUtil;
import utils.GameConfig;

public class BuildMilitaryPopUp extends VBox {

	/**
	 * Represent the height of the pane.
	 */
	private final int heightBox = 50;

	/**
	 * Represent the width of the pane.
	 */
	private final int widthBox = 50;
	Color btnColor = Color.rgb(245, 246, 231);
	
	BaseBuilding building;
	
	HBox optionsBox;
	VBox buildSwordManBox, buildArcherBox;
	
	/**
	 * The constructor of the class. Initialize the inside component, event handler
	 * and style.
	 */
	public BuildMilitaryPopUp() {
		styleSetup();
		addTitle();
		addOptions();
		addCloseText();

		setOnKeyPressed((event) -> {
			if (event.getCode() == KeyCode.ESCAPE) {
				remove();
			}
		});

		InterruptController.setIsBuildMilitaryOpen(false);
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
	 * Adds the options section to the pop-up.
	 */
	private void addOptions() {
		optionsBox = new HBox(5);
		optionsBox.setAlignment(Pos.CENTER);
				
		if (GameLogic.getUnemployed() < GameConfig.MILITARY_SIZE) {
			Text text = new Text("Unemployed: " + GameLogic.getUnemployed() + " (expected >= " + GameConfig.MILITARY_SIZE + ")");
			text.setFont(FontUtil.getFont("extraSmall"));
			optionsBox.getChildren().add(text);
		}
		else {
			buildSwordManBox = buildSwordMan();
			buildArcherBox = buildArcher();
			optionsBox.getChildren().addAll(buildSwordManBox, buildArcherBox);
		}

		this.getChildren().add(optionsBox);
	}
	
	/**
	 * Creates a VBox for building SwordMan units.
	 *
	 * @return The VBox for building SwordMan units.
	 */
	private VBox buildSwordMan() {
		StyledVBoxButton vbox = new StyledVBoxButton(btnColor);
		vbox.setAlignment(Pos.CENTER);
		Label label = new Label("SwordMan");
		label.setFont(FontUtil.getFont("extraSmall"));

		vbox.getChildren().addAll(label);
		
		return vbox;
	}
	
	/**
	 * Creates a VBox for building Archer units.
	 *
	 * @return The VBox for building Archer units.
	 */
	private VBox buildArcher() {
		StyledVBoxButton vbox = new StyledVBoxButton(btnColor);
		vbox.setAlignment(Pos.CENTER);
		Label label = new Label("Archer");
		label.setFont(FontUtil.getFont("extraSmall"));

		vbox.getChildren().addAll(label);
		return vbox;
	}
	
	/**
	 * Adds the title text to the pop-up.
	 */
	private void addTitle() {
		Text optionTitle = new Text("Build a military");

		optionTitle.setFont(FontUtil.getFont("small"));
		optionTitle.setFill(Color.BLACK);

		this.getChildren().add(optionTitle);
	}
	
	/**
	 * Adds the close text section to the pop-up.
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
	 * Updates the pop-up with the specified building.
	 *
	 * @param building The base building associated with the pop-up.
	 */
	public void update(BaseBuilding building) {
		setBuilding(building);
		
		if (GameLogic.getUnemployed() < GameConfig.MILITARY_SIZE) {
			Text text = new Text("Unemployed: " + GameLogic.getUnemployed() + " (expected >= " + GameConfig.MILITARY_SIZE + ")");
			text.setFont(FontUtil.getFont("extraSmall"));
			optionsBox.getChildren().clear();
			optionsBox.getChildren().add(text);
		}
		
		buildSwordManBox.setOnMouseClicked((event) -> {
			try {
				GameLogic.buildMilitary(building, "SwordMan");
				MapRenderer.render();
				remove();
			} catch (UnsupportedOperationException e) {
				e.printStackTrace();
			}
		});
		
		buildArcherBox.setOnMouseClicked((event) -> {
			try {
				GameLogic.buildMilitary(building, "Archer");
				MapRenderer.render();
				remove();
			} catch (UnsupportedOperationException e) {
				e.printStackTrace();
			}
		});
	}
	
	/**
	 * Handle when component is removed from the scene.
	 */
	public void remove() {
		try {
			((StackPane) getParent()).getChildren().remove(this);
			InterruptController.setIsBuildMilitaryOpen(false);
		} catch (ClassCastException e) {
			System.out.println(this.getClass().getName() + " has already closed");
		} catch (NullPointerException e) {
			System.out.println(this.getClass().getName() + " has not opened yet.");
		}
	}

	/**
	 * Gets the base building associated with the pop-up.
	 *
	 * @return The base building associated with the pop-up.
	 */
	public BaseBuilding getBuilding() {
		return building;
	}

	/**
	 * Sets the base building associated with the pop-up.
	 *
	 * @param building The base building to be associated with the pop-up.
	 */
	public void setBuilding(BaseBuilding building) {
		this.building = building;
	}
	
	
}
