package utils;

import java.net.URL;

import javafx.scene.media.AudioClip;
import javafx.scene.media.Media;
import javafx.scene.media.MediaPlayer;
import javafx.util.Duration;
import scene.GameScene;
import scene.LandingScene;

/**
 * The GameAudioUtils class is the class that provide the {@link MediaPlayer}
 * for audio and update volume method.
 */
public class AudioUtils {

	/**
	 * The {@link GameScene} background music.
	 */
	private static MediaPlayer gameSceneBGM;

	/**
	 * The {@link LandingScene} background music.
	 */
	private static MediaPlayer landingSceneBGM;

	/**
	 * The training unit sound effect.
	 */
	private static AudioClip trainingSFX;

	/**
	 * The building sound effect.
	 */
	private static AudioClip buildingSFX;
	
	/**
	 * The building destroyed sound effect.
	 */
	private static AudioClip destroyingSFX;


	/**
	 * The attack sound effect.
	 */
	private static AudioClip attackingSFX;
	
	/**
	 * The dying sound effect.
	 */
	private static AudioClip dyingSFX;

	/**
	 * Load music audio.
	 */
	static {
		gameSceneBGM = loadAudioLoop("bgm/BGMDungeon.mp3");
		landingSceneBGM = loadAudioLoop("bgm/BGMMainScene.mp3");
		trainingSFX = loadSFX("sfx/open_inventory.mp3");
		buildingSFX = loadSFX("sfx/close_inventory.mp3");
		destroyingSFX = loadSFX("sfx/destroy.mp3");
		attackingSFX = loadSFX("sfx/attack.mp3");
		dyingSFX = loadSFX("sfx/death.mp3");

		updateBGMVolume();
		updateEffectVolume();
	}

	/**
	 * Load audio by file path and make it loop when play.
	 * 
	 * @param filePath the path of audio file
	 * @return {@link MediaPlayer} instance
	 */
	private static MediaPlayer loadAudioLoop(String filePath) {
		URL resource = ClassLoader.getSystemResource(filePath);
		MediaPlayer player = new MediaPlayer(new Media(resource.toString()));

		player.setOnEndOfMedia(new Runnable() {

			@Override
			public void run() {
				player.seek(Duration.ZERO);
			}
		});

		return player;
	}

	/**
	 * Load sound effect by file path.
	 * 
	 * @param filePath the path of audio file
	 * @return {@link AudioClip} instance
	 */
	private static AudioClip loadSFX(String filePath) {
		URL resource = ClassLoader.getSystemResource(filePath);
		AudioClip player = new AudioClip(resource.toExternalForm());

		return player;
	}

	/**
	 * Update all background music volume to current setting.
	 */
	public static void updateBGMVolume() {
		gameSceneBGM.setVolume(GameConfig.bgmVolume);
		landingSceneBGM.setVolume(GameConfig.bgmVolume);
	}

	/**
	 * Update all effect volume to current setting.
	 */
	public static void updateEffectVolume() {
		trainingSFX.setVolume(GameConfig.effectVolume);
		buildingSFX.setVolume(GameConfig.effectVolume);
		destroyingSFX.setVolume(GameConfig.effectVolume);
		attackingSFX.setVolume(GameConfig.effectVolume);
		dyingSFX.setVolume(GameConfig.effectVolume);
	}

	/**
	 * Getter for {@link #gameSceneBGM}.
	 * 
	 * @return {@link #gameSceneBGM}
	 */
	public static MediaPlayer getGameSceneBGM() {
		return gameSceneBGM;
	}

	/**
	 * Setter for {@link #gameSceneBGM}.
	 * 
	 * @param gameSceneBGM new instance of {@link #gameSceneBGM}
	 */
	public static void setGameSceneBGM(MediaPlayer gameSceneBGM) {
		AudioUtils.gameSceneBGM = gameSceneBGM;
	}

	/**
	 * Getter for {@link #landingSceneBGM}.
	 * 
	 * @return {@link #landingSceneBGM}
	 */
	public static MediaPlayer getLandingSceneBGM() {
		return landingSceneBGM;
	}

	/**
	 * Setter for {@link #landingSceneBGM}.
	 * 
	 * @param landingSceneBGM new instance of {@link #landingSceneBGM}
	 */
	public static void setLandingSceneBGM(MediaPlayer landingSceneBGM) {
		AudioUtils.landingSceneBGM = landingSceneBGM;
	}

	/**
	 * Getter for {@link #trainingSFX}.
	 * 
	 * @return {@link #trainingSFX}
	 */
	public static AudioClip getTrainingSFX() {
		return trainingSFX;
	}

	/**
	 * Setter for {@link #trainingSFX}.
	 * 
	 * @param trainingSFX the new {@link #traningSFX}
	 */
	public static void settrainingSFX(AudioClip trainingSFX) {
		AudioUtils.trainingSFX = trainingSFX;
	}
	
	/**
	 * Getter for {@link #buildingSFX}.
	 * 
	 * @return {@link #buildingSFX}
	 */
	public static AudioClip getBuidingSFX() {
		return buildingSFX;
	}

	/**
	 * Setter for {@link #buildingSFX}.
	 * 
	 * @param buidingSFX the new {@link #buidingSFX}
	 */
	public static void setBuildingSFX(AudioClip buildingSFX) {
		AudioUtils.buildingSFX = buildingSFX;
	}
	
	/**
	 * Getter for {@link #destroyingSFX}.
	 * 
	 * @return {@link #destroyingSFX}
	 */
	public static AudioClip getDestroyingSFX() {
		return destroyingSFX;
	}

	/**
	 * Setter for {@link #destroyingSFX}.
	 * 
	 * @param dsetroyingSFX the new {@link #destroyingSFX}
	 */
	public static void setDestroyingSFX(AudioClip destroyingSFX) {
		AudioUtils.destroyingSFX = destroyingSFX;
	}

	/**
	 * Getter for {@link #attackingSFX}.
	 * 
	 * @return {@link #attackingSFX}
	 */
	public static AudioClip getAttackingSFX() {
		return attackingSFX;
	}

	/**
	 * Setter for {@link #attackingSFX}.
	 * 
	 * @param attackingSFX the new {@link #attackingSFX}
	 */
	public static void setAttackingSFX(AudioClip attackingSFX) {
		AudioUtils.attackingSFX = attackingSFX;
	}
	
	/**
	 * Getter for {@link #dyingSFX}.
	 * 
	 * @return {@link #dyingSFX}
	 */
	public static AudioClip getDyingSFX() {
		return dyingSFX;
	}

	/**
	 * Setter for {@link #destroyingSFX}.
	 * 
	 * @param dsetroyingSFX the new {@link #destroyingSFX}
	 */
	public static void setDyingSFX(AudioClip dyingSFX) {
		AudioUtils.dyingSFX = dyingSFX;
	}
}