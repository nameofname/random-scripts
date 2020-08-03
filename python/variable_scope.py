cache = None

print('ronaldy 0', cache)

def change_var():
    global cache
    cache = 'ronaldy'
    return cache

change_var()

print('ronaldy 1', cache)