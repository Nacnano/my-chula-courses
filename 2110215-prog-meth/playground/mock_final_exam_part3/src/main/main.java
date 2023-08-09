package main;

import BarChart.BarChartPane;
import javafx.application.Application;
import javafx.application.Platform;
import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.Alert;
import javafx.scene.control.Button;
import javafx.scene.control.DatePicker;
import javafx.scene.control.Label;
import javafx.scene.control.ScrollPane;
import javafx.scene.control.TextArea;
import javafx.scene.control.TextField;
import javafx.scene.input.KeyEvent;
import javafx.scene.input.MouseDragEvent;
import javafx.scene.input.MouseEvent;
import javafx.scene.control.Alert.AlertType;
import javafx.scene.layout.FlowPane;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import javafx.scene.text.Text;
import javafx.stage.Stage;

public class main extends Application {

	private static BarChartPane chart = new BarChartPane();
	private static double currentTimeBase2 = 0;
	private static double currentTimeBase3 = 0;
	private static double currentTimeBase7 = 0;
	private static double currentTimeBase13 = 0;

	@Override
	public void start(Stage primaryStage) {
		HBox root = new HBox();
		root.setPadding(new Insets(5));
		root.setPrefSize(1000, 300);
		root.setAlignment(Pos.CENTER);

		Label inputLabel = new Label("Input");
		inputLabel.setPrefWidth(200);
		TextField input = new TextField();
		input.setPrefWidth(200);
		VBox inputBox = new VBox();
		inputBox.getChildren().addAll(inputLabel, input);

		Button calculate = new Button("Calculate!");
		calculate.setPrefWidth(100);

		Label base2Label = new Label("Base 2");
		Label base3Label = new Label("Base 3");
		Label base7Label = new Label("Base 7");
		Label base13Label = new Label("Base 13");

		Label fill = new Label("");
		TextField base2Field = new TextField();
		TextField base3Field = new TextField();
		TextField base7Field = new TextField();
		TextField base13Field = new TextField();
		HBox base2Box = new HBox();
		HBox base3Box = new HBox();
		HBox base7Box = new HBox();
		HBox base13Box = new HBox();
		VBox funcBox = new VBox();
		HBox chartBox = new HBox();
		chartBox.getChildren().addAll(chart);
		VBox mainBox = new VBox();

		base2Label.setPrefWidth(150);
		base3Label.setPrefWidth(150);
		base7Label.setPrefWidth(150);
		base13Label.setPrefWidth(150);
		base2Field.setPrefWidth(150);
		base3Field.setPrefWidth(150);
		base7Field.setPrefWidth(150);
		base13Field.setPrefWidth(150);
		fill.setPrefWidth(50);

		base2Box.getChildren().addAll(base2Label, base2Field);
		base3Box.getChildren().addAll(base3Label, base3Field);
		base7Box.getChildren().addAll(base7Label, base7Field);
		base13Box.getChildren().addAll(base13Label, base13Field);
		funcBox.getChildren().addAll(base2Box, base3Box, base7Box, base13Box);

		Label fill2 = new Label();
		fill2.setPrefWidth(250);

		TextArea area = new TextArea();
		area.setWrapText(true); // important property for a text area
		area.setPrefSize(230, 100);

		mainBox.getChildren().addAll(inputBox, calculate, funcBox, fill2, area);
		root.getChildren().addAll(mainBox, chartBox);

		calculate.setOnAction(new EventHandler<ActionEvent>() {

			@Override
			public void handle(ActionEvent event) {
				// assume that the input is always legal.
				Thread tmp = new Thread(new Runnable() {


					@Override
					public void run() {
						String number = input.getText();
						double inputNumber = Double.parseDouble(number);
						currentTimeBase2 = 0;
						currentTimeBase3 = 0;
						currentTimeBase7 = 0;
						currentTimeBase13 = 0;
						final String result13 = base_X(inputNumber, 13);
						updateLabel(base13Field, result13);
						final String result7 = base_X(inputNumber, 7);
						updateLabel(base7Field, result7);
						final String result3 = base_X(inputNumber, 3);
						updateLabel(base3Field, result3);
						final String result2 = base_X(inputNumber, 2);
						updateLabel(base2Field, result2);
						area.setText("Base 2  : " + base2Field.getText() + "\n" + "Base 3  : " + base3Field.getText() + "\n"
								+ "Base 7  : " + base7Field.getText() + "\n" + "Base 13 : " + base13Field.getText());
						chart.addItem("Base2", currentTimeBase2);
						chart.addItem("Base3", currentTimeBase3);
						chart.addItem("Base7", currentTimeBase7);
						chart.addItem("Base13", currentTimeBase13);
					}
				});
				tmp.start();

			}
		});

		Scene scene = new Scene(root, 650, 500);
		primaryStage.setScene(scene);
		primaryStage.setTitle("Calculate!");
		primaryStage.show();

	}

	public static String base_X(double x, int base) {
		int i = (int) x;
		String result = "";
		while (i > 0) {
			try {
				Thread.sleep(200);
				if (base == 2)
					currentTimeBase2 += 200;
				else if (base == 3)
					currentTimeBase3 += 200;
				else if (base == 7)
					currentTimeBase7 += 200;
				else if (base == 13)
					currentTimeBase13 += 200;
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			int n = i % base;
			String a;
			if (n == 10)
				a = "A";
			else if (n == 11)
				a = "B";
			else if (n == 12)
				a = "C";
			else
				a = n + "";
			result = a + result;
			i /= base;
		}
		return result;
	}

	public static void main(String[] args) {
		launch(args);
	}

	public void updateLabel(TextField text, String newText) {
		text.setText(newText);
	}

}