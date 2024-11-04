/**
 * CacheSimSetAsso.h
 * This program is designed for class exercise only.
 * It is provided as is. There is no warranty or support of any kind.
 *
 * Krerk Piromsopa, Ph.D.
 * Department of Computer Engineering
 * Chulalongkorn University
 * Bangkok, Thailand.
**/
#ifndef CACHESIMSETASSO_H_INCLUDED
#define CACHESIMSETASSO_H_INCLUDED

/* Please adjust parameters here */
#define INDEX_SIZE 2048
#define BLOCK_SIZE 4
#define SET_SIZE 4
typedef unsigned char Byte;
typedef unsigned char bool;
typedef struct Cache{
    bool valid[SET_SIZE];
    bool dirty[SET_SIZE];
    unsigned long tag[SET_SIZE];
	Byte data[SET_SIZE][BLOCK_SIZE];
	unsigned long lastAccess[SET_SIZE];
	unsigned int round;
};

#endif // CACHESIMSETASSO_H_INCLUDED