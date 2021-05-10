#!/usr/bin/env python

import src.bigquery.graph_entity_mentions as graph_entity_mentions
import sys
import matplotlib.pyplot as plt

if (not sys.argv[1]):
    print('plesase provide an entity name to graph')

res = graph_entity_mentions.query_entities(sys.argv[1])
df = res.to_dataframe()
df.plot.line(x = 'day', y = 'mentions')
print(df)
plt.show()