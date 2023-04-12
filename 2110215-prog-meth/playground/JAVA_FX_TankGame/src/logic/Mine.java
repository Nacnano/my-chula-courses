package logic;

import javafx.scene.canvas.GraphicsContext;
import sharedObject.RenderableHolder;

public class Mine extends CollidableEntity{

	public Mine(int x,int y){
		this.x = x;
		this.y = y;
		this.z = -100;
		this.radius = 20;
	}
	
	public void onCollision(Tank tank){
		tank.hitByMine();
		RenderableHolder.explosionSound.play();
		this.destroyed = true;
	}
	
	@Override
	public void draw(GraphicsContext gc) {
		gc.drawImage(RenderableHolder.mineSprite, x-radius, y-radius);
	}

}
