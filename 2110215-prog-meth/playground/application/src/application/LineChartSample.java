package application;

/*
 * Reference: https://docs.oracle.com/javase/8/javafx/user-interface-tutorial/line-chart.htm
 */

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.chart.CategoryAxis;
import javafx.scene.chart.LineChart;
import javafx.scene.chart.NumberAxis;
import javafx.scene.chart.XYChart;
import javafx.stage.Stage;
 
public class LineChartSample extends Application {
 
    @Override public void start(Stage stage) {
        // Create axis
        final CategoryAxis xAxis = new CategoryAxis();
        xAxis.setLabel("Month");
        final NumberAxis yAxis = new NumberAxis();
        
        // Create line chart
        final LineChart<String,Number> lineChart = new LineChart<String,Number>(xAxis,yAxis);
        lineChart.setTitle("Stock Monitoring, 2010");
        
        // Create series 1
        XYChart.Series<String, Number> series1 = new XYChart.Series<String, Number>();
        series1.setName("Portfolio 1");
        series1.getData().add(new XYChart.Data<String, Number>("Jan", 23));
        series1.getData().add(new XYChart.Data<String, Number>("Feb", 14));
        series1.getData().add(new XYChart.Data<String, Number>("Mar", 15));
        series1.getData().add(new XYChart.Data<String, Number>("Apr", 24));
        series1.getData().add(new XYChart.Data<String, Number>("May", 34));
        series1.getData().add(new XYChart.Data<String, Number>("Jun", 36));
        
        // Create series 2
        XYChart.Series<String, Number> series2 = new XYChart.Series<String, Number>();
        series2.setName("Portfolio 2");
        series2.getData().add(new XYChart.Data<String, Number>("Jan", 33));
        series2.getData().add(new XYChart.Data<String, Number>("Feb", 34));
        series2.getData().add(new XYChart.Data<String, Number>("Mar", 25));
        series2.getData().add(new XYChart.Data<String, Number>("Apr", 44));
        series2.getData().add(new XYChart.Data<String, Number>("May", 39));
        series2.getData().add(new XYChart.Data<String, Number>("Jun", 16));
        
        // Add series to line chart
        lineChart.getData().add(series1);
        lineChart.getData().add(series2);
        
        Scene scene  = new Scene(lineChart,800,600);       

        stage.setScene(scene);
        stage.setTitle("Line Chart Sample");
        stage.show();
    }

    public static void main(String[] args) {
        launch(args);
    }
}
