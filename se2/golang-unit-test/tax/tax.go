package tax

import "errors"

func CalculateThaiTax(revenue float64) (float64, error) {
	if revenue < 0 {
		return 0, errors.New("revenue cannot be negative")
	}

	var tax float64
	switch {
	case revenue <= 150000:
		tax = 0
	case revenue <= 300000:
		tax = (revenue - 150000) * 0.05
	case revenue <= 500000:
		tax = (300000-150000)*0.05 + (revenue-300000)*0.10
	case revenue <= 750000:
		tax = (300000-150000)*0.05 + (500000-300000)*0.10 + (revenue-500000)*0.15
	case revenue <= 1000000:
		tax = (300000-150000)*0.05 + (500000-300000)*0.10 + (750000-500000)*0.15 + (revenue-750000)*0.20
	case revenue <= 2000000:
		tax = (300000-150000)*0.05 + (500000-300000)*0.10 + (750000-500000)*0.15 + (1000000-750000)*0.20 + (revenue-1000000)*0.25
	case revenue <= 5000000:
		tax = (300000-150000)*0.05 + (500000-300000)*0.10 + (750000-500000)*0.15 + (1000000-750000)*0.20 + (2000000-1000000)*0.25 + (revenue-2000000)*0.30
	default:
		tax = (300000-150000)*0.05 + (500000-300000)*0.10 + (750000-500000)*0.15 + (1000000-750000)*0.20 + (2000000-1000000)*0.25 + (5000000-2000000)*0.30 + (revenue-5000000)*0.35
	}

	return tax, nil
}