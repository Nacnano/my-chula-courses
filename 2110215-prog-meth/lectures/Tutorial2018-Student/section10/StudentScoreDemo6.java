
public class StudentScoreDemo6 {

	public static void main(String[] args) {
		StudentScore2 data1 = new StudentScore2("000121",10);
		StudentScore2 data2 = new StudentScore2("000221",9);
		
		data1.penalizeByPercent(50);
		data2.receiveBonus(2);
		
		System.out.println(data1+" Vs."+data2);
		if(data1.hasHigherScoreThan(data2)){
			System.out.println(
				data1.getId()+" gets more than "+data2.getId()
			);
		}else{
			System.out.println(
				data1.getId()+" does not get more than "+data2.getId()
			);
		}
	}

}
