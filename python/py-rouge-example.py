from rouge_score import rouge_scorer
scorer = rouge_scorer.RougeScorer(['rouge1', 'rougeL'], use_stemmer=True)
score = scorer.score('hi im ron', 'hello im ronald williams')
score = score['rougeL'][2]
print('the score is', score)