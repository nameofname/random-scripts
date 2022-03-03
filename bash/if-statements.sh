#!/bin/bash

test=$(which watchman);

# doing an if statement in many lines
if [ -z $test ]
    then
        echo "ronald found this shit out";
    else 
        echo "no."
fi

if [ -f ~/thing.txt ]
    then
        echo "I found ~/thing.txt";
    else 
        echo "There is no ~/thing.txt"
fi

# IMPORTANT! There are 3 ways to write the test case for the IF condition : 
# 1) "test" 2) single brackets 3) double brackets
if test -f ~/.thing.txt; then echo 'one'; else echo 'nope'; fi
if [ -f ~/.thing.txt ]; then echo 'two'; else echo 'nope'; fi
if [[ -f ~/.thing.txt ]]; then echo 'three'; else echo 'nope'; fi

# the one-line if statement will bomb out if you mis-place semicolons, 
# or don't put spaces around the square brackets. notice the position of the semicolons 
#              v                 v                   v   v
if [ -z $test ]; then echo "nerps"; else echo "derps"; fi;
