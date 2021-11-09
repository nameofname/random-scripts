from simplenlg.framework.LexicalCategory import *
from simplenlg.framework.NLGFactory import *
from simplenlg.realiser.english.Realiser import *


lexicon    = Lexicon.getDefaultLexicon()
nlgFactory = NLGFactory(self.lexicon)
realiser   = Realiser(self.lexicon)


nlgFactory.createSentence()