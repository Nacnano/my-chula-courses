import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

class TestRowToColumn {

	@Test
	void testRowToColumn01() {
		int[][] a = {{1,2,3},{5,6,7},{9,10,11}};
		int[][] b = RowToColumn.rowToColumn(a);
		assertEquals(1,b[0][0]);
		assertEquals(5,b[0][1]);
		assertEquals(9,b[0][2]);
		assertEquals(2,b[1][0]);
		assertEquals(6,b[1][1]);
		assertEquals(10,b[1][2]);
		assertEquals(3,b[2][0]);
		assertEquals(7,b[2][1]);
		assertEquals(11,b[2][2]);
		
	}
	
	@Test
	void testRowToColumn02() {
		int[][] a = {{1,2,3,4},{5,6,7,8},{9,10,11,12},{13,14,15,16}};
		int[][] b = RowToColumn.rowToColumn(a);
		assertEquals(1,b[0][0]);
		assertEquals(5,b[0][1]);
		assertEquals(9,b[0][2]);
		assertEquals(13,b[0][3]);
		assertEquals(2,b[1][0]);
		assertEquals(6,b[1][1]);
		assertEquals(10,b[1][2]);
		assertEquals(14,b[1][3]);
		assertEquals(3,b[2][0]);
		assertEquals(7,b[2][1]);
		assertEquals(11,b[2][2]);
		assertEquals(15,b[2][3]);
		assertEquals(4,b[3][0]);
		assertEquals(8,b[3][1]);
		assertEquals(12,b[3][2]);
		assertEquals(16,b[3][3]);
	}


}
