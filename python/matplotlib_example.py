# matplotlib is fucking awesome.

from numpy.random import randint
import matplotlib.pyplot as plt

# Sample 1000 random values to create a scatterplot
x = randint(low=1, high=1000, size=100)
y = randint(low=1, high=1000, size=100)

# This will show nothing in a Jupyter Notebook
plt.scatter(x, y)
plt.show()

# NOTE! in colab looks like the matplotlib doesn't do anything
# Seems that it is useful in Jupityr notebooks.
# Let the magic happen!
# %matplotlib inline
# plt.scatter(x, y)
# plt.show()
