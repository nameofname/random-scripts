# import gpt_2_simple as gpt2
from get_training_data import build_data

training_data = build_data()
training_list = training_data['Training Sentence'].to_list()
training_string = '\n'.join(training_list)
# print('training data ready', training_string)

# Write the file to disc for use in Google Cloud : 
f = open("training_data.txt", "w")
f.write(training_string)



# ............
# gpt2.download_gpt2(model_name="124M")
# print('model downloaded')
# Here's where I would fine tune GPT, but I don't have any tensors :|
