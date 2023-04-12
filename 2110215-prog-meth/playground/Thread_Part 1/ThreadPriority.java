public class ThreadPriority {
	public static void main(String[] args) {
		Thread a = new MyThread2("A");
		Thread b = new MyThread2("B");
		a.setPriority(Thread.MAX_PRIORITY);
		a.start();
		b.start();
	}
}

class MyThread2 extends Thread {
	public MyThread2(String n) {
		super(n);
	}

	public void run() {
		for (int i = 0; i < 100; ++i)
			System.out.print(getName());
	}
}