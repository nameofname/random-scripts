import numpy as np

print('NUMPY')

# A numpy array can be multidimensional,
# but let's just look at a 2d array : 
np.array([[1,2,3], [4,5,6], [7,8,9]])

# getting fake data sets from numpy
range = np.arange(1, 10)
# Ones and zeros take x, y sizes for n-dimensional arrays
ones = np.ones([5, 10])
zeros = np.zeros([5, 10])
print(range)
print(ones)
print(zeros)

# single random number
randomized = np.random.randint(1, 10)
print(randomized)
# randomized array : 
randomized = np.random.randint(low=1, high=10, size=5)
# Same as ...
randomized = np.random.randint(1, 10, 5)
print(randomized)
randmatrix = np.array(
    list(
        map(lambda row: np.random.randint(1, 10, len(row)), np.ones([3, 5]))
    )
)
print(randmatrix);
# Randomizded floating point numbers
# Note the API for random and randint are NOT the same
floatmatrix = np.random.random([3, 5]) # X, Y dimensions for multidimensional array
print(floatmatrix)
# Whereas if you pass a list to randint, it will give you back an array of the same shape,
# using the numbers in the list as the max
print(np.random.randint([1,1,1,1,10,10,10,10]))
# However remember that we can easily get lists of different shapes by multiplying them
[1,2] * 5 # [1, 2, 1, 2, 1, 2, 1, 2, 1, 2]
# So another way to get a random matrix looks like this : 
randmatrix = np.array(
    list(
        map(lambda row: np.random.randint([10] * len(row)), np.ones([3, 5]))
    )
)
print(randmatrix)
# Now let's streamlie it using a comprehension : 
randmatrix = np.array([np.random.randint([10] * 5) for n in [1] * 5])
# And OH GUESS WHAT! It's totally supported already by randint. 
# The size argument can be a tuple of dimensions
randmatrix = np.random.randint(1, 10, (10, 3))
print(randmatrix)

# Broadcasting
# Usually in algebra you have to have 2 matricies of the same size to do operations
# But numpy will automatically expand a single value to the shape of a numpy array 
print(randmatrix * 5)
print(randmatrix * [5])
print(randmatrix * np.array([5]))

# Pandas basically gives you the ability to create spreadsheet like objects in python
# It also enables manipulating your data using several interesting features
