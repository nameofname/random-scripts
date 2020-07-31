import sys
import pandas as pd

app_dir = '/Users/ronald/projects/random-scripts/python/'
sys.path.insert(1, app_dir)


# file_name='nba_games_november2018_visitor_wins.txt'
file_name = 'msr_paraphrase_train.txt'
file_url = 'file://{0}read_csv/{1}'.format(app_dir, file_name)
# file_url = 'https://raw.githubusercontent.com/wasiahmad/paraphrase_identification/master/dataset/msr-paraphrase-corpus/msr_paraphrase_train.txt'

# Read the file in with pandas read_csv function
# I get an error on some rows, so I'm ignoring them with error_bad_lines=False
my_file = pd.read_csv(file_url, sep='\t', error_bad_lines=False)


# This example shows iterating through the dataframe using iterrows()
# for index, row in my_file.iterrows():
#     print(row['Quality'] > 0)

# For some reason, this crazy syntax returns all the values in the dataframe
# with a True or False if it matches the equivalency! 
# I can't tell if this is some sort of weird language feature is specific to pandas ?!
# Here's a post explaining it : https://heydenberk.com/blog/posts/demystifying-pandas-numpy-filtering/
quality_list = my_file['Quality'] == 1
# print(quality_list)
# Then, in a crazy twist of events, you can filter the dataframe with the return value : 
has_quality = my_file[quality_list]
# print(has_quality)
# I also want to filter out cases where there is no string 2, which happens sometimes,
# apparently there's still something messed up with the decoding
has_data = my_file[my_file['#2 String'].notnull()]


# Now let's create a list of training inputs as explained in this paper on parapnrasing : 
# https://arxiv.org/pdf/1911.09661.pdf
for index, row in has_data.iterrows():
    # print('MISTER RONALD SAYS \n{} >>>> {}'.format(row['#1 String'], row['#2 String']))
    print('{} >>>> {}'.format(row['#1 String'], row['#2 String']))
