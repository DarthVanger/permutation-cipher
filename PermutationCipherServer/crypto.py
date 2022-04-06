# Do permutation encrypt as follows:
# 1. Convert letters to numbers in alphabet (see https://stackoverflow.com/a/4528997/1657101)
# 2. Substitute each letter with a letter from @param key, mapping by letter number in alphabet
def permutation_encrypt(input, key):
    # Letter numbers in alphabet: "A" -> 0, "Z" -> 25.
    input_letter_numbers = [ord(char) - 96 - 1 for char in input.lower()]

    encrypted = ''.join([key[letter_num] for letter_num in input_letter_numbers])
    return encrypted
