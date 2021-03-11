def my_func(int):
    print('ronald', 'this is my func y\'all', int)

my_func(1)

def takes_callback(callback):
    return callback(2)

takes_callback(my_func)