import numpy as np

# getting fake data sets from numpy
range = np.arange(1, 10)
ones = np.ones([1, 10])
zeros = np.zeros([1, 10])
print(range)
print(ones)
print(zeros)

# single random number
randomized = np.random.randint(1, 10)
# randomized array : 
print(randomized)
# randomized matrix : 
randmatrix = np.array(
    list(
        map(lambda row: np.random.randint(1, 10, len(row)), np.ones([3, 5]))
    )
)
print(randmatrix);
# also works with randomizded floating point numbers
print(np.random.random([1, 10]))

# Broadcasting
# Usually in algebra you have to have 2 matricies of the same size to do operations
# But numpy will automatically expand a single value to the shape of a numpy array 
print(randmatrix * 5)
print(randmatrix * [5])
print(randmatrix * np.array([5]))

