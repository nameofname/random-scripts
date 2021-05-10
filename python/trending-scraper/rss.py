import feedparser
feed = feedparser.parse("http://feeds.feedburner.com/blogspot/bboSV")

print(feed.entries[1].keys())
print(feed.entries[1]['feedburner_origlink'])
