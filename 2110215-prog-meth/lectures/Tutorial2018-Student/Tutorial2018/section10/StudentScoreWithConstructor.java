public class StudentScoreWithConstructor {
	private String id;
	private int score;

	// constructors
	public StudentScoreWithConstructor() {
		setId("000000");
		setScore(0);
	}

	public StudentScoreWithConstructor(String id, int score) {
		setId(id);
		setScore(score);
	}

	public StudentScoreWithConstructor(StudentScoreWithConstructor s) {
		setId(s.getId());
		setScore(s.getScore());
	}

	// getters & setters
	public String getId() {
		return id;
	}

	public int getScore() {
		return score;
	}

	public void setId(String id) {
		this.id = id;
	}

	public void setScore(int score) {
		this.score = score;
	}

	// to string
	public String toString() {
		return "(ID:" + getId() + ", score:" + getScore() + ")";
	}

}
