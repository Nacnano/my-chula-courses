public class StudentDemo4 {

	public static void main(String[] args) {
		StudentScoreWithConstructor data1 = new StudentScoreWithConstructor();
		StudentScoreWithConstructor data2 = new StudentScoreWithConstructor("000121", 10);
		StudentScoreWithConstructor data3 = new StudentScoreWithConstructor(data2);
		
		data3.setId("000821");
		System.out.println(data1.getId() + " got " + data1.getScore() + " points.");
		System.out.println(data2.getId() + " got " + data2.getScore() + " points.");
		System.out.println(data3.getId() + " got " + data3.getScore() + " points.");
	}

}
