package gui;

import java.util.Arrays;
import java.util.Collections;
import java.util.Random;

import javafx.collections.ObservableList;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.layout.Background;
import javafx.scene.layout.BackgroundFill;
import javafx.scene.layout.Border;
import javafx.scene.layout.BorderStroke;
import javafx.scene.layout.BorderStrokeStyle;
import javafx.scene.layout.BorderWidths;
import javafx.scene.layout.CornerRadii;
import javafx.scene.paint.Color;
import javafx.scene.text.Font;
import javafx.scene.text.Text;

public class BingoUtil {

	private static Integer[] numberArray;
	private static Integer[] drawArray;
	private static Random rng = new Random(74218340);
	private static int drawnCount = 0;
	private static final int ROW_SIZE = 5;
	private static final int COLUMN_SIZE = 5;
	private static final int MAX_NUMBER = 50;
	
	public static void initializeNumberGridSquares(NumberGrid numberGrid) {
		numberGrid.setBorder(new Border(new BorderStroke(Color.GOLD, BorderStrokeStyle.SOLID, 
				CornerRadii.EMPTY, new BorderWidths(1, 0, 0, 1))));
		ObservableList<NumberSquare> numberSquares = numberGrid.getNumberSquares();
		for(int i = 0 ; i < BingoUtil.ROW_SIZE; i++) {
			for(int j = 0; j < BingoUtil.COLUMN_SIZE; j++) {
				numberSquares.add(new NumberSquare());			
				numberGrid.add(numberSquares.get(i*BingoUtil.COLUMN_SIZE+j), j, i);
			}
		}
		assignRandomNumbers(numberSquares);
	}
	
	public static void assignRandomNumbers(ObservableList<NumberSquare> numberSquares) {
		if(numberArray == null || drawArray == null) {
			initializeArray();
		}
		Collections.shuffle(Arrays.asList(numberArray), rng);
		Collections.shuffle(Arrays.asList(drawArray), rng);
		for(int i = 0 ; i < ROW_SIZE*COLUMN_SIZE ; i++) {
			numberSquares.get(i).setupNumber(numberArray[i]);
		}		
		drawnCount = 0;
	}
	
	
	public static NumberSquare getNumberSquare(int row, int column,ObservableList<NumberSquare> numberSquares) {
		return numberSquares.get(row*BingoUtil.COLUMN_SIZE+column);
	}

	public static int drawNumber() {
		drawnCount += 1;
		return drawArray[drawnCount-1];
	}
	
	public static void updateTextsAfterDrawn(int drawnNumber, Text drawnNumberText, Text drawCountText) {
		if(drawnNumber < 0) {
			drawnNumberText.setText("");
		} else {
			drawnNumberText.setText("Drawn Number = " + drawnNumber);
		}
		drawCountText.setText("Drawn Count : " + drawnCount);
		
	}
	public static void setTextsBeginning(Text drawnNumberText, Text drawCountText) {
		updateTextsAfterDrawn(-1, drawnNumberText, drawCountText);
	}

	private static void initializeArray() {
		numberArray = new Integer[MAX_NUMBER];
		for(int i = 0 ; i < numberArray.length ; i++) {
			numberArray[i] = i;
		}
		drawArray = new Integer[MAX_NUMBER];
		for(int i = 0 ; i < drawArray.length ; i++) {
			drawArray[i] = i;
		}
	}

