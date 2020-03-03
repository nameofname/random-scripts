

# from simplenlg.features import *
from simplenlg.features.Feature import *
from simplenlg.features.Tense import *
# from simplenlg.features.Form import *
# from simplenlg.features.LexicalFeature import *
# from simplenlg.features.Gender import *
# from simplenlg.framework.DocumentElement import *
# from simplenlg.framework.NLGElement import *
from simplenlg.framework.NLGFactory import *
# from simplenlg.framework.LexicalCategory import *
from simplenlg.lexicon.Lexicon import *
# from simplenlg.phrasespec.NPPhraseSpec import *
# from simplenlg.phrasespec.PPPhraseSpec import *
# from simplenlg.phrasespec.SPhraseSpec import *
# from simplenlg.phrasespec.VPPhraseSpec import *
from simplenlg.realiser.english.Realiser import *

from simplenlg.phrasespec import *



# The hot resources : 
# https://pypi.org/project/simplenlg/
# https://github.com/bjascob/pySimpleNLG
# https://github.com/simplenlg/simplenlg/wiki

lexicon    = Lexicon.getDefaultLexicon()
factory = NLGFactory(lexicon)
realiser   = Realiser(lexicon)

sentence1 = factory.createSentence()
subject1 = factory.createNounPhrase('the', 'cat')
sentence1.addComponent(subject1) # use addComponent not setSubject
verb1 = factory.createVerbPhrase('jump')
sentence1.addComponent(verb1)
print(realiser.realise(sentence1))
# sentence1.setFeature(Feature.TENSE, Tense.PAST)
# print(realiser.realise(sentence1)) -- don't work :(

# Look - using a clause instead of a sentence made tense switching work :
# the reason is because you can use setSubject on clauses, not sentences
clause2 = factory.createClause()
subject1 = factory.createNounPhrase('the', 'cat')
clause2.setSubject(subject1)
verb1 = factory.createVerbPhrase('jump')
clause2.setVerb(verb1)
print(realiser.realise(clause2))
clause2.setFeature(Feature.TENSE, Tense.PAST)
print(realiser.realise(clause2))


verb1 = factory.createVerbPhrase('jump')
verb1.setFeature(Feature.TENSE, Tense.PAST)
print(realiser.realise(verb1))

clause1 = factory.createClause()
clause1.setSubject('mary')
clause1.setObject('my monkey')
clause1.setVerb('chase')
print(realiser.realise(clause1))
clause1.setFeature(Feature.TENSE, Tense.PAST)
print(realiser.realise(clause1))
print(realiser.realiseSentence(clause1)) # realiseSentence adds orthography
clause1.setFeature(Feature.TENSE, Tense.FUTURE)
print(realiser.realiseSentence(clause1))
clause1.setFeature(Feature.NEGATED, true)
print(realiser.realiseSentence(clause1)) # will not

