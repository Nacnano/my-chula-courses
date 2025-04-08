from bs4 import BeautifulSoup
from typing import List, Optional
from datetime import datetime

# Constants
THAI_TO_ENGLISH_MONTHS = {
    "มกราคม": "Jan", "กุมภาพันธ์": "Feb", "มีนาคม": "Mar", "เมษายน": "Apr",
    "พฤษภาคม": "May", "มิถุนายน": "Jun", "กรกฎาคม": "Jul", "สิงหาคม": "Aug",
    "กันยายน": "Sep", "ตุลาคม": "Oct", "พฤศจิกายน": "Nov", "ธันวาคม": "Dec"
}

def get_soup_from_file(file_path: str) -> BeautifulSoup:
    """
    Reads an HTML file and returns a BeautifulSoup object.

    Args:
        file_path (str): Path to the HTML file.

    Returns:
        BeautifulSoup: Parsed HTML content.

    Raises:
        FileNotFoundError: If the file cannot be found.
        IOError: If there's an error reading the file.
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            return BeautifulSoup(file.read(), 'html.parser')
    except FileNotFoundError:
        raise FileNotFoundError(f"HTML file not found: {file_path}")
    except IOError as e:
        raise IOError(f"Error reading HTML file {file_path}: {str(e)}")

def parse_thai_date(date_str: str) -> datetime:
    """
    Parses a Thai date string into a datetime object.

    Args:
        date_str (str): Date string in Thai format (e.g., "วันศุกร์ที่ 6 มกราคม 2566").

    Returns:
        datetime: Parsed date object.

    Raises:
        ValueError: If the date string format is invalid.
    """
    try:
        parts = date_str.split()
        day = int(parts[1].replace('ที่', ''))
        month = THAI_TO_ENGLISH_MONTHS.get(parts[2], parts[2])
        year = int(parts[3]) - 543  # Convert Buddhist Era to Common Era
        return datetime.strptime(f"{day} {month} {year}", "%d %b %Y")
    except (IndexError, ValueError) as e:
        raise ValueError(f"Invalid Thai date format: {date_str} - {str(e)}")

def Q1(file_path: str) -> List[int]:  # DO NOT modify this line
    """
    Counts Buddhist holy days (วันพระ) per weekday for a given year from HTML file.

    Args:
        file_path (str): Path to the HTML file containing Buddhist holy day data.

    Returns:
        List[int]: List of counts of holy days for each weekday (Monday=0 to Sunday=6).

    Note:
        This implementation returns counts per weekday rather than per week as originally specified,
        matching the original code's behavior. For week-by-week counting, additional logic would be needed.
    """
    soup = get_soup_from_file(file_path)
    bud_days = soup.select(".bud-day")
    
    # Initialize counts for each weekday (Monday=0 to Sunday=6)
    weekday_counts = [0] * 7
    
    for bday in bud_days:
        date_elem = bday.select_one(".bud-day-col")
        if date_elem and date_elem.string:
            date = parse_thai_date(date_elem.string)
            weekday_counts[date.weekday()] += 1
    
    return weekday_counts

def Q2(file_path: str) -> Optional[str]:  # DO NOT modify this line
    """
    Finds the date of Visakha Bucha Day (วันวิสาขบูชา) from the HTML file.

    Args:
        file_path (str): Path to the HTML file containing Buddhist holy day data.

    Returns:
        Optional[str]: Date string of Visakha Bucha Day in Thai format, or None if not found.
    """
    soup = get_soup_from_file(file_path)
    visakha_link = soup.select_one("a[title='วันวิสาขบูชา']")
    
    if visakha_link:
        parent_div = visakha_link.find_parent('div', class_='bud-day')
        if parent_div:
            date_elem = parent_div.select_one(".bud-day-col")
            return date_elem.string.strip() if date_elem and date_elem.string else None
    
    return None

exec(input().strip())  # do not delete this line