import pandas as pd
import os
import json


def getJson(f):
    with open(f, 'r') as myfile:
        data = myfile.read()
    return json.loads(data)

def getDic(obj):
    dic = {}
    for key in obj:
        for o in obj[key]:
            # print(o['defaultMessage'])
            # print(o['id'])
            # dic["{0}-{1}".format(key, o['id'])] = o['defaultMessage']
            dic[o['id']] = o['defaultMessage']
    return dic

en = getJson('en-US.json')
de = getJson('de-DE.json')

enDic = getDic(en)
deDic = getDic(de)
# print(deDic)
# exit()
df = pd.DataFrame({'id': [], 'english': [], 'german': []})

for idx, key in enumerate(enDic):
    row = {'id': key, 'english': enDic[key], 'german': deDic.get(key)}
    print('rowrowrow', row)
    df.loc[idx] = row

print(df)
df.to_csv('translations.csv')