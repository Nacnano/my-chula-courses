import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

class TestCount {

	@Test
	void testCount() {
		char[] c1 = { 'a', 'b', 'd', 'f', 'g', 'g', 'f', 'a', 'd', 'f', 'g', 'f' };

		int countA = CountSolution.count(c1, 'a');
		int countD = CountSolution.count(c1, 'd');
		int countG = CountSolution.count(c1, 'g');
		int countF = CountSolution.count(c1, 'f');

		assertEquals(2, countA);
		assertEquals(2, countD);
		assertEquals(3, countG);
		assertEquals(4, countF);

	}

	@Test
	void testMember() {
		assertFalse(CountSolution.member(1, null));

		int[] c1 = { 1, 2, 3, 4 };
		assertFalse(CountSolution.member(0, c1));
		assertTrue(CountSolution.member(1, c1));
		assertTrue(CountSolution.member(2, c1));
		assertTrue(CountSolution.member(3, c1));
		assertTrue(CountSolution.member(4, c1));

	}
	
	@Test
	void testPalindrome() {
		assertTrue(CountSolution.isPalinDrome(null));
		
		int[] a = {1};
		assertTrue(CountSolution.isPalinDrome(a));
		
		int[] b = {1,2};
		assertFalse(CountSolution.isPalinDrome(b));
		
		int[] c = {2,2};
		assertTrue(CountSolution.isPalinDrome(c));
		
		int[] d = {1,2,3,2,1};
		assertTrue(CountSolution.isPalinDrome(d));
		
		int[] e = {1,2,3,3,2,1};
		assertTrue(CountSolution.isPalinDrome(e));
		
		int[] f = {1,2,3,3,3,1};
		assertFalse(CountSolution.isPalinDrome(f));
		
		int[] g = {1,3,2,2,1};
		assertFalse(CountSolution.isPalinDrome(g));
		
	}

}
