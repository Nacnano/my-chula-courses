import static org.junit.jupiter.api.Assertions.*;

import java.io.FileNotFoundException;

import org.junit.jupiter.api.Test;

class TestConvert {

	@Test
	void testConvert01() throws FileNotFoundException {
		String[] s1 = { "5", "1", "a", "7", "F" };
		String[] ans = Convert.convert(s1);
		assertEquals("b", ans[0]);
		assertEquals("No match", ans[1]);
		assertEquals("3", ans[2]);
		assertEquals("c", ans[3]);
		assertEquals("No match", ans[4]);

	}

	@Test
	void testConvert02() throws FileNotFoundException {
		String[] s1 = { "c", "e", "11", "2", "9" };
		String[] ans = Convert.convert(s1);
		assertEquals("7", ans[0]);
		assertEquals("11", ans[1]);
		assertEquals("e", ans[2]);
		assertEquals("No match", ans[3]);
		assertEquals("d", ans[4]);

	}

}
