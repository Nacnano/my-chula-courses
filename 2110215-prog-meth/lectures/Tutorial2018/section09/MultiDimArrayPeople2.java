public class MultiDimArrayPeople2 {
	public static void main(String[] args) {
		String[][] people = { { "Ann", "Betty" },
				{ "Celine", "David", "Ella" }, { "Finn", "George" } };
		String[] group1 = { "Aaron", "Barry", "Brian" };
		people[0] = group1;
		System.out.println(people[0][1]);
	}
}
