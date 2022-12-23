def match(word, pattern, include_chars, exclude_chars):
    dict_word = {}
    if len(word) != len(pattern):
        return False
    for i in range(len(word)):
        if pattern[i] == '?':
            if word[i] in exclude_chars:
                return False
            if word[i] in dict_word:
                dict_word[word[i]] += 1
            else:
                dict_word[word[i]] = 1
        elif pattern[i] != word[i]:
            return False

    for c in include_chars:
        if c not in dict_word:
            return False
        if dict_word[c] == 0:
            return False
        dict_word[c] -= 1
    return True


exec(input())
