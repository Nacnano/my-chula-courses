$file="Banking"
mkdir -p output
for i in {1..8}
do 
    echo $i
    /bin/python3 /home/nacnano/github/2110101-com-prog/grader/Old_Quiz/banking/Banking.py < testcases/$i.in > output/$i.sol
    diff --strip-trailing-cr -w testcases/$i.sol output/$i.sol
done