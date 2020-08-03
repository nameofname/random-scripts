import sys
import pandas as pd

app_dir = '/Users/ronald/projects/random-scripts/python/'
sys.path.insert(1, app_dir)
separator = '>>>>'

#  From source : 
# https://raw.githubusercontent.com/wasiahmad/paraphrase_identification/master/dataset/msr-paraphrase-corpus/msr_paraphrase_train.txt
# file_name='nba_games_november2018_visitor_wins.txt' # for testing 
file_name = 'msr_paraphrase_train.txt'
file_url = 'file://{0}gpt_simple/data/{1}'.format(app_dir, file_name)

output = None

def build():
    global output
    # Note* you have to use "is not" instead of != or else it gets converted into an elementwise operator.
    if (output is not None):
        return output
    # Read the file in with pandas read_csv function
    # I get an error on some rows, so I'm ignoring them with error_bad_lines=False
    raw_data = pd.read_csv(file_url, sep='\t', error_bad_lines=False)

    # For some reason, this crazy syntax returns all the values in the dataframe :
    # dataFrame[dataFrame[fieldName] === X]
    # It works because the == turns into an "element wise" operator and returns a dataFrame of true / false values
    # Pandas has a feature where that boolean dataFrame filters the list it's passed to
    # It's called an elementwise operation, and I can't tell if this is a language feature is specific to numpy!?
    # Here's a post explaining it : https://heydenberk.com/blog/posts/demystifying-pandas-numpy-filtering/

    # Filter out rows where quality = 0
    has_quality = raw_data[raw_data['Quality'] == 1]
    # Filter out cases where there is no string 2, which happens sometimes, must be an issue with the decoding :
    has_data = has_quality[has_quality['#2 String'].notnull()]

    # Add the training data sentence as a combination of String 1 and 2 from the file :
    # Idea for this line taken from : https://www.geeksforgeeks.org/adding-new-column-to-existing-dataframe-in-pandas/
    # Note - you need to use the axis = 1 argument (default 0) so apply is performed over rows no columns
    has_data['Training Sentence'] = has_data.apply(lambda row: "{} {} {}".format(row['#1 String'], separator, row['#2 String']), axis=1)
    output = has_data
    return output

