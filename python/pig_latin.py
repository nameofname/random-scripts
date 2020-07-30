def pig(word):
    if len(word) == 0:
        return
    first = word[0]
    word = word[1:]
    return "{0}{1}ay".format(word, first)

def pig_latin(): 
    text = input('type it in')
    # print('ronaldy text: {0}'.format(text))
    arr = text.split(' ')
    #  filter null values using the keyword 'None'
    res = filter(None, 
        map(pig, arr)
    )
    return ' '.join(res)

print(pig_latin())
