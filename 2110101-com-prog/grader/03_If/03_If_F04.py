def is_mobile_number(number):
    if number[0:2] in ['06', '08', '09'] and len(number) == 10:
        return True
    else:
        return False


exec(input())
