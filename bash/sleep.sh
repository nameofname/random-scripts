NUM0=$(cat ~/thing.txt)
NUM1=`echo "$NUM0+.01" | bc`
echo $NUM1 > ~/thing.txt
exec `sleep $NUM1`
