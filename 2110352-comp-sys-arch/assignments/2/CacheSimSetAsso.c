/**
 * CacheSim.c 
 * This program is designed for class exercise only.
 * It is provided as is. There is no warranty or support of any kind.
 *
 * Krerk Piromsopa, Ph.D.
 * Department of Computer Engineering
 * Chulalongkorn University
 * Bangkok, Thailand.
 * 
 * History
 * 2013 - Initial design
 * 2015 - Refactor/Clean code
**/
#include <stdio.h>
#include <string.h>
#include <math.h>
#include "CacheSimSetAsso.h"

long MISS;
long HIT;
struct Cache cache[INDEX_SIZE];
int CACHE_SIZE, OFFSETLEN, INDEXLEN, TAGLEN;
int count = 0;
int algo = 0;
int init() {
	count = 0;
	MISS=0;
	HIT=0;
	int i,j;
    for(i=0;i<INDEX_SIZE;i++){
		for(j=0;j<SET_SIZE;j++){
			cache[i].valid[j]=0;
			cache[i].tag[j]=0;
			cache[i].dirty[j]=0;
		}
		cache[i].round = 0;
    }
	CACHE_SIZE = INDEX_SIZE*SET_SIZE*BLOCK_SIZE;
	OFFSETLEN = log2(BLOCK_SIZE);
	INDEXLEN = log2(INDEX_SIZE);
	TAGLEN = 32 - OFFSETLEN - INDEXLEN;
}
int calAddr(unsigned long addr,unsigned long *tag,unsigned long *idx,unsigned long *offset) {
	unsigned long tmp;
	int i;
	*tag=addr>>(OFFSETLEN+INDEXLEN);
	tmp=0;
	for(i=0;i<INDEXLEN;i++) {
		tmp<<=1;
		tmp|=0x01;
	}
	*idx=addr>>OFFSETLEN & tmp;
	tmp=0;
	for(i=0;i<OFFSETLEN;i++) {
		tmp<<=1;
		tmp|=0x01;
	}
	*offset=addr & tmp;
}
int access(unsigned long addr){
	count++;
    unsigned long offset;
	unsigned long tag;
	unsigned long idx;
    int i;
	int valid=0;
	calAddr(addr,&tag,&idx,&offset);
	for(i=0;i<SET_SIZE;i++){
		if(cache[idx].tag[i]==tag && cache[idx].valid[i]){
			HIT++;
			valid=1;
			break;
		}
	}
	if(!valid){
		MISS++;
		for(i=0;i<SET_SIZE;i++){
			if(!cache[idx].valid[i]){
				cache[idx].valid[i]=1;
				cache[idx].tag[i]=tag;
				cache[idx].lastAccess[i]=count;
				break;
			}
		}
		if(i==SET_SIZE){
			if(algo == 0){
				// LRU
				int min = 0;
				for(i=0;i<SET_SIZE;i++){
					if(cache[idx].lastAccess[i]<cache[idx].lastAccess[min]){
						min = i;
					}
				}
				cache[idx].valid[min]=1;
				cache[idx].tag[min]=tag;
				cache[idx].lastAccess[min]=count;
			}else{
				// RR
				cache[idx].valid[cache[idx].round]=1;
				cache[idx].tag[cache[idx].round]=tag;
				cache[idx].lastAccess[cache[idx].round]=count;
				cache[idx].round = (cache[idx].round+1)%SET_SIZE;
			}
		}
	}
}
int main(int argc,char *argv[]){
	init();
	printf("\n");
	printf("%d-way Set Associative Cache Simulator\n",SET_SIZE);
	printf("Cache Size: %d KB\n",CACHE_SIZE/1024);
	printf("\n");
    FILE *input;
    char buff[1025];
    unsigned long myaddr;
    if (argc<3) {
		fprintf(stderr,"Usage:\n\t%s address_file\n",argv[0]);
		exit(-1);
	}
	for(algo=0;algo<2;algo++){
		if(algo == 0){
			printf("LRU\n");
		}else{
			printf("RR\n");
		}
		input=fopen(argv[1],"r");
		//read file
		while (fgets(& buff[0],1024,input)) {
			sscanf(buff,"0x%x",&myaddr);
			access(myaddr);
		}
		printf("GCC\n");
		printf("HIT:%7d MISS: %7d\n",HIT,MISS);
		printf("Miss rate: %f\n\n",(float)MISS/(float)(HIT+MISS));

		fclose(input);

		init();
		input=fopen(argv[2],"r");
		//read file
		while (fgets(& buff[0],1024,input)) {
			sscanf(buff,"0x%x",&myaddr);
			access(myaddr);
		}
		printf("GO\n");
		printf("HIT:%7d MISS: %7d\n",HIT,MISS);
		printf("Miss rate: %f\n\n",(float)MISS/(float)(HIT+MISS));

		fclose(input);
	}
}