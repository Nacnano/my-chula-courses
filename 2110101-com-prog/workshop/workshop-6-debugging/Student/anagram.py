# -*- coding: utf-8 -*-
import os

# This function encodes word into dictionary key


def get_key(string):
    # English alphabet counter
    alphabet_count = [0 for i in range(26)]
    for ch in string.upper():
        # check if ch is a English capital letter
        if(ord('A') <= ord(ch) <= ord('Z')):
            alphabet_count[ord(ch)-ord('A')] += 1
    # convert list of int into string
    return '_'.join([str(ch) for ch in alphabet_count])


# This function finds anagram of a given target word
def find_anagram(x):
    global words
    # get key of input x
    key = get_key(x.strip())
    # return all possible anagram of x
    if key in words:
        return words[key]
    return []


if __name__ == '__main__':
    """
      This program was designed to find anagrams of a given input word
        by using an anagram database (stored as python's dictionary.
      A dictionary takes number of each characters in a word and returns all possible anagrams
        key: nA_nB_nC_nD_..._nZ represent amount of A,B,C,...,Z
        value: list of words
      For example, key of "PIE" is 0_0_0_0_1_0_0_0_1_0_0_0_0_0_0_1_0_0_0_0_0_0_0_0_0_0
        And our dictionary would contain all of anagram words correspoding to "PIE". ['EPI', 'IPE', 'PEI', 'PIE']
    """

    # use defaultdict as a database
    words = dict()
    dir_path = os.path.dirname(os.path.abspath(__file__))
    # get English vocabulary from text file
    with open(os.path.join(dir_path, 'words-prep.txt')) as f:
        print("Creating dictionary...")
        for word in f.readlines():
            # add word into the database
            key = get_key(word.strip())
            if(key not in words):
                words[key] = []
            words[key].append(word.strip().upper())

    print('INPUT WORD: ', end='')
    inp = input()
    print(find_anagram(inp))
