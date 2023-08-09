package gui;

import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.scene.layout.Border;
import javafx.scene.layout.BorderStroke;
import javafx.scene.layout.BorderStrokeStyle;
import javafx.scene.layout.BorderWidths;
import javafx.scene.layout.CornerRadii;
import javafx.scene.layout.GridPane;
import javafx.scene.paint.Color;

public class NumberGrid extends GridPane {
	
	private ObservableList<NumberSquare> numberSquares = FXCollections.observableArrayList();

	public NumberGrid() {
		super();		
		this.setBorder(new Border(new BorderStroke(Color.GOLD, BorderStrokeStyle.SOLID, 
				CornerRadii.EMPTY, new BorderWidths(1, 0, 0, 1))));
		
		BingoUtil.initializeNumberGridSquares(this);
	}
	
		
	public boolean highlightNumber(int drawnNumber) {
		for(NumberSquare numberSquare : numberSquares) {
			if(numberSquare.getNumber() == drawnNumber)
				numberSquare.highlight();
		}		
		return BingoUtil.isBingo(this);
	}
		
	public ObservableList<NumberSquare> getNumberSquares() {
		return numberSquares;
	}

}
