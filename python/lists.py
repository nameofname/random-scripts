# LISTS
the_list = [1,2,3,4,5,6] # this is a list
print(the_list[2:4])
the_list.append(7)
the_list.extend([8,9])
print(the_list)
print(the_list.count(1)) # 1 occurrence
print(the_list.index(1)) # index of 0
the_list.insert(0, 'ronald\'s the_list')
print(the_list)
del the_list[0] # remove 0th item
print(the_list)
the_list.pop() # remove last item
the_list.pop(0) # also removes 0th item
print(the_list)
the_list.append(8)
print(the_list)
the_list.remove(8) # removes the first occurrency of 8
print(the_list)
if 3 in the_list:
    print('yeah it is') # it is

# TUPLES
the_tuple = (1,2,3) # this is a the_tuple, just an immutable the_list
l_from_t = list(the_tuple) # convert the_list to a tuple
print(l_from_t)
t_from_l = tuple(the_list)
print(t_from_l)
bad_tuple = (1)
print(bad_tuple) # not a tuple, because without a comma, python thinks it's just extra parens
bad_tuple = (1,)
print(bad_tuple) # there we go
(ron1, ron2, ron3) = the_tuple # use tuples to do multiple assignment
print(ron1, ron2, ron3)

# SETS
the_set = {1,2}
print(the_set) # 1,2 
the_set = {1,2,2}
print(the_set) # 1,2 (b/c unique)
the_set = set([1,1,2,2,3,3])
print(the_set) # 1,2,3 - set from a list
the_set.add(4)
print(the_set) # 1,2,3,4
the_set.update({5,5,6})
print(the_set) # 1,2,3,4,5,6
the_set.update({7,8}, {8,9})
print(the_set) # 1,2,3,4,5,6,7,8,9
the_set.remove(1)
the_set.discard(2)
print(the_set) # remove and discard almost the same, but remove will error if value not included
the_set.pop() 
print(the_set) # ? sets are unordered, so an arbitrary value is popped
print(1 in the_set) # false, was removed
print('union', the_set.union({1,2,3}))
print('intersection', the_set.intersection({1,2,3,4}))
print('difference', the_set.difference({1,2,3,4}))
print('symmetric_difference', the_set.symmetric_difference({1,2,3,4}))
# difference returns any item not in the set (the callee, not argument)
# symmetric_difference returns any item not in both sets
a_set = {1, 2, 3}
b_set = {1, 2, 3, 4}
print(a_set.issubset(b_set)) # True
print(b_set.issuperset(a_set)) # True

# DICTIONARIES
the_dict = { 'ron': 'ronald', 'will': 'hell yeah bro'}
print(the_dict['ron'])
the_dict['Ron'] = 'alding';
print(the_dict)
