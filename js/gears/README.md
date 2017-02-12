# Gears problem :


The original problem was to produce a gear with 127 teeth by passing it through different combinations of gears. Each pass would use 2 gears, and at the end the machine that does this work always uses a gear with 40 teeth. You must choose combinations of gears that produce the closest result to 127 teeth, within the accepted range of error. If you were to use 2 pairs of gears this would create the mathematical formula : 

(a / b) * (c / d) * 40 = 127

Using 3 pairs of gears you would have the formula : 

(a / b) * (c / d) * (e / f) * 40 = 127

In the original real life scenario the gears in each pair must have between 13 and 50 teeth. The acceptable range of error is .0001. 


## Finding a solution :

Using a brute force algorithm it was discovered that using 2 pairs of gears (eg. (a / b) * (c / d)) the closest resulting number to 127 is not within the acceptable range of error. 

(35/17) * (38/31) * (39/31) * 40 = 127.00006121074858

Using a similar brute force algorithm to find the closest match with 3 pairs of gears produced a number within the accepted range of error, however, the algorithm was extremely inefficient. 

(a / b) * (c / d) * (e / f) * 40 = 127


Create an efficient algorithm to find the best combination of gears within the accepted range of error. 


## Useful tool : 

Combinatorial math comes into play when trying to reduce a set. This tool is used to calculate number of combinations with repetition :

http://www.calculatorsoup.com/calculators/discretemathematics/combinationsreplacement.php

