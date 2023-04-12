public class YieldExample {
	public static void main(String[] args) {
		Thread producer = new Producer2();
		Thread consumer = new Consumer2();

		producer.setPriority(Thread.MIN_PRIORITY); // Min Priority
		consumer.setPriority(Thread.MAX_PRIORITY); // Max Priority

		producer.start();
		consumer.start();
	}
}

class Producer2 extends Thread {
	public void run() {
		for (int i = 0; i < 5; i++) {
			System.out.println("I am Producer : Produced Item " + i);
			Thread.yield();
		}
	}
}

class Consumer2 extends Thread {
	public void run() {
		for (int i = 0; i < 5; i++) {
			System.out.println("I am Consumer : Consumed Item " + i);
			Thread.yield();
		}
	}
}