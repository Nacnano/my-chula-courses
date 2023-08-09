package game;

import java.util.ArrayList;
import java.util.PriorityQueue;

import controller.GameController;
import entity.unit.BaseUnit;
import entity.building.BaseBuilding;
import javafx.scene.canvas.GraphicsContext;
import javafx.scene.layout.AnchorPane;
import javafx.scene.paint.Color;
import javafx.util.Pair;
import scene.GameScene;
import utils.DrawUtil;
import utils.GameConfig;

/**
 * The MapRenderer class is used to render {@link GameMap}.
 *
 */
public class MapRenderer {

	/**
	 * The Renderable interface allows an object to be rendered. This interface
	 * should be implemented to pass render function as a parameter.
	 * 
	 */
	private static interface Renderable {

		/**
		 * Render an object by calling {@link DrawUtil}.
		 */
		public void render();
	}

	/**
	 * A class to represents position, priority, and method for rendering. This
	 * class is used for map rendering only.
	 *
	 */
	private static class Node implements Comparable<Node> {

		/**
		 * Cell index of this Node in the X-axis.
		 */
		public int x;

		/**
		 * Cell index of this Node in the Y-axis.
		 */
		public int y;

		/**
		 * Priority of this Node.
		 */
		public int priority;

		/**
		 * Object that contains render method.
		 */
		public Renderable obj;

		/**
		 * Creates new node.
		 * 
		 * @param y        Cell index of this Node in the Y-axis.
		 * @param x        Cell index of this Node in the X-axis.
		 * @param priority Priority of this Node.
		 * @param obj      Object that contains render method.
		 */
		public Node(int y, int x, int priority, Renderable obj) {
			this.obj = obj;
			this.y = y;
			this.x = x;
			this.priority = priority;
		}

		@Override
		public int compareTo(Node node) {
			if (this.priority == node.priority) {
				if (this.y == node.y) {
					if (this.x < node.x) {
						return -1;
					}
					return 1;
				}
				if (this.y < node.y) {
					return -1;
				}
				return 1;
			}
			if (this.priority < node.priority) {
				return -1;
			}
			return 1;
		}
	}

	/**
	 * Renders this level by having the player at the center of the screen.
	 */
	public static void render() {
		int newSpriteSize = GameConfig.SPRITE_SIZE * GameConfig.getScale();
		Position cameraPos = GameController.getCamera().getPosition();
		int centerY = cameraPos.getRow() * newSpriteSize
				+ GameConfig.SPRITE_SIZE * GameConfig.getScale() / 2;
		int centerX = cameraPos.getColumn() * newSpriteSize
				+ GameConfig.SPRITE_SIZE * GameConfig.getScale() / 2;
		render(centerY, centerX, 0);
	}

	/**
	 * Renders this level by having the specified position at the center of the
	 * screen.
	 * 
	 * @param centerY Center position in Y-axis
	 * @param centerX Center position in X-axis
	 * @param frame   Current animation frame
	 */
	public static void render(int centerY, int centerX, int frame) {
		GraphicsContext gc = GameScene.getGraphicsContext();
		AnchorPane buttonPane = GameScene.getButtonPane();
		buttonPane.getChildren().clear();
		gc.setFill(Color.rgb(0, 0, 0));
		gc.fillRect(0, 0, GameConfig.getScreenWidth(), GameConfig.getScreenHeight());

		int newSpriteSize = GameConfig.SPRITE_SIZE * GameConfig.getScale();

		int startY = centerY - GameConfig.getScreenHeight() / 2;
		int startX = centerX - GameConfig.getScreenWidth() / 2;

		int maxCellY = GameConfig.getScreenHeight() / (newSpriteSize);
		int maxCellX = GameConfig.getScreenWidth() / (newSpriteSize);

		Position cameraPosition = GameController.getCamera().getPosition();
		
		int startIdxY = Math.max(0, cameraPosition.getRow() - maxCellY / 2 - 1);
		int endIdxY = Math.min(GameConfig.getMapSize(), cameraPosition.getRow() + maxCellY / 2 + 2);

		int startIdxX = Math.max(0, cameraPosition.getColumn() - maxCellX / 2 - 1);
		int endIdxX = Math.min(GameConfig.getMapSize(), cameraPosition.getColumn() + maxCellX / 2 + 1);
		
		ArrayList<Pair<Integer, Integer>> posList = new ArrayList<>();

		for (int i = startIdxY; i < endIdxY; i++) {
			for (int j = startIdxX; j < endIdxX; j++) {
				posList.add(new Pair<Integer, Integer>(i, j));
			}
		}

		PriorityQueue<Node> pq = buildPrioritizedNode(posList, startY, startX, frame);

		while (!pq.isEmpty()) {
			Node node = pq.poll();
			node.obj.render();
		}
	}

