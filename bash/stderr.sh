#!/bin/bash

# this will go to stdout : 
echo "About to try to access a file that doesn't exist"
# this will go to stderr : 
cat bad-filename.txt

# 0 = stdin; 1 = stdout; 2 = stderr
# try this to redirect stdout and stderr to different files : 
# ./stderr.sh 1> capture.txt 2> error.txt
# redirect both stdout and stderr to the same file : 
# ./error.sh > capture.txt 2&>1
# the 2&>1 means: 'redirect stream 2 (stderr) to the smae place as stream 1 (stdout)
