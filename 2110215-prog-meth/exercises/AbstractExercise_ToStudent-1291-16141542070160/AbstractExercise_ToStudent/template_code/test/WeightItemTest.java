package test;

import static org.junit.Assert.*;
import logic.WeightItem;

import org.junit.Test;

public class WeightItemTest {

	@Test
	public void testCost() {
		//fail("Not yet implemented");
		
		WeightItem item = new WeightItem("Soup", 5.25);
		item.setWeight(3.00);
		assertEquals(15.75,item.cost(),0.01);
	}

	@Test
	public void testScale() {
		//fail("Not yet implemented");
		
		WeightItem item = new WeightItem("Soup", 5.25);
		double weight;
		for (int i = 0 ; i < 10000; i++)
		{
			weight = item.scale();
			assertTrue(weight >= 0.01 && weight <= 4);
		}
	}

	
	public void testToString() {
		//fail("Not yet implemented");
	}

}
