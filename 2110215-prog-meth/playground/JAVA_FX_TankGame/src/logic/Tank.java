package logic;

import input.InputUtility;
import javafx.scene.canvas.GraphicsContext;
import javafx.scene.input.KeyCode;
import javafx.scene.paint.Color;
import javafx.scene.shape.ArcType;

public class Tank extends CollidableEntity {

	private static final int speed = 5;
	private int angle = 0; // angle 0 = EAST

	private boolean flashing = false;
	private int flashCounter = 0;
	private int flashDurationCounter = 0;

	public Tank(double x, double y) {
		this.x = x;
		this.y = y;
		this.radius = 20;
	}

	private void forward() {
		this.x += Math.cos(Math.toRadians(angle)) * speed;
		this.y += Math.sin(Math.toRadians(angle)) * speed;
	}

	private void turn(boolean left) {
		if (left) {
			angle -= 3;
			if (angle < 0)
				angle += 360;
		} else {
			angle += 3;
			if (angle >= 360)
				angle -= 360;
		}
	}

	public void hitByMine() {
		flashing = true;
		flashCounter = 10;
		flashDurationCounter = 10;
	}

	public void update() {
		if (flashing) {
			if (flashCounter == 0) {
				this.visible = true;
				flashing = false;
			} else {
				if (flashDurationCounter > 0) {
					this.visible = flashCounter <= 5;
					flashDurationCounter--;
				} else {
					this.visible = true;
					flashDurationCounter = 10;
					flashCounter--;
				}
			}
		} else {
			this.visible = !InputUtility.getKeyPressed(KeyCode.SHIFT);
		}
		if (InputUtility.getKeyPressed(KeyCode.W)) {
			forward();
		}
		if (InputUtility.getKeyPressed(KeyCode.A)) {
			turn(true);
		} else if (InputUtility.getKeyPressed(KeyCode.D)) {
			turn(false);
		}
		if (InputUtility.isLeftClickTriggered()) {
			this.x = InputUtility.mouseX;
			this.y = InputUtility.mouseY;
		}
	}

	@Override
	public void draw(GraphicsContext gc) {
		gc.setFill(Color.BLUE);
		gc.fillArc(x - radius, y - radius, radius * 2, radius * 2, 0, 360, ArcType.OPEN);
		gc.translate(x, y);
		gc.rotate(angle);
		gc.setFill(Color.YELLOW);

		int gunSize = radius / 5;
		gc.fillRect(0, -gunSize, radius * 3 / 2, gunSize * 2);
		gc.rotate(-angle);
		gc.translate(-x, -y);
	}

}
