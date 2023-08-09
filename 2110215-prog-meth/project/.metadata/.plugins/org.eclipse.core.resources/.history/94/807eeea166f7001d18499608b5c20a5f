package gui;

import entity.building.Resource;
import game.GameLogic;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.layout.Background;
import javafx.scene.layout.BackgroundFill;
import javafx.scene.layout.CornerRadii;
import javafx.scene.layout.VBox;
import javafx.scene.paint.Color;
import javafx.scene.text.Text;
import utils.FontUtil;
import utils.GameConfig;

public class WorkerStatus extends VBox {
	private Text field, mine, sawmill, smelter;
	
	public WorkerStatus() {
		this.setBackground(new Background(new BackgroundFill(Color.DARKORANGE, CornerRadii.EMPTY, Insets.EMPTY)));
		this.setPrefSize(50 * GameConfig.getScale(), 50 * GameConfig.getScale());
		this.setSpacing(10);
		this.setAlignment(Pos.CENTER);
		
		field = new Text("Field Workers: " + Integer.toString(GameLogic.getNumberOfWorkers("Field")));
		field.setFont(FontUtil.getFont("extraSmall"));
		
		mine = new Text("Mine Workers: " + Integer.toString(GameLogic.getNumberOfWorkers("Mine")));
		mine.setFont(FontUtil.getFont("extraSmall"));
		
		sawmill = new Text("Sawmill Workers: " + Integer.toString(GameLogic.getNumberOfWorkers("Sawmill")));
		sawmill.setFont(FontUtil.getFont("extraSmall"));
		
		smelter = new Text("Smelter Workers: " + Integer.toString(GameLogic.getNumberOfWorkers("Smelter")));
		smelter.setFont(FontUtil.getFont("extraSmall"));
		
		this.getChildren().addAll(field, mine, sawmill, smelter);
	}
	
	public void update() {
		this.setField(GameLogic.getNumberOfWorkers("Field"));
		this.setMine(GameLogic.getNumberOfWorkers("Mine"));
		this.setSawmill(GameLogic.getNumberOfWorkers("Sawmill"));
		this.setSmelter(GameLogic.getNumberOfWorkers("Smelter"));
	}
	
	public void setField(int field) {
		this.field.setText("Field Workers: " + Integer.toString(field));
	}
	
	public void setMine(int mine) {
		this.mine.setText("Mine Workers: " + Integer.toString(mine));
	}
	
	public void setSawmill(int sawmill) {
		this.sawmill.setText("Sawmill Workers: " + Integer.toString(sawmill));
	}
	
	public void setSmelter(int smelter) {
		this.smelter.setText("Smelter Workers: " + Integer.toString(smelter));
	}
	
}
