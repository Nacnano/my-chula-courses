import java.util.Scanner;

public class ScoreChecker {
	public static void main(String[] args) {
		double score;
		String msg, id = null;
		boolean okToProceed = true;
		Scanner sc = new Scanner(System.in);
		System.out.println("Enter Student ID: ");
		try {
			id = sc.nextLine();
		} catch (Exception e) {
			okToProceed = false;
		}
		
		
		if (okToProceed) {
			if (id.length() == 10) {
				score = JavaScoreData.getScoreOf(id);
				msg = "The total score is " + score + " points.\n";
				msg += "The student " + (score >= 50 ? "passes" : "failed") + " the course!";
				System.out.println(msg);
			} else {
				System.out.println("Invalid student ID.");
			}
		} else {
			System.out.println("Oops! Something went wrong.");
		}
	}
}