import sys
import nltk
import urllib.request
from bs4 import BeautifulSoup
from nltk.corpus import stopwords

# A script which attempts to derive a meta description from a web page
# It doesn't quite work since it gets fed with a lot of garbage data from script tags
# Could be modified to scrape only visible text.
# Taken from this article : https://searchengineland.com/reducing-the-time-it-takes-to-write-meta-descriptions-for-large-websites-299887

url_arg = sys.argv[1]
response = urllib.request.urlopen(url_arg)
html = response.read()
# print(html)
soup = BeautifulSoup(html,'html.parser')
# soup = BeautifulSoup(html,'html5lib')
text = soup.get_text(strip = True)
# print(text)

# tokens = [t for t in text.split()]
tokens = text.split()

sr = stopwords.words('english')
clean_tokens = tokens[:]
for token in tokens:
    if token in stopwords.words('english'):
        
        clean_tokens.remove(token)
freq = nltk.FreqDist(clean_tokens)
for key,val in freq.items():
    print(str(key) + ':' + str(val))
freq.plot(20, cumulative=False)
