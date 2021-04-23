#!/usr/bin/env python

import src.bigquery.find_trends as find_trends

res = find_trends.get_trend_data()
print (res)
