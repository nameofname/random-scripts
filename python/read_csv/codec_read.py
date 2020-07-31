import sys
app_dir = '/Users/ronald/projects/random-scripts/python/'
sys.path.insert(1, app_dir)

import codecs


file_name='nba_games_november2018_visitor_wins.txt'
# file_name = 'msr_paraphrase_train.txt'
file_url = 'file://{0}read_csv/{1}'.format(app_dir, file_name)


# Heres a way to open the file using UTF-16, not 100% why that solves for the carriage return type, but it does something. 
doc = codecs.open('msr_paraphrase_train.txt','rU','UTF-16') #open for reading with "universal" type set
print(doc)

# this prints each line after reading with open
with open(file_name) as f:
    for line in f:
        print(line)
# This does the same thing: 
ff = open(file_name)
for line in ff:
    print(line)
