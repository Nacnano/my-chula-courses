echo Welcome to Mini Calculation program
read -p "Enter the first number: " a
read -p "Enter the second number: " b
echo "1) add"
echo "2) subtract"
echo "3) multiply"
echo "4) divide"
while :
do
read -p "Choose the operation: " o
if [ "$o" = "1" ]; then
    echo $(($a+$b))
    break
elif [ "$o" = "2" ]; then
    echo $(($a-$b))
    break
elif [ "$o" = "3" ]; then
    echo $(($a*$b))
    break
elif [ "$o" = "4" ]; then
    echo $(($a/$b))
    break
else
    sl -Fe
fi
done