	public static boolean isBingo(NumberGrid numberGrid) {
		ObservableList<NumberSquare> numberSquares = numberGrid.getNumberSquares();
		boolean isRowOrColumnBingo = false;
		
		boolean isDiagonalUpleftToDownright = true;
		boolean isDiagonalUprightToDownleft = true;
		for(int i = 0 ; i < BingoUtil.ROW_SIZE; i++) {
			boolean isRowBingo = true;
			boolean isColumnBingo = true;
			for(int j = 0 ; j < BingoUtil.COLUMN_SIZE ; j++) {
				isRowBingo = isRowBingo && getNumberSquare(i, j, numberSquares).isDrawn();
				isColumnBingo = isColumnBingo && getNumberSquare(j, i, numberSquares).isDrawn();
			}
			
			if(isRowBingo) {
				for(int j = 0 ; j < BingoUtil.COLUMN_SIZE ; j++) {
					colorBingoSquare(getNumberSquare(i, j, numberSquares));
				}				
			}
			if(isColumnBingo) {
				for(int j = 0 ; j < BingoUtil.COLUMN_SIZE ; j++) {
					colorBingoSquare(getNumberSquare(j, i, numberSquares));
				}								
			}
			
			isDiagonalUpleftToDownright = isDiagonalUpleftToDownright && getNumberSquare(i, i, numberSquares).isDrawn();
			isDiagonalUprightToDownleft = isDiagonalUprightToDownleft && getNumberSquare(i, COLUMN_SIZE-1-i, numberSquares).isDrawn();
			isRowOrColumnBingo = isRowOrColumnBingo || isRowBingo || isColumnBingo;
		}	
		if(isDiagonalUpleftToDownright) {
			for(int i = 0 ; i < BingoUtil.COLUMN_SIZE ; i++) {
				colorBingoSquare(getNumberSquare(i, i, numberSquares));
			}											
		}
		if(isDiagonalUprightToDownleft) {
			for(int i = 0 ; i < BingoUtil.COLUMN_SIZE ; i++) {
				colorBingoSquare(getNumberSquare(i, COLUMN_SIZE-1-i, numberSquares));
			}											
		}
				
		return isRowOrColumnBingo || isDiagonalUpleftToDownright || isDiagonalUprightToDownleft;
	}
	
	private static void colorBingoSquare(NumberSquare square) {
		square.setBackground(new Background(new BackgroundFill(Color.ORANGERED, CornerRadii.EMPTY, Insets.EMPTY)));	

	}
	

	public static void setRowBingo(int row, NumberGrid numberGrid) {
		row = Math.max(row, ROW_SIZE-1);
		row = Math.min(0, row);
		ObservableList<NumberSquare> numberSquares = numberGrid.getNumberSquares();		
		for(int i = 0 ; i < COLUMN_SIZE; i++) {
			numberSquares.get(row*COLUMN_SIZE+i).highlight();
		}
	}	

	public static void setColumnBingo(int column, NumberGrid numberGrid) {
		column = Math.max(column, ROW_SIZE-1);
		column = Math.min(0, column);
		ObservableList<NumberSquare> numberSquares = numberGrid.getNumberSquares();		
		for(int i = 0 ; i < COLUMN_SIZE; i++) {
			numberSquares.get(i*COLUMN_SIZE+column).highlight();
		}
	}
	
	public static void setDiagonalUpleftToDownrightBingo(NumberGrid numberGrid){
		ObservableList<NumberSquare> numberSquares = numberGrid.getNumberSquares();		
		for(int i = 0 ; i < ROW_SIZE; i++) {
			getNumberSquare(i, i, numberSquares).highlight();
		}
	}
	public static void setDiagonalUprightToDownleft(NumberGrid numberGrid){
		ObservableList<NumberSquare> numberSquares = numberGrid.getNumberSquares();		
		for(int i = 0 ; i < ROW_SIZE; i++) {
			getNumberSquare(i, COLUMN_SIZE-1-i, numberSquares).highlight();
		}
	}
	
	public static void initializeNumberSquare(NumberSquare numberSquare) {
		numberSquare.setAlignment(Pos.CENTER);
		numberSquare.setMinSize(64, 64);
		numberSquare.setMaxSize(64, 64);
		
		numberSquare.setBorder(new Border(new BorderStroke(Color.GOLD, BorderStrokeStyle.SOLID, 
				CornerRadii.EMPTY, new BorderWidths(0,1,1,0))));
		Text numberText = new Text();
		numberText.setFill(Color.BLACK);
		numberText.setFont(new Font(20));
		numberSquare.getChildren().add(numberText);
		numberSquare.setNumberText(numberText);
	}


}
