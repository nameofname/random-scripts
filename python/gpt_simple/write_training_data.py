from get_training_data import build_data
import datetime

t = datetime.date.today()
training_data = build_data()
training_list = training_data['Training Sentence'].to_list()
training_string = '\n'.join(training_list)
# print('training data ready', training_string)

# Write the file to disc for use in Google Cloud : 
f = open("training_output/paraphrase_training_data_{}_{}_{}.txt".format(t.month, t.day, t.year), "w")
f.write(training_string)
