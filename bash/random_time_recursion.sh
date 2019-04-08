# /bin/bash

i=0

rand_time() {
    echo $((RANDOM%10))
}
repeat() {
    afplay /System/Library/Sounds/Tink.aiff
    afplay /System/Library/Sounds/Tink.aiff
    afplay /System/Library/Sounds/Tink.aiff

    time=$(rand_time)
    sleep $time
    repeat
}


repeat
