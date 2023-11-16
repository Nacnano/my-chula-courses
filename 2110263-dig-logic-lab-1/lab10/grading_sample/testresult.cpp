// g++ testresult.cpp  -o testresult  && ./testresult testfile.txt results.txt

#include <stdio.h>
#include <vector>
#include <string.h>
#include <stdlib.h>
#include <algorithm>
void readtxtfile( const char *filename,std::vector<int> &testvec) {
    FILE * fi = fopen (filename ,"r");
    testvec.clear();
    int num;
    // We read all numbers
    while (fscanf(fi, "%d", &num) == 1){
        testvec.push_back(num);
    };
    fclose(fi);
};
    
int tokentoint( char * token){
    // Assuming that it is in hex 
    int x = 0;
    if (strlen(token) > 2 && (token[0]=='0' && token[1] == 'x')){
        sscanf( token+2, "%x", &x);
    } else 
        sscanf( token, "%x", &x);
    return x;
}

int main(int argc, const char **argv) {
    int N;
    std::vector< int> numbers;
    if (argc < 2) {
        printf("%s testfile.txt results.txt", argv[0]);
        exit(1);
    }
    readtxtfile(argv[1], numbers);
    N = numbers.size();
    char buf[256];
    char tokens[8][256];
    FILE *fi = fopen(argv[2], "r");
    std::sort(numbers.begin(), numbers.end());
    // Skip first two lines;
    fgets(buf, 256, fi);
    fgets(buf, 256, fi);
    int idx = 0;
    int hasstart = 0;
    int clkcnt = 0;
    int ret_clkcnt =-1 ;
    int mismatch = 0;
    while(fgets(buf, 256, fi)!= NULL){
        //clock N reset start valid displayout done clockcount
        sscanf(buf, "%s %s %s %s %s %s %s %s", tokens[0], tokens[1], tokens[2], tokens[3], tokens[4], tokens[5], tokens[6], tokens[7]  );
        int valid = atoi(tokens[4]);
        int start = atoi(tokens[3]);
        if (start)
            hasstart = 1;
        int numret = tokentoint(tokens[5]);
        if (valid) {
            if (numret != numbers[idx]){
                printf("mismatch %d %d %d\n", idx, numbers[idx], numret);
                mismatch  =1;
            }
            idx++;
        }
        clkcnt+= hasstart;
        int done = atoi(tokens[6]);
        if (done ) {
            ret_clkcnt = tokentoint(tokens[7]);
            break;
        }
        if (idx > N){
            printf("Something is wrong !!\n");
        }
    }   
    if (ret_clkcnt<0 || (idx < N)) {
        printf("Program has not finished, increase maxCLK in testgenerator.cpp or \"repeat\" in .dig test case file \n");
    } else {
        if (!mismatch )
            printf("Match!!\n");
        printf("Check Clocks: %d\nReport Clock: %d \n", clkcnt - 2, ret_clkcnt );
    }

    fclose(fi);
    
    return 0;
}
