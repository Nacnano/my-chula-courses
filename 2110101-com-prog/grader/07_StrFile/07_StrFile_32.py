def no_lowercase(t):
    for c in t:
        if c.islower():
            return False
    return True


def no_uppercase(t):
    for c in t:
        if c.isupper():
            return False
    return True


def no_number(t):
    for c in t:
        if c.isdigit():
            return False
    return True


def no_symbol(t):
    for c in t:
        if not (c.isdigit() or c.isalpha()):
            return False
    return True


def character_repetition(t):
    t = t.lower()
    for i in range(len(t)-3):
        for j in range(1, 4):
            if t[i+j] != t[i]:
                break
            if j == 3:
                return True
    return False


def number_sequence(t):
    check = '0123456789012'
    for i in range(len(t)-3):
        if t[i:i+4] in check or t[i+3:i:-1] in check:
            return True
    return False


def letter_sequence(t):
    check = 'abcdefghijklmnopqrstuvwxyzabc'
    t = t.lower()
    for i in range(len(t)-3):
        if t[i:i+4] in check or t[i+3:i:-1] in check:
            return True
    return False


def keyboard_pattern(t):
    checks = ['!@#$%^&*()_+', 'qwertyuiop', 'asdfghjkl', 'zxcvbnm']
    t = t.lower()
    for i in range(len(t)-3):
        for check in checks:
            if t[i:i+4] in check or t[i+3:i:-1] in check:
                return True
    return False


# -----------------------------
passw = input().strip()
errors = []
if len(passw) < 8:
    errors.append("Less than 8 characters")
if no_lowercase(passw):
    errors.append("No lowercase letters")
if no_uppercase(passw):
    errors.append("No uppercase letters")
if no_number(passw):
    errors.append("No numbers")
if no_symbol(passw):
    errors.append("No symbols")
if character_repetition(passw):
    errors.append("Character repetition")
if number_sequence(passw):
    errors.append("Number sequence")
if letter_sequence(passw):
    errors.append("Letter sequence")
if keyboard_pattern(passw):
    errors.append("Keyboard pattern")

if len(errors) == 0:
    print("OK")
else:
    for error in errors:
        print(error)
