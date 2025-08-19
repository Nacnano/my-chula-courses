import hashlib
import itertools

from tqdm import tqdm

MATCH_HASH = "d54cc1fe76f5186380a0939d2fc1723c44e8a5f7"
WORDLIST_FILE = "10k-most-common.txt"

SUBSTITUTIONS = {
    "o": ["0"],
    "l": ["1"],
    "i": ["1", "!"],
    "a": ["4"],
    "e": ["3"],
    "s": ["5"],
    "t": ["7"],
}


def generate_variants(word: str):
    """
    Given a word, yield variants with substitutions and case changes.
    """
    chars_options: list[list[str]] = []

    for ch in word:
        if ch.isalpha():
            chars_options.append([ch.lower(), ch.upper()])
        else:
            chars_options.append([ch])

        if ch in SUBSTITUTIONS:
            chars_options[-1].extend(SUBSTITUTIONS[ch])

    # Cartesian product to generate all possible variants
    for combo in itertools.product(*chars_options):
        yield "".join(combo)


def check_match(password: str, target_hash: str):
    if hashlib.sha1(password.encode()).hexdigest() == target_hash:
        print(f"password found: {password}")
        exit(0)


def main():
    with open(WORDLIST_FILE, "r") as f:
        passwords = [line.strip() for line in f]

    # for variant in generate_variants("Chulalongkorn"):
    #     print(variant)

    for word in tqdm(passwords, desc="Trying words"):
        for variant in generate_variants(word):
            check_match(variant, MATCH_HASH)


if __name__ == "__main__":
    main()