package logic;

import java.util.ArrayList;
import java.util.List;

import sharedObject.RenderableHolder;

public class GameLogic {
	private List<Entity> gameObjectContainer;
	
	private Tank tank;
	private Mine mine;
	
	public GameLogic(){
		this.gameObjectContainer = new ArrayList<Entity>();
	
		Field field = new Field();
		RenderableHolder.getInstance().add(field);
		tank = new Tank(320,240);
		mine = new Mine(100,100);
		addNewObject(tank);
		addNewObject(mine);
	}
	
	protected void addNewObject(Entity entity){
		gameObjectContainer.add(entity);
		RenderableHolder.getInstance().add(entity);
	}
	
	public void logicUpdate(){
		tank.update();
		if(!mine.isDestroyed() && tank.collideWith(mine)){
			mine.onCollision(tank);
		}
	}
}
