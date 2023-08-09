package gui;

import controller.InterruptController;
import game.GameLogic;
import game.Material;
import javafx.beans.value.ChangeListener;
import javafx.beans.value.ObservableValue;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.control.CheckBox;
import javafx.scene.control.Label;
import javafx.scene.control.Slider;
import javafx.scene.control.TextField;
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
import javafx.scene.layout.StackPane;
import javafx.scene.layout.VBox;
import javafx.scene.paint.Color;
import javafx.scene.text.Text;
import scene.GameScene;
import utils.AudioUtil;
import utils.FontUtil;
import utils.GameConfig;

public class ShopPopUp extends VBox {
	
	/**
	 * Represent the height of the pane.
	 */
	private final int heightBox = 140;

	/**
	 * Represent the width of the pane.
	 */
	private final int widthBox = 200;
	
	private final int textFieldWidth = 50;

	TextField food_amount, wood_amount, stone_amount, iron_amount;
	Text food_max, wood_max, stone_max, iron_max;
	
	/**
	 * The constructor of the class. Initialize the inside component, event handler
	 * and style.
	 */
	public ShopPopUp() {
		styleSetup();
		addTitle();
		addOptionContainer();
		addCloseText();

		setOnKeyPressed((event) -> {
			if (event.getCode() == KeyCode.ESCAPE) {
				remove();
			}
		});

		InterruptController.setIsShopOpen(false);
	}

	/**
	 * Update value inside setting to current value.
	 */
	public void sellMaterial() {
		GameLogic.sellMaterial(Material.FOOD, Integer.parseInt(food_amount.getText()));
		GameLogic.sellMaterial(Material.WOOD, Integer.parseInt(wood_amount.getText()));
		GameLogic.sellMaterial(Material.STONE, Integer.parseInt(stone_amount.getText()));
		GameLogic.sellMaterial(Material.IRON, Integer.parseInt(iron_amount.getText()));
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
		food_max = new Text(" / " + Integer.toString(GameLogic.getFood()));
		wood_max = new Text(" / " + Integer.toString(GameLogic.getWood()));
		stone_max = new Text(" / " + Integer.toString(GameLogic.getStone()));
		iron_max = new Text(" / " + Integer.toString(GameLogic.getIron()));
		
		food_max.setFont(FontUtil.getFont("extraSmall"));
		Label food_label = new Label("Food ($" + GameConfig.FOOD_PRICE + ") ");
		food_label.setFont(FontUtil.getFont("extraSmall"));
		food_amount = new TextField();
		food_amount.setText("0");
		food_amount.setPrefWidth(textFieldWidth);
		HBox food_box = new HBox();
		food_box.getChildren().addAll(food_label, food_amount, food_max);
		food_box.setAlignment(Pos.CENTER);
		
		wood_max.setFont(FontUtil.getFont("extraSmall"));
		Label wood_label = new Label("Wood ($" + GameConfig.WOOD_PRICE + ") ");
		wood_label.setFont(FontUtil.getFont("extraSmall"));
		wood_amount = new TextField();
		wood_amount.setText("0");
		wood_amount.setPrefWidth(textFieldWidth);
		HBox wood_box = new HBox();
		wood_box.getChildren().addAll(wood_label, wood_amount, wood_max);
		wood_box.setAlignment(Pos.CENTER);
		
		stone_max.setFont(FontUtil.getFont("extraSmall"));
		Label stone_label = new Label("Stone ($" + GameConfig.STONE_PRICE + ") ");
		stone_label.setFont(FontUtil.getFont("extraSmall"));
		stone_amount = new TextField();
		stone_amount.setText("0");
		stone_amount.setPrefWidth(textFieldWidth);
		HBox stone_box = new HBox();
		stone_box.getChildren().addAll(stone_label, stone_amount, stone_max);
		stone_box.setAlignment(Pos.CENTER);
		
		iron_max.setFont(FontUtil.getFont("extraSmall"));
		Label iron_label = new Label("Iron ($" + GameConfig.IRON_PRICE + ") ");
		iron_label.setFont(FontUtil.getFont("extraSmall"));
		iron_amount = new TextField();
		iron_amount.setText("0");
		iron_amount.setPrefWidth(textFieldWidth);
		HBox iron_box = new HBox();
		iron_box.getChildren().addAll(iron_label, iron_amount, iron_max);
		iron_box.setAlignment(Pos.CENTER);
		
		this.getChildren().addAll(food_box, wood_box, stone_box, iron_box);
	}
	
	/**
	 * Initialize new close text which can be clicked to close pane.
	 */
	private void addCloseText() {
		HBox closeBox = new HBox();
		closeBox.setPadding(new Insets(10, 0, 0, 0));
		closeBox.setAlignment(Pos.CENTER);

		Text closeText = new Text("Sell");
		closeText.setFont(FontUtil.getFont("medium"));
		closeText.setFill(Color.BLACK);
		closeText.setStroke(null);

		closeText.setOnMouseClicked((event) -> {
			try {
				sellMaterial();
				GameScene.getMaterialStatus().update();
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
		Text optionTitle = new Text("Shop");

		optionTitle.setFont(FontUtil.getFont("large"));
		optionTitle.setFill(Color.BLACK);

		this.getChildren().add(optionTitle);
	}
	
	public void update() {
		food_amount.setText("0");
		food_max.setText(" / " + Integer.toString(GameLogic.getFood()));
		wood_amount.setText("0");
		wood_max.setText(" / " + Integer.toString(GameLogic.getWood()));
		stone_amount.setText("0");
		stone_max.setText(" / " + Integer.toString(GameLogic.getStone()));
		iron_amount.setText("0");
		iron_max.setText(" / " + Integer.toString(GameLogic.getIron()));
	}
	
	/**
	 * Handle when component is removed from the scene.
	 */
	public void remove() {
		try {
			((StackPane) getParent()).getChildren().remove(this);
			InterruptController.setIsShopOpen(false);
			update();
		} catch (ClassCastException e) {
			System.out.println(this.getClass().getName() + " has already closed");
		} catch (NullPointerException e) {
			System.out.println(this.getClass().getName() + " has not opened yet.");
		}
	}

}
