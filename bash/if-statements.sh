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


# the one-line if statement will bomb out if you mis-place semicolons, 
# or don't put spaces around the square brackets. notice the position of the semicolons 
#              v                 v                   v   v
if [ -z $test ]; then echo "nerps"; else echo "derps"; fi;
