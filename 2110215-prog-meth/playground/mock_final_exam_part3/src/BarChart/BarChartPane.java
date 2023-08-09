package BarChart;


import static javafx.scene.layout.BorderStrokeStyle.SOLID;

import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.chart.BarChart;
import javafx.scene.chart.CategoryAxis;
import javafx.scene.chart.NumberAxis;
import javafx.scene.chart.XYChart.Data;
import javafx.scene.chart.XYChart.Series;
import javafx.scene.control.Label;
import javafx.scene.layout.Border;
import javafx.scene.layout.BorderStroke;
import javafx.scene.layout.BorderWidths;
import javafx.scene.layout.CornerRadii;
import javafx.scene.layout.VBox;
import javafx.scene.paint.Color;
import javafx.scene.text.Font;

public class BarChartPane extends VBox {

	private ObservableList<Data<String, Number>> barChartDataList = FXCollections.observableArrayList();;
	
	private Number Base2;
	private Number Base3;
	private Number Base7;
	private Number Base13;
	public BarChartPane () {
		
		super(10);
		this.setPrefWidth(400);
		this.setAlignment(Pos.TOP_CENTER);
		this.setBorder(new Border(new BorderStroke(Color.LIGHTGRAY, SOLID, 
				CornerRadii.EMPTY, BorderWidths.DEFAULT)));
		this.setPadding(new Insets(10));
	
		this.getChildren().addAll(createHeaderLabel(), createBarChart());
	}
	
	public double addItem(String item, double amount) {
		for (Data<String, Number> data : barChartDataList) {
			if(data.getXValue().equals(item)) {
				data.setYValue((int)amount);
				return 0;
			}
			
		}
		return -1;
	}
	
	public Label createHeaderLabel() {
		Label header = new Label("Thread Speed");
		header.setFont(new Font(24));
		return header;
	}
	
	public BarChart<String, Number> createBarChart() {
		CategoryAxis xAxis = new CategoryAxis();
		xAxis.setLabel("Item");
		
		NumberAxis yAxis = new NumberAxis();
		yAxis.setLabel("Time (milisecond)");
		
		barChartDataList.add(new Data<String, Number>("Base2",0));
		barChartDataList.add(new Data<String, Number>("Base3",0));
		barChartDataList.add(new Data<String, Number>("Base7",0));
		barChartDataList.add(new Data<String, Number>("Base13",0));
		
		BarChart<String, Number> barChart = new BarChart<String, Number>(xAxis, yAxis);
		
		barChart.getData().add(new Series<String, Number>(barChartDataList));
		barChart.setLegendVisible(false);
		
		return barChart;
	}
	
}
