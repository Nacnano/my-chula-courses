public class MultiDimArrayPeople1 {
	public static void main(String[] args) {
		String[][] people = { { "Ann", "Betty" },
				{ "Celine", "David", "Ella" }, { "Finn", "George" } };
		System.out.println(people[0][0]);
		System.out.println(people[1][2]);
		System.out.println(people[2].length);
		System.out.println(people.length);
	}
}
