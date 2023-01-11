public class StudentScore2 {
	private String id;
	private int score;

	// constructors
	public StudentScore2() {
		setId("000000");
		setScore(0);
	}

	public StudentScore2(String id, int score) {
		setId(id);
		setScore(score);
	}

	public StudentScore2(StudentScore2 s) {
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

	// additional methods
	public void receiveBonus(int bonus) {
		setScore(getScore() + bonus);
	}

	public void penalizeByPercent(double percent) {
		double newScore = (1.0 - percent / 100) * getScore();
		setScore((int) Math.round(newScore));
	}

	public boolean hasHigherScoreThan(StudentScore2 s) {
		return getScore() > s.getScore();
	}

}
