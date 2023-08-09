package gui;

import entity.building.BaseBuilding;
import entity.unit.BaseUnit;
import game.Terrain;
import javafx.scene.control.Tooltip;
import javafx.scene.layout.StackPane;
import javafx.scene.text.Font;
import logic.GameController;


public class BoardCell extends StackPane {

    private BaseBuilding building;
    private BaseUnit unit;
    private final int row;
    private final int col;
    private final Terrain terrain;
    private CellImage hoverImage;

    private Tooltip upgradeTooltip;

    public BoardCell(int bgSprite, int row, int col, Terrain terrain) {
        this.setPrefWidth(48);
        this.setPrefHeight(48);

        this.row = row;
        this.col = col;

        addImage(bgSprite);
        setupTooltip();

        if (buildable) {
            hoverImage = addImage(new CellImage("images/hoverImage.png"));
            hoverImage.setMouseTransparent(true);
            hoverImage.setVisible(false);

            this.setOnMouseEntered(mouseEvent -> hoverImage.setVisible(true));

            this.setOnMouseMoved(mouseEvent -> {
                TowerCell selectedTower = GameController.getSelectedTower();
                if (selectedTower != null && selectedTower.isUpgradeTool() && tower != null && tower.getLevel() == 1)
                    upgradeTooltip.show(this, mouseEvent.getScreenX() + 10, mouseEvent.getScreenY() + 10);
            });

            this.setOnMouseExited(mouseEvent -> {
                hoverImage.setVisible(false);
                upgradeTooltip.hide();
            });

            this.setOnMouseClicked(mouseEvent -> {
                try {
                	if (GameController.canBuy(GameController.getSelectedTower())) {
                        this.setTower(GameController.generateSelectedTower(this));
                    }
                } catch (InvalidTowerException e) {
                    e.printStackTrace();
                }
            });
        }
    }

    /**
     * Sets up the {@link #upgradeTooltip}.
     */
    public void setupTooltip() {
        upgradeTooltip = new Tooltip();
        upgradeTooltip.setFont(new Font(12));

    }

    /**
     * Sets the text of {@link #upgradeTooltip} based on the type of {@link #tower}.
     */
    public void setTooltipText() {
        TowerData upgradedTower;
        switch (tower.getClass().getName()) {
            case "entity.tower.MachineGunTower" :
                upgradedTower = Database.MG[1];
                break;
            case "entity.tower.RocketTower" :
                upgradedTower = Database.Rocket[1];
                break;
            case "entity.tower.CannonTower" :
                upgradedTower = Database.Cannon[1];
                break;
            default:
                throw new RuntimeException("Current tower name is correct.");
        }
        upgradeTooltip.setText(
                String.format("Upgrade to %s\n", upgradedTower.name) +
                String.format("Damage: %d\n", (int)upgradedTower.damage) +
                String.format("Rates: %.1f shots/sec\n", upgradedTower.rate) +
                String.format("Range: %d\n", (int)upgradedTower.range) +
                String.format("Cost: %d\n", upgradedTower.cost)
        );
    }

    /**
     * Adds the given {@link CellImage} to the cell.
     * @param cellImage The {@link CellImage} to be added.
     * @return The given {@link CellImage}.
     */
    public CellImage addImage(CellImage cellImage) {
        this.getChildren().add(cellImage);
        return cellImage;
    }

    /**
     * Removes the current {@link Tower} bound to the cell.
     */
    public void removeTower() {
    	this.setOnMouseClicked(mouseEvent -> {
    		if (GameController.canBuy(GameController.getSelectedBuilding())) {
    			this.setTower(GameController.generateSelectedBuilding(this));
    			}
        });

        GameController.removeBuilding(building);
        GUIController.getGamePane().getChildren().remove(building);
    }

    /**
     * Sets the {@link Tower} of the cell.
     * @param newTower The {@link Tower} to be set on the cell.
     */
    public void setTower(Tower newTower) {
        if (building != null) {
            removeTower();
        }

        building  = newTower;

        this.setOnMouseClicked(mouseEvent -> {
            System.out.println();
            if (GameController.getSelectedTower().isSellTool()) {
                GameController.addGold(tower.getCost()/2);
                removeTower();
            } else if (GameController.getSelectedTower().isUpgradeTool() && tower.getLevel() == 1) {
                if (GameController.canBuy(tower, 2)) {
                    switch (tower.getClass().getName()) {
                        case "entity.tower.MachineGunTower" :
                            setTower(new MachineGunTower(this, 2));
                            break;
                        case "entity.tower.RocketTower" :
                            setTower(new RocketTower(this, 2));
                            break;
                        case "entity.tower.CannonTower" :
                            setTower(new CannonTower(this, 2));
                            break;
                    }
                    upgradeTooltip.hide();
                }
            }
        });

        setTooltipText();

        GUIController.getGamePane().getChildren().add(building);
    }
    
    public int getRow() {
        return row;
    }

    public int getCol() {
        return col;
    }

    public BaseBuilding getBuilding() {
        return building;
    }
    
    public BaseUnit getUnit() {
    	return unit;
    }
}