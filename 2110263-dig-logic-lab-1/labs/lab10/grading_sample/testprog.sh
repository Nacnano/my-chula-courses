#!/bin/bash
PROGRAM=$1
TESTVECTOR=$2
# compile test program
g++ testgenerator.cpp  -o testgenerator  
g++ testresult.cpp  -o testresult  

./testgenerator  $2  t.dig
java -cp Digital.jar CLI test $1 -tests t.dig -verbose > results.txt
./testresult $2 results.txt
