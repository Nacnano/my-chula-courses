package utils;

import java.util.Map;

import controller.GameController;
import game.Camera;
import game.GameLogic;
import entity.building.BaseBuilding;
import entity.unit.BaseUnit;
import javafx.application.Platform;
import game.Position;
import game.MapRenderer;

/**
 * The AnimationUtil class provides methods about animation.
 *
 */
public class AnimationUtil {

	/**
	 * A constant holding duration of attack animation in millisecond.
	 */
	private static final int ATTACK_ANIMATION_DURATION_MS = 300;

	/**
	 * A constant holding duration of move animation frame in millisecond.
	 */
	private static final int FRAME_DURATION_MS = 20;

	/**
	 * A constant holding max frame number.
	 */
	private static final int MAX_FRAME_NUMBER = 3;

	/**
	 * A constant holding amount of frame change per loop.
	 */
	private static final int FRAME_CHANGE_PER_LOOP = 2;

	/**
	 * Plays attack and move animation and return animation thread.
	 * 
	 * @param step The amount of center position change per frame (in pixel)
	 * @return Animation thread
	 */
	public static Thread playAnimation(int step) {
		Camera camera = GameController.getCamera();
		final int cameraStepX = camera.getDirection().getColumn();
		final int cameraStepY = camera.getDirection().getRow();

		Map<BaseUnit, Position> ourUnits = GameLogic.getOurUnits();
		Map<BaseUnit, Position> enemyUnits = GameLogic.getEnemyUnits();
		
		// TODO: Maybe call from GameLogic and do the same to building as well
		Map<Position, BaseBuilding> buildings = GameLogic.getBuildings();
			
			
		Thread animation = new Thread(() -> {
			// Checks if any entity move or attacked
			boolean isAttacked = false;
			boolean isMoved = camera.isMoving();
			
			for (Map.Entry<BaseUnit, Position> unit : ourUnits.entrySet()) {
				isAttacked |= unit.getKey().isAttacked();
			}
			for (Map.Entry<BaseUnit, Position> unit : enemyUnits.entrySet()) {
				isAttacked |= unit.getKey().isAttacked();
			}
			
//			isMove &= !GameConfig.isSkipMoveAnimation();
			if (isAttacked) {
				Platform.runLater(() -> {
					MapRenderer.render();
				});
			}

						
			// Plays move and attack animation
			Thread attackAnimation = null;
			Thread moveAnimation = null;
			if (isMoved) {
				moveAnimation = cameraMoveAnimation(cameraStepY, cameraStepX);
			}
			
			try {
				if (isAttacked) {
					attackAnimation = playAttackAnimation();
				}
				if (moveAnimation != null) {
					moveAnimation.join();
				}
				if (attackAnimation != null) {
					attackAnimation.join();
				}

			} catch (InterruptedException e) {
				System.out.println("animation interrupted");
			}

			boolean finalIsAttacked = isAttacked;
			Platform.runLater(() -> {
				for (Map.Entry<BaseUnit, Position> unit : ourUnits.entrySet()) {
					unit.getKey().setAttacked(false);
				}
				for (Map.Entry<BaseUnit, Position> unit : ourUnits.entrySet()) {
					unit.getKey().setAttacked(false);
				}
				camera.setMoving(false);
				camera.setDirection(new Position(0, 0));

				if (step == 0 || !GameConfig.isSkipMoveAnimation() || finalIsAttacked) {
					MapRenderer.render();
				}
			});
		});
		animation.start();
		return animation;
	}

	/**
	 * Plays attack animation and return animation thread.
	 * 
	 * @return Attack animation thread
	 */
	public static Thread playAttackAnimation() {
		Thread attackAnimation = new Thread(() -> {
			try {
				AudioUtil.getAttackingSFX().play();
				Thread.sleep(ATTACK_ANIMATION_DURATION_MS);
			} catch (InterruptedException e) {
				System.out.println("Attack animation interrupted");
			}
		});

		attackAnimation.start();
		return attackAnimation;
	}

	/**
	 * Plays move animation and return animation thread.
	 * 
	 * @param stepY The amount of center position change per frame in Y-axis (in
	 *              pixel)
	 * @param stepX The amount of center position change per frame in X-axis (in
	 *              pixel)
	 * @return Move animation thread
	 */
	public static Thread cameraMoveAnimation(int stepY, int stepX) {
		Thread cameraMoveAnimation = new Thread(() -> {
			Camera camera = GameController.getCamera();
			int newSpriteSize = GameConfig.SPRITE_SIZE * GameConfig.getScale();
			int centerY = camera.getPosition().getRow() * newSpriteSize + newSpriteSize / 2;
			int centerX = camera.getPosition().getColumn() * newSpriteSize + newSpriteSize / 2;

			for (int frame = MAX_FRAME_NUMBER; frame >= 0; frame -= FRAME_CHANGE_PER_LOOP) {
				try {
					final int nowI = centerY + frame * stepY;
					final int nowJ = centerX + frame * stepX;
					final int nowCnt = frame;
					Platform.runLater(() -> {
						MapRenderer.render(nowI, nowJ, nowCnt);
					});
					Thread.sleep(FRAME_DURATION_MS);
				} catch (InterruptedException e) {
					System.out.println("Move animation interrupted");
				}
			}

		});
		
		cameraMoveAnimation.start();
		return cameraMoveAnimation;
	}

}