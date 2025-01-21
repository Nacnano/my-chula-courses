#include <stdio.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/wait.h>

int main()
{
    int i;
    int n = 4;
    pid_t childpid;

    for (i = 0; i < n; ++i)
    {
        childpid = fork();

        // if (childpid > 0)
        // {
        //     // wait(0);
        //     break;
        // }
    }

    printf("This is process %ld with parent %ld\n", (long)getpid(), (long)getppid());
    return 0;
}
