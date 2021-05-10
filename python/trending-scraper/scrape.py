import requests
from bs4 import BeautifulSoup


home = 'https://cupofjo.com/'
soup = BeautifulSoup(requests.get(home).content, features="html.parser")

# print(soup.find_all("header", class_='entry-header'))
headers = soup.find_all("header", class_='entry-header')
for h in headers:
    print(h.h2.a)


# url = 'https://cupofjo.com/2021/04/michelle-zauner-beauty-uniform/'
# r = requests.get(url)
# soup = BeautifulSoup(r.text, features="html.parser")
# print(soup.article.get_text())

