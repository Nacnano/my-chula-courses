package test;

import static org.junit.Assert.*;
import logic.UnitItem;

import org.junit.Test;

public class UnitItemTest {

	@Test
	public void testCost() {
		//fail("Not yet implemented");
		
		UnitItem item = new UnitItem("Apple",2.0,3);
		assertEquals(6.00, item.cost(),0.01);
	}
	
	
	public void testToString() {
		//fail("Not yet implemented");
	}

}
