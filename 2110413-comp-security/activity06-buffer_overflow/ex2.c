#include <string.h>
#include <stdio.h>

void greeting()
{
    printf("Welcome to exercise II\n");
    printf("I hope you enjoy it\n\n");
}

void mem_dump(char *from, char *to)
{
    char *p;
    for (p = (from + 64); p >= to; p--)
    {
        printf("%p: 0x%02x\t", p, *(unsigned char *)p);
        if (!((unsigned long)p % 2))
            printf("\n");
    }
    printf("\n");
}

void concat_arguments(int argc, char **argv)
{
    char buf[20] = "0123456789012345678";
    char *p = buf;
    int i;
    printf("&i = %p\n", &i);
    printf("&buf[0] = %p\n", buf);

    p = buf;
    for (i = 1; i < argc; i++)
    {
        strcpy(p, argv[i]);
        p += strlen(argv[i]);
        if (i + 1 != argc)
        {
            *p++ = ' ';
        }
    }
    printf("%s\n", buf);
}

int main(int argc, char **argv)
{
    printf("&main = %p\n", &main);
    printf("&myfunction = %p\n", &concat_arguments);
    printf("&greeting = %p\n", &greeting);
    greeting();
    concat_arguments(argc, argv);
}