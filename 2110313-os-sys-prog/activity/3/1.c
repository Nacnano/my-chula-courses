#include <stdio.h>
#include <unistd.h>
#include <sys/types.h>

int main()
{
    int pid1, pid2;

    printf("I am the parent process. My PID is %d.\n", getppid());

    pid1 = fork();

    if (pid1 == 0)
    {
        printf("I am the child process. My PID is %d.\n", getppid());

        pid2 = fork();

        if (pid2 == 0)
        {
            printf("I am the grandchild process. My PID is %d.\n", getppid());
        }
        else if (pid2 > 0)
        {
            sleep(1);
        }
        else
        {
            printf("Cannot fork for grandchild process\n");
        }
    }
    else if (pid1 > 0)
    {
        sleep(1);
    }
    else
    {
        printf("Cannot fork for child process\n");
    }

    return 0;
}
