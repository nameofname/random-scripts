# COMPREHENSIONS

the_list = [1,2,3,4,5,6,7,8,9,8,7,6,5,4,3,2,1,0]

# simple mathematical transformations :
print([el * 2 for el in the_list])
print([2 * el for el in the_list]) # same
# filtering : 
print([el for el in the_list if el < 8 and el > 3])

#using comprehensions with dictionaries : 
the_dict = {'ron': 'uno', 'danielle': 'dos'}
print({k for k in the_dict})
print({v:k for k, v in the_dict.items()}) # flip dictionary
the_dict['num'] = 5
print(the_dict)
print([val for key, val in the_dict.items() if not isinstance(val, int)]) # filter out numbers
print({k for k in the_dict.items()}) # a set not a dict
print({v for k, v in the_dict.items()}) # ditto, a set.
