// g++ testgenerator.cpp  -o testgenerator  && ./testgenerator testfile.txt  t.dig

#include <stdio.h>
#include <vector>
#include <string.h>
#include <stdlib.h>

const char *header = 
"<?xml version=\"1.0\" encoding=\"utf-8\"?>\
<circuit>\
  <version>2</version>\
  <attributes/>\
  <visualElements>\
    <visualElement>\
      <elementName>Testcase</elementName>\n\
      <elementAttributes>\n\
        <entry>\n\
          <string>Label</string>\n\
          <string>FINALT1</string>\n\
        </entry>\n\
        <entry>\n\
          <string>Testdata</string>\n\
          <testData>\n\
            <dataString>clock N reset start valid displayout done clockcount\n\
            ";

const char *tail = 
"</dataString>\
          </testData>\
        </entry>\
      </elementAttributes>\
      <pos x=\"800\" y=\"580\"/>\
    </visualElement>\
  </visualElements>\
  <wires/>\
  <measurementOrdering/>\
</circuit>";


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
    
int main(int argc, const char **argv) {
    int N;
    int maxCLK = 40000;
    std::vector< int> numbers;
    if (argc < 2) {
        printf("%s testfile.txt output.dig", argv[0]);
        exit(1);
    }
    readtxtfile(argv[1], numbers);
    N = numbers.size();
    
    // printf("%s", header);
    FILE *fo=fopen(argv[2], "w");
    fwrite( header, strlen(header), 1, fo);
    // Print program
    fprintf(fo,"program(");
    for(int i=0;i<N;i++)
        fprintf(fo,",%d" + (i==0), numbers[i]);
    fprintf(fo,")\n");
    fprintf(fo, "0 %d 0 0 X X X X\n", N);
    fprintf(fo, "1 %d 0 0 X X X X\n", N);
    fprintf(fo, "0 %d 1 0 X X X X\n", N);
    fprintf(fo, "1 %d 1 0 X X X X\n", N);
    fprintf(fo, "0 %d 0 1 X X X X\n", N);
    fprintf(fo, "1 %d 0 1 X X X X\n", N);
    fprintf(fo, "repeat (%d) C %d 0 1 X X X X\n", maxCLK, N);
    // Intentionally made it fail
    fprintf(fo, "1 %d 0 1 X X X 0xBAADBEEF\n", N);
    fwrite( tail, strlen(tail), 1, fo);

    fclose(fo);
//     printf( )
// clock N reset start valid displayout done clockcount
// program(0x01, 0x02,0x3, 0x3, 0x3, 0xFF, 0x02, 0x5)

// 0 8 0 0 X X X X
// 1 8 0 0 X X X X
// 0 8 1 0 X X X X
// 1 8 1 0 X X X X
// 0 8 0 1 X X X X
// 1 8 0 1 X X X X
// repeat (1000) C 8 0 1 X X   X X





    return 0;
}


