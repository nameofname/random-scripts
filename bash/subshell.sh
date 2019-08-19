# #!/bin/bash
# # subshell-test.sh

# FOR REFERENCE : 
# https://www.tldp.org/LDP/abs/html/subshells.html
# https://www.tldp.org/LDP/abs/html/internal.html#BUILTINREF
# https://www.tldp.org/LDP/abs/html/gotchas.html#PARCHILDPROBREF

# (
# # Inside parentheses, and therefore a subshell . . .
# while [ 1 ]   # Endless loop.
# do
#   echo "Subshell running . . ."
# done
# )

# #  Script will run forever,
# #+ or at least until terminated by a Ctl-C.

# exit $?  # End of script (but will never get here).

# -n = don't print newline character
# if -e is in effect, 




for i in {0..5}
do
  echo -ne "\rNumber: $i"
  sleep 1
done

#TODO ! I never finished this. would be cool though...
