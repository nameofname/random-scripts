import numpy as np
import pandas as pd


print('PANDAS')

# Let's create a 2 * 10 array : 
# data = np.array([np.random.randint([10] * 2) for row in [1] * 10])
data = np.random.randint(1, 10, (10, 2))
# It's a randomized array with 2 values per each of 10 rows
# Now let's name each of the columns and create a data frame : 
frame = pd.DataFrame(data, columns=['age', 'height'])
print(data)
print(frame)

# Ok now here's the trippy shit - you can add another column by doing this : 
frame['future height'] = frame['height'] + 2
print(frame)

# Accessing data in the dataframe : 
print(frame.head(5)) # top 5 values from each column
print(frame.iloc[[3]]) # gets the Nth row
print(frame[1:4]) # gets rows 1 - 4
print(frame['height']) # gets the named column

# As I previously encountered when trying to create training data for summarization...
# Pandas also allows you to filter dataframes using elementwise operations
print(frame[frame['height'] < 5])
# Really the elementwise operation creates a new dataframe of boolean values
# And when you pass a dataframe of booleans to a dataframe using square brackets...
# the boolens are used as filtering criteria
print(frame['height'] < 5) # see the boolean data frame...
# ...passing it back into frame filter frame[frame['height] < X]

# In order to mutate your frame without mutating a reference you have to use the copy method :
frame_reference = frame
frame['height'][1] = 500
print(frame['height'][1])
print(frame_reference['height'][1])

frame_reference = frame.copy()
frame['height'][1] = 'bazinga'
print(frame['height'][1])
print(frame_reference['height'][1])
