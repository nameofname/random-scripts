# import simplenlg

from nlglib.realisation.simplenlg.realisation import Realiser
from nlglib.microplanning import *

realise = Realiser(host='nlg.kutlak.info')

c = Clause('Mary', 'chase', 'the monkey')
print(realise(c))



# s = SPhraseSpec()