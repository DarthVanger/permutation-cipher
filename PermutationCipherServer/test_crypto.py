import unittest
from crypto import permutation_encrypt

class TestCrypto(unittest.TestCase):

    def test_permutation_encrypt(self):
        key = 'ZYXWVUTSRQPONMLKJIHGFEDCBA'
        self.assertEqual(permutation_encrypt('ABC', key), 'ZYX', 'ABC should be encrypted as ZYX')
        self.assertEqual(permutation_encrypt('DEF', key), 'WVU', 'DEF should be encrypted as WVU')
        self.assertEqual(permutation_encrypt('ACE', key), 'ZXV', 'ACE should be encrypted as ZXV')
        self.assertEqual(permutation_encrypt('XYZ', key), 'CBA', 'XYZ should be encrypted as CBA')
        self.assertEqual(permutation_encrypt('ZYW', key), 'ABD', 'ZYW should be encrypted as ABD')

if __name__ == '__main__':
    unittest.main()
