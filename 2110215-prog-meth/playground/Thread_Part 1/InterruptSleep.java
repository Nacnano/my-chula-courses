class Sleep10Thread extends Thread {
	public void run() {
		try {
			System.out.println("Sleep10Thread sleep");
			sleep(10000);
			System.out.println("Sleep10Thread wake up");
		} catch (InterruptedException e) {
			System.out.println("Sleep10Thread interruped");
		}
	}
}

public class InterruptSleep {
	public static void main(String[] args) {
		Sleep10Thread t = new Sleep10Thread();
		t.start();
		try {
			System.out.println("Main sleep");
			Thread.sleep(3000);
			System.out.println("Main wake up");
		} catch (InterruptedException e) {
		}
		t.interrupt();
	}
}
