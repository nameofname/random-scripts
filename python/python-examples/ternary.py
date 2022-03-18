# [on_true] if [expression] else [on_false] 

dic = {'a': 2, 'b': 5}
new_key = 'q'
# conditionally assigning new_key on dic
# using python's ass backwards ternary syntax :
dic[new_key] = dic[new_key] + 1 if new_key in dic else 0

print(dic)