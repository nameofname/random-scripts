import matplotlib.pyplot as plt

def graph(xList, yList=[]):
    ''' Supply a list of x values, and optionally y values '''
    if (len(yList) == 0):
        plt.plot(xList)    
    else:
        # yList = list(range(len(xList)))
        plt.scatter(xList, yList)
    plt.show()

# graph([186, 206, 188, 175, 177, 179, 216, 251, 317]) # june
# graph([2268, 2743, 2929, 2775, 2873, 3014, 3616, 4385, 5517]) # july
# graph([287, 602, 891, 1272, 1617, 1692, 1842, 2094, 2313]) # august
# graph([0, 0, 0, 0, 96, 192, 318, 450, 575]) # september
graph([11950, 9838, 7428, 6815, 5133, 6152, 5630, 6205]) # pages created