	/**
	 * Builds priority queue of nodes to be rendered. Sorted by priority of each
	 * rendering method.
	 * 
	 * @param posList List of cell's position to be rendered
	 * @param startY  Start rendering position in Y-axis
	 * @param startX  Start rendering position in X-axis
	 * @param frame   Current animation frame
	 * @return Priority queue of nodes to be rendered
	 */
	private static PriorityQueue<Node> buildPrioritizedNode(ArrayList<Pair<Integer, Integer>> posList, int startY,
			int startX, int frame) {
		GameMap gameMap = GameController.getGameMap();
		PriorityQueue<Node> pq = new PriorityQueue<Node>();
		int newSpriteSize = GameConfig.SPRITE_SIZE * GameConfig.getScale();

		for (Pair<Integer, Integer> pos : posList) {
			int i = pos.getKey();
			int j = pos.getValue();

			int posY = newSpriteSize * i - startY;
			int posX = newSpriteSize * j - startX;
			Cell thisCell = gameMap.get(i, j);
			int shiftX = 0;
			int shiftY = 0;

//			for animation
//			BaseUnit unit = thisCell.getUnit();
//			if ((unit != null)) {
//				shiftX = -Direction.getMoveX(entity.getDirection(), frame * GameConfig.getScale());
//				shiftY = -Direction.getMoveY(entity.getDirection(), frame * GameConfig.getScale());
//			}

			int finalShiftY = shiftY;
			int finalShiftX = shiftX;

			// Draw Terrain
			pq.add(new Node(posY, posX, 0, () -> {
				DrawUtil.drawTerrain(posY, posX, thisCell);
				GameLogic.getMap().put(thisCell.getPosition(), thisCell.getTerrain());
			}));



			// Draw building which on cell
			if (thisCell.getBuilding() != null) {
				pq.add(new Node(posY, posX, 2, () -> {
//					System.out.println("  Building: " + thisCell.getBuilding().getClass().getSimpleName() + "  Row: " + posY + "  Col: " + posX);
					DrawUtil.drawBuilding(posY, posX, thisCell.getBuilding());
//					DrawUtil.addBuildingButton(posY, posX, thisCell.getBuilding());
				}));
			}

			// Draw unit
			if (thisCell.getUnit() != null) {
				pq.add(new Node(posY, posX, 3, () -> {
					DrawUtil.drawUnit(posY + finalShiftY, posX + finalShiftX, thisCell.getUnit(), frame);
				}));
			}
			// Draw unit HP Bar
			if (thisCell.getUnit() instanceof BaseUnit) {
				pq.add(new Node(posY, posX, 100, () -> {
					DrawUtil.drawUnitPeopleBar(posY + finalShiftY, posX + finalShiftX, thisCell.getUnit());
				}));
			}
			if ((thisCell.getUnit() instanceof BaseUnit) && (frame == 0)) {
				pq.add(new Node(posY, posX, 3, () -> {
					DrawUtil.addUnitButton(posY + finalShiftY, posX + finalShiftX, thisCell.getUnit());
				}));
			}
			
			if (thisCell.getBuilding() != null  && (frame == 0)) {
				pq.add(new Node(posY, posX, 2, () -> {
//					System.out.println("  Building: " + thisCell.getBuilding().getClass().getSimpleName() + "  Row: " + posY + "  Col: " + posX);
//					DrawUtil.drawBuilding(posY, posX, thisCell.getBuilding());
					DrawUtil.addBuildingButton(posY, posX, thisCell.getBuilding());
				}));
			}
			
			if (thisCell.getTerrain() != null && (frame == 0)) {
				
				// Temporary for preventing scene overflow
				if (thisCell.getPosition().getColumn() >= 13) continue;
				if (thisCell.getPosition().getRow() >= 13) continue;
				
				pq.add(new Node(posY, posX, 1, () -> {
					DrawUtil.addTerrainButton(posY, posX, thisCell);
				}));
			}
			
		}

		return pq;
	}

}