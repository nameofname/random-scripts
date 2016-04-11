# /bin/bash

# heredoc example without variable expansion : 
# variables inside this block are treated as just strings
read -d -r VAR1 << "EOM1"
this is the inside of the thing
this is another line inside
there are 3 lines so far wat. 
$varName=$(ls)
EOM1

echo "$VAR1"

# heredoc example with variable expansion : 
# variables inside this block will be interepreted and inserted into the string
read -d -r VAR2 << EOM2
this is the inside of the thing
this is another line inside
there are 3 lines so far wat. 
$varName=$(ls)
EOM2

echo "$VAR2"
