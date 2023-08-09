package gui;

import javafx.scene.image.Image;
import javafx.scene.image.ImageView;

/**
 * The CellImage represents images with the size of a cell.
 */
public class CellImage extends ImageView {
    /**
     * The constructor for the CellImage class. It creates a new CellImage with the given ImageName.
     * @param imageName The name of the image of the cell.
     */
    public CellImage(String imageName) {
        this.setImage(new Image(imageName));

        this.setFitWidth(48);
        this.setFitHeight(48);
    }

    /**
     * The constructor for the CellImage class. It creates a new blank CellImage.
     */
    public CellImage() {
        this.setFitWidth(48);
        this.setFitHeight(48);
    }

    /**
     * Make the CellImage appear at the center of its position.
     */
    public void setCenter() {
        this.setTranslateX(-24);
        this.setTranslateY(-24);
    }
}