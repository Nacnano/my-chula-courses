public class StudentScoreDemo1 {

	public static void main(String[] args) {
		StudentScore data1 = new StudentScore();
		data1.id = "000121";
		data1.score = 10;

		StudentScore data2 = new StudentScore();
		data2.id = "000221";
		data2.score = 9;

		System.out.println(data1.id + " got " + data1.score + " points.");
		System.out.println(data2.id + " got " + data2.score + " points.");
	}

}
