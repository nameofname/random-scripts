def pig(word):
    first = word[0]
    word = word[1:]
    return "%s%say"%(word, first)

def pig_latin(): 
    text = input('type it in')
    arr = text.split(' ')
    return map(pig, arr) 

print(pig_latin())
