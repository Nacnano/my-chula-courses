package utils;

import javafx.animation.FadeTransition;
import javafx.animation.Transition;
import javafx.scene.Node;
import javafx.util.Duration;

/**
 * The utility class that provide about initialize the {@link Transition}
 * instance.
 */
public class TransitionUtil {

	/**
	 * The utility method that initialize new {@link FadeTransition} for node.
	 * 
	 * @param node the {@link Node} which used in transition
	 * @param from the beginning opacity of node
	 * @param to   the ending opacity of node
	 * @return new {@link FadeTransition} of node
	 */
	public static FadeTransition makeFadingNode(Node node, double from, double to) {
		FadeTransition fade = new FadeTransition(Duration.seconds(1.0), node);

		fade.setFromValue(from);
		fade.setToValue(to);

		return fade;
	}
}