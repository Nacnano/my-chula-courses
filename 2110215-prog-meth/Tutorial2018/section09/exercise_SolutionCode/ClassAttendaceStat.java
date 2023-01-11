import java.io.File;
import java.io.FileNotFoundException;
import java.text.DecimalFormat;
import java.util.Scanner;

public class ClassAttendaceStat {
	final static int WEEK_NUM = 6;

	public static void main(String[] args) {
		double[][] classAttendanceList = readFileToMatrix("attendance.csv");
		double[] avg = computeAverage(classAttendanceList);
		print1DArray(avg);
	}

	public static int countLineNumber(String filename){
		Scanner fileScanner = null;
		int lineCount = 0;
		try {
			fileScanner = new Scanner(new File(filename));
			fileScanner.nextLine(); // skip header
			
			while (fileScanner.hasNext()) {
				Scanner line = new Scanner(fileScanner.nextLine());
				++lineCount;
			}
			fileScanner.close();
		} catch (FileNotFoundException e) {
			System.out.println("Error: File not found!");
		}
		return lineCount;
	}
	
	public static double[][] readFileToMatrix(String filename) {
		Scanner fileScanner = null;
		int studentNum = countLineNumber(filename);
		double[][] classAttendanceList = new double[studentNum][WEEK_NUM];
		try {
			fileScanner = new Scanner(new File(filename));
			fileScanner.nextLine(); // skip header
			for(int i=0; i<studentNum; ++i){ // each row
				Scanner line = new Scanner(fileScanner.nextLine());
				line.useDelimiter(",");
				String id = line.next().trim();
				System.out.println(id);
				for (int w = 0; w < WEEK_NUM; ++w) { // each column
					classAttendanceList[i][w] = line.nextDouble();					
				}
			}
			fileScanner.close();
		} catch (FileNotFoundException e) {
			System.out.println("Error: File not found!");
		}

		return classAttendanceList;
	}

	public static double[] computeAverage(double[][] classAttendanceList){
		double[] avg = new double[WEEK_NUM];
		int studentNum = classAttendanceList.length;
		for (int i = 0; i < studentNum; ++i) {
			for (int j = 0; j < WEEK_NUM; ++j) {
				avg[j] += classAttendanceList[i][j];
			}
		}	
		
		for (int j = 0; j < WEEK_NUM; ++j) {
			avg[j] /= studentNum;
		}	
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
