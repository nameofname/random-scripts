#!/bin/bash

test=$(which watchman);

# doing an if statement in many lines
if [ -z $test ]
    then
        echo "ronald found this shit out";
    else 
        echo "no."
fi


# the one-line if statement will bomb out if you mis-place semicolons, 
# or don't put spaces around the square brackets. notice the position of the semicolons 
#              v                 v                   v   v
if [ -z $test ]; then echo "nerps"; else echo "derps"; fi;
