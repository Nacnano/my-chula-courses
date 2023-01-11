
public class StudentScoreDemo3 {

	public static void main(String[] args) {
		StudentScoreHiding data1 = new StudentScoreHiding();
		data1.setId("000121");
		data1.setScore(10);

		StudentScoreHiding data2 = new StudentScoreHiding();
		data2.setId("000221");
		data2.setScore(9);
		
		System.out.println(data1.getId() + " got " + data1.getScore() + " points.");
		System.out.println(data2.getId() + " got " + data2.getScore() + " points.");
	}

}
