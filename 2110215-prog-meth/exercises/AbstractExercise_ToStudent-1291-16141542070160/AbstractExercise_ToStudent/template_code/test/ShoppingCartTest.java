package test;

import static org.junit.Assert.*;
import logic.ShoppingCart;
import logic.UnitItem;
import logic.WeightItem;

import org.junit.Test;

public class ShoppingCartTest {

	@Test
	public void testAddItem() {
		//fail("Not yet implemented");
		ShoppingCart cart = new ShoppingCart();
		UnitItem u_item1 = new UnitItem("Apple",2.0,0);
		UnitItem u_item2 = new UnitItem("Orange",-0.01,5);
		UnitItem u_item3 = new UnitItem("Fried Chicken",37,2);
		WeightItem w_item1 = new WeightItem("Soup",0);
		WeightItem w_item2 = new WeightItem("Water", 10.0);
		
		cart.addItem(u_item1);
		assertEquals(0, cart.getItems().size());
		
		cart.addItem(u_item2);
		assertEquals(0, cart.getItems().size());
		
		cart.addItem(w_item1);
		assertEquals(0, cart.getItems().size());
		
		cart.addItem(u_item3);
		assertEquals(1, cart.getItems().size());
		
		cart.addItem(w_item2);
		assertEquals(2, cart.getItems().size());
	}

	@Test
	public void testCheckOut() {
		//fail("Not yet implemented");
		ShoppingCart cart = new ShoppingCart();
		assertEquals(0,cart.checkOut(),0.01);

		UnitItem u_item1 = new UnitItem("Apple",2.0,3);
		WeightItem w_item1 = new WeightItem("Soup",4.00);
		WeightItem w_item2 = new WeightItem("Bean",5.11);
		w_item1.setWeight(1.00);
		w_item2.setWeight(1.00);
		cart.addItem(u_item1);
		cart.addItem(w_item1);
		cart.addItem(w_item2);
		
		assertEquals(15.11,cart.checkOut(),0.01);
	}

	@Test
	public void testIsDiscounted() {
		//fail("Not yet implemented");
		
		ShoppingCart cart = new ShoppingCart();
		cart.setRequiredUnitItems(1);
		cart.setRequiredWeightItems(2);
		
		UnitItem u_item1 = new UnitItem("Apple",2.0,3);
		UnitItem u_item2 = new UnitItem("Orange",4.0,3);
		WeightItem w_item1 = new WeightItem("Soup",3.33);
		WeightItem w_item2 = new WeightItem("Bean",0.66);
		WeightItem w_item3 = new WeightItem("Ice",1);
		
		cart.addItem(u_item1);
		cart.addItem(w_item1);
		
		//If the number of UnitItem and WeightItem isn't equal the specified prerequisite, customer won't get a discount.
		assertEquals(false, cart.isDiscounted());
		
		//If the number of UnitItem and WeightItem is equal the specified prerequisite, customer will get a discount.
		cart.addItem(w_item2);
		assertEquals(true, cart.isDiscounted());
		
		//Even the number of UnitItem is more than the prerequisite, customer will get a discount.
		cart.addItem(u_item2);
		assertEquals(true, cart.isDiscounted());
		
		//Even the number of WeightItem is more than the prerequisite, customer will get a discount.
		cart.addItem(w_item3);
		assertEquals(true, cart.isDiscounted());
	}

}
