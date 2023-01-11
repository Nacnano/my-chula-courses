import java.io.File;
import java.io.FileNotFoundException;
import java.text.DecimalFormat;
import java.util.Scanner;

public class ClassAttendaceStat_Template {
	final static int WEEK_NUM = 6;

	public static void main(String[] args) {
		double[][] classAttendanceList = readFileToMatrix("attendance2016.csv");
		double[] avg = computeAverage(classAttendanceList);
		print1DArray(avg);
	}

	public static int countLineNumber(String filename){
		int lineCount = 0;
		// fill code
		return lineCount;
	}
	
	public static double[][] readFileToMatrix(String filename) {
		int studentNum = countLineNumber(filename);
		double[][] classAttendanceList = new double[studentNum][WEEK_NUM];
		// fill code
		return classAttendanceList;
	}

	public static double[] computeAverage(double[][] classAttendanceList){
		double[] avg = new double[WEEK_NUM];
		// fill code
		return avg;
	}
	
	public static void print1DArray(double[] data){
		DecimalFormat df = new DecimalFormat();
		df.setMaximumFractionDigits(4);
		System.out.print("{ ");
		for(int i=0; i<data.length; ++i){
			System.out.print(df.format(data[i])+" ");
		}
		System.out.println(" }");
	}
}
