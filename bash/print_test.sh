function echo_var () {
    echo "$1"
}

message='hi'
hi='bye'

#echo_var "${!message}"


function _print() {
    #while read data; do
    #    printf "$data"
    #done

    echo $1 | tr -d ' |\n' 
    #pbpaste
    printf '\n'
}

res=git branch --list | grep \* 
print $res
