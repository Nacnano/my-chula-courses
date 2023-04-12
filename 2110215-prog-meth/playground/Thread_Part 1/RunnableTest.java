class MyRunnable implements Runnable {
	public void run() {
		for (int i = 0; i < 100; ++i)
			System.out.print(Thread.currentThread().getName());
	}
}

public class RunnableTest {
	public static void main(String[] args) {
		Runnable r = new MyRunnable();
		new Thread(r, "A").start();
		new Thread(r, "B").start();
	}
}
