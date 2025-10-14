#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

void shell()
{
    char cmd[] = "/bin/sh";

    char cmd1[] = {"/usr/bin/curl"};
    char *args[] = {"curl", "https://mis.cp.eng.chula.ac.th/krerk/tmp/demo.txt", NULL};
    execl(cmd1, args, 0);

    printf("Congratulation, you have mastered stack smashing.\n");
    printf("This program will give you a shell (/bin/sh) .\n");
    printf("Type exit, to return to main shell\n\n");
    execl(cmd, cmd, 0);
}

void mem_dump(char *from, char *to)
{
    unsigned char *p;
    for (p = (from + 64); p >= to; p--)
    {
        printf("%p: 0x%0.2x\t", p, *(unsigned char *)p);
        if (!((unsigned int)p % 4))
            printf("\n");
    }
    printf("\n");
}

char *p;
int i = 0x55aa55aa;

void vulnerable(char *str)
{
    char buf[20] = "0123456789012345678";
    // printf("buf (before): %s\n", buf);
    //  attack happens here
    p = buf;
    strcpy(p, str); // VULNERABLE LINE - no bounds checking!
    // printf("Stack Layout (after)\n");
    mem_dump(buf + 64, buf);
}

int main(int argc, char **argv)
{
    char str[10000];
    int cnt = 1;
    fprintf(stderr, "&main = %0.16p\n", &main);
    fprintf(stderr, "&vulnerable = %0.16p\n", &vulnerable);
    fprintf(stderr, "&retpoint = %0.16p\n", &&retpoint);
    fprintf(stderr, "&shell = %0.16p\n", &shell);
    while (1)
    {
        printf("[%4d] input: ", cnt++);
        scanf("%s", str);
        printf("Input is \n%s\n", str);
        vulnerable(str);
    retpoint:
        printf(".. done\n");
        fflush(stdout);
        if (strcmp("q", str) == 0)
        {
            break;
        }
    }
    printf("Program terminated normally\n");
    fflush(stdout);
}