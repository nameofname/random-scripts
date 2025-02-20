# Shows that variables in python are not passed by reference
def test_var(a,b):
    a = 'ronald'
    b = 'rondo'
    return a, b

a = 'danielle'
b = 'dani'
[bob, la] = test_var(a, b)
print('hey hey hey ', a, b)
print('hey ho hey ho ', bob, la)