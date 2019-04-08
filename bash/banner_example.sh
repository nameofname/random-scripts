# /bin/bash

words=( you smell like poo)

for i in "${words[@]}"
do
    :
    banner -w 50 "$i "
    say "$i"
    sleep 1
done

