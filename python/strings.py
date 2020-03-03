# STRINGS ! 
from urllib import parse
# String replacement 

string = "{0} went to the {1}".format('ronald', 'ronald... place')
print(string)
string = "{0} more than {1} ?".format(1, 2)
print(string)

# access arguments by name
string = "my numbers are: {first_num} and {second_num}".format(first_num = 100, second_num = 200)
print(string)
this_variable_is_outside = 'ronald'
string = f"what does it say? {this_variable_is_outside}" # look ma, no format! (uses f"")
print(string)

# creating fillers for strings with <, >, ^: 
string = "{0:<30}".format('word') # left aligned
print(string)
string = "{0:>30}".format('word') # right aligned
print(string)
string = "{0:^30}".format('word') # centered
print(string)
string = "{0:*<30}".format('word') # use character for filler
print(string)

# show quotes or not : 
string = "shall i show quotes? {0!r}".format('word') # show the quotes
print(string)
string = "shall i show quotes? {0!s}".format('word') # dont'
print(string)
string = "shall i show quotes? {!s}".format('word') # note you don't need the numeric arg
print(string)


# lots of tricks with numbers
# remember, 0 is the 0th argument to the template string.
string = "my number: {0:f}".format(1.3) # goes to 6 decimals by default
print(string)
string = "my number: {0:.1f}".format(1.32424) # 1 deciaml
print(string)
string = "my number: {0:.1}".format(1.32424) # weird number format i don't understand
print(string)
string = "sign? always: {0:+f}, {1:+f}, minus only: {0:-f}, {1:-f}, space for + {0: f}, {1: f}".format(1.5, -1.5) # showing a sign or not
print(string)
string = "sign? {0:+d}".format(5)
print(string)
string = "sign? {0:+f}".format(1.5)
print(string)
string = "padded ints? {0:03d}".format(5) # three zeros
print(string)
string = "padded ints? {0:010d}".format(5) # ten zeros !
print(string)
string = "the base? int: {0:d}, hex: : {0:x}, oct: : {0:o}, binary : {0:b}".format(42) # all different types! 
print(string)
string = "separate thousands with coma: {:,}".format(42439872037934) # co 
print(string)
string = "round it, and drop some zeros: {0:.2n}, same : {0:.2g}".format(3.60002) # n = number, g = general
print(string)

s = """look ron
no
hands ron!"""
print(s.splitlines())
s = 'ronald'
print(s.lower(), s.upper(), s.count('ron'))

# dealing with a query string : 
query = 'user=pilgrim&database=master&password=PapayaWhip'
a_list = query.split('&')
print([v.split('=') for v in a_list])
print({v.split('=')[0]:v.split('=')[1] for v in a_list}) #  too verbose, not efficient
print(dict(
    [v.split('=') for v in a_list]
))
# improvements, only split once and ignore keys with no values 
a_list = 'user=pilgrim&database=master&password=PapayaWhip==&gum'.split('&')
print(dict(
    [v.split('=', 1) for v in a_list if '=' in v]
))
# or do it the right way : 
print(parse.parse_qs(query))

# now it's time for sliiiicccceeeeessss! slice! slice! slice! slice! 
s = 'ronald, a string pertaining to ronalds herein'
print(s[0:5]) # up to and not including 5
print(s[:-4]) # 0 is implied for 1st arg, negative args accepted