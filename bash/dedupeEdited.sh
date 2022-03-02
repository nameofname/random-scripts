# i was deduping photos from google photos to port into icloud
# the google photos had 2 versions, plain and edited
# i wanted to keep all the edited ones and separate out the others
# key learnings from this : use double quotes to handle paths with spaces!
# also, resolving a path in bash is kind of hard, so just loop by diong for file in *
# and cd to the directory you want to operate on when running the script, makes it
# much much easier :)
for file in *
do 
    editedName=${file/\.jpg/"-edited.jpg"}
    if test -f "$editedName"
    then 
        mv "$file" ../nonEdited
        # echo "i should move this $file"
    fi
done
