package leapyear

import (
	"testing"
)

func TestIsLeapYear(t *testing.T) {
	tests := []struct {
		year     int
		expected bool
	}{
		{2000, true},  // Divisible by 400
		{1900, false}, // Divisible by 100 but not by 400
		{2024, true},  // Divisible by 4 but not by 100
		{2023, false}, // Not divisible by 4
		{-4, false},   // Negative year (invalid case)
	}

	for _, tt := range tests {
		result := IsLeapYear(tt.year)
		if result != tt.expected {
			t.Errorf("IsLeapYear(%d) = %v; want %v", tt.year, result, tt.expected)
		}
	}
}
