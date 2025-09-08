# Activity 3 - Recon and Defense (Network Security I)

## Part 1: Preparation

1. Check ssh service status

![status](status.png)

2. Check VM's IP address

![ifconfig](ifconfig.png)

## Part 2: Reconnaissance

### Attacking localhost

![attacklocalhost](attacklocalhost.png)

### Attacking target host

![attacktargethost](attacktargethost.png)

### Attacking target VM

![attacktargetvm](attacktargetvm.png)

1. Notice the open ports on all 3 devices (the attacker notebook, the target notebook, and the target Linux VM). Does anything look suspicious, i.e., some ports that you are not aware of that are open on the VM or on your notebooks?

- Attacker notebook (localhost) : Ports 135, 3306, 445, 8089, and 8000 are open. Port 135 is Microsoft Windows RPC, 445 is also Microsoft Windows', but port 3306 was MySQL and port 8000 was Splunk which was open unknowingly.
- Target notebook : Ports 3000, 5000, 7000, 8080, and 9090 are open. 8080 is Apache and 9090 is Golang http server.
- Target VM : Ports 22 and 80 are open. 22 is OpenSSH Ubuntu 3 amd 80 is Apache.

2. Look at the information provided by nmap about your OS's on all 3 devices. Is the information correct? Why is it or why is it not correct?

The information is correct for Windows but not for MacOS and Linux where the OS was unable to be detected. However, the MAC address was identified as Apple.

3. What do you think about the information you can get using nmap? Scary?

You can get _a lot_ of information from nmap, including

- open ports
- what those ports are, the versions, protocols and such
- supported capabilities or http options
- the device type, OS, and network distance of the host
  The information is certainly useful for malicious purposes.

4. Look at the access.log file for the web server in your Linux VM. What IP addresses do you see accessing the web server? Which devices do these IP addresses belong to?

![accesslog](accesslog.png)

The IP address is 192.168.209.42, which is the IP address of the target notebook (which was also attacking this VM).

5. Find the nmap scan in the web server log. Copy the lines from the log file that were created because of the nmap scan.

![accesslog1](accesslog1.png)

![accesslog2](accesslog2.png)

![accesslog3](accesslog3.png)

Q6. After you successfully install your iptable rule(s), how do the reported results from your new nmap scan compare to your previous scan before using iptables? Look to see if OS detection, port open results, etc. have changed. Something(s) have definitely changed.

![attacktargetVM1](attacktargetVM_firewall1.png)
![attacktargetVM2](attacktargetVM_firewall2.png)

Only port 80 (Apache) is open, and the OS is now correctly detected as Linux.

Q7. Notice that nmap can still figure out you have Apache httpd running. Look at the access.log file for the web server in your Linux VM. Are the logs the same as in Part II?

There are more logs after the firewall is up.

```
192.168.209.70 - - [20/Sep/2022:05:01:38 +0000] "GET /nmaplowercheck1663650099 HTTP/1.1" 404 456 "-" "Mozilla/5.0 (compatible; Nmap Scripting Engine; https://nmap.org/book/nse.html)"
192.168.209.70 - - [20/Sep/2022:05:01:38 +0000] "POST / HTTP/1.1" 200 10945 "-" "Mozilla/5.0 (compatible; Nmap Scripting Engine; https://nmap.org/book/nse.html)"
192.168.209.70 - - [20/Sep/2022:05:01:38 +0000] "GET / HTTP/1.1" 200 10945 "-" "Mozilla/5.0 (compatible; Nmap Scripting Engine; https://nmap.org/book/nse.html)"
192.168.209.70 - - [20/Sep/2022:05:01:38 +0000] "OPTIONS / HTTP/1.1" 200 181 "-" "Mozilla/5.0 (compatible; Nmap Scripting Engine; https://nmap.org/book/nse.html)"
192.168.209.70 - - [20/Sep/2022:05:01:38 +0000] "GET /robots.txt HTTP/1.1" 404 456 "-" "Mozilla/5.0 (compatible; Nmap Scripting Engine; https://nmap.org/book/nse.html)"
192.168.209.70 - - [20/Sep/2022:05:01:38 +0000] "OPTIONS / HTTP/1.1" 200 181 "-" "Mozilla/5.0 (compatible; Nmap Scripting Engine; https://nmap.org/book/nse.html)"
192.168.209.70 - - [20/Sep/2022:05:01:38 +0000] "OPTIONS / HTTP/1.1" 200 181 "-" "Mozilla/5.0 (compatible; Nmap Scripting Engine; https://nmap.org/book/nse.html)"
192.168.209.70 - - [20/Sep/2022:05:01:38 +0000] "POST /sdk HTTP/1.1" 404 456 "-" "Mozilla/5.0 (compatible; Nmap Scripting Engine; https://nmap.org/book/nse.html)"
192.168.209.70 - - [20/Sep/2022:05:01:38 +0000] "GET /.git/HEAD HTTP/1.1" 404 456 "-" "Mozilla/5.0 (compatible; Nmap Scripting Engine; https://nmap.org/book/nse.html)"
192.168.209.70 - - [20/Sep/2022:05:01:38 +0000] "PROPFIND / HTTP/1.1" 405 524 "-" "Mozilla/5.0 (compatible; Nmap Scripting Engine; https://nmap.org/book/nse.html)"
192.168.209.70 - - [20/Sep/2022:05:01:38 +0000] "PROPFIND / HTTP/1.1" 405 524 "-" "Mozilla/5.0 (compatible; Nmap Scripting Engine; https://nmap.org/book/nse.html)"
192.168.209.70 - - [20/Sep/2022:05:01:38 +0000] "GET /HNAP1 HTTP/1.1" 404 456 "-" "Mozilla/5.0 (compatible; Nmap Scripting Engine; https://nmap.org/book/nse.html)"
192.168.209.70 - - [20/Sep/2022:05:01:38 +0000] "OPTIONS / HTTP/1.1" 200 181 "-" "Mozilla/5.0 (compatible; Nmap Scripting Engine; https://nmap.org/book/nse.html)"
192.168.209.70 - - [20/Sep/2022:05:01:38 +0000] "GET /evox/about HTTP/1.1" 404 456 "-" "Mozilla/5.0 (compatible; Nmap Scripting Engine; https://nmap.org/book/nse.html)"
192.168.209.70 - - [20/Sep/2022:05:01:38 +0000] "PROPFIND / HTTP/1.1" 405 524 "-" "Mozilla/5.0 (compatible; Nmap Scripting Engine; https://nmap.org/book/nse.html)"
192.168.209.70 - - [20/Sep/2022:05:01:38 +0000] "SWOK / HTTP/1.1" 501 499 "-" "Mozilla/5.0 (compatible; Nmap Scripting Engine; https://nmap.org/book/nse.html)"
192.168.209.70 - - [20/Sep/2022:05:01:38 +0000] "OPTIONS / HTTP/1.1" 200 181 "-" "Mozilla/5.0 (compatible; Nmap Scripting Engine; https://nmap.org/book/nse.html)"
192.168.209.70 - - [20/Sep/2022:05:01:38 +0000] "GET / HTTP/1.1" 200 10945 "-" "Mozilla/5.0 (compatible; Nmap Scripting Engine; https://nmap.org/book/nse.html)"
192.168.209.70 - - [20/Sep/2022:05:01:39 +0000] "OPTIONS / HTTP/1.1" 200 181 "-" "Mozilla/5.0 (compatible; Nmap Scripting Engine; https://nmap.org/book/nse.html)"
192.168.209.70 - - [20/Sep/2022:05:01:39 +0000] "OPTIONS / HTTP/1.1" 200 181 "-" "Mozilla/5.0 (compatible; Nmap Scripting Engine; https://nmap.org/book/nse.html)"
192.168.209.70 - - [20/Sep/2022:05:01:39 +0000] "GET /favicon.ico HTTP/1.1" 404 456 "-" "Mozilla/5.0 (compatible; Nmap Scripting Engine; https://nmap.org/book/nse.html)"
192.168.209.70 - - [20/Sep/2022:05:01:39 +0000] "OPTIONS / HTTP/1.1" 200 181 "-" "Mozilla/5.0 (compatible; Nmap Scripting Engine; https://nmap.org/book/nse.html)"
192.168.209.70 - - [20/Sep/2022:05:01:39 +0000] "OPTIONS / HTTP/1.1" 200 181 "-" "Mozilla/5.0 (compatible; Nmap Scripting Engine; https://nmap.org/book/nse.html)"
192.168.209.70 - - [20/Sep/2022:05:01:39 +0000] "OPTIONS / HTTP/1.1" 200 181 "-" "Mozilla/5.0 (compatible; Nmap Scripting Engine; https://nmap.org/book/nse.html)"
192.168.209.42 - - [20/Sep/2022:05:01:39 +0000] "OPTIONS / HTTP/1.1" 200 181 "-" "Mozilla/5.0 (compatible; Nmap Scripting Engine; https://nmap.org/book/nse.html)"
192.168.209.42 - - [20/Sep/2022:05:01:39 +0000] "PROPFIND / HTTP/1.1" 405 524 "-" "Mozilla/5.0 (compatible; Nmap Scripting Engine; https://nmap.org/book/nse.html)"
192.168.209.42 - - [20/Sep/2022:05:01:39 +0000] "OPTIONS / HTTP/1.1" 200 181 "-" "Mozilla/5.0 (compatible; Nmap Scripting Engine; https://nmap.org/book/nse.html)"
192.168.209.42 - - [20/Sep/2022:05:01:39 +0000] "GET /nmaplowercheck1663650099 HTTP/1.1" 404 456 "-" "Mozilla/5.0 (compatible; Nmap Scripting Engine; https://nmap.org/book/nse.html)"
192.168.209.42 - - [20/Sep/2022:05:01:39 +0000] "GET /.git/HEAD HTTP/1.1" 404 456 "-" "Mozilla/5.0 (compatible; Nmap Scripting Engine; https://nmap.org/book/nse.html)"
192.168.209.42 - - [20/Sep/2022:05:01:39 +0000] "POST /sdk HTTP/1.1" 404 456 "-" "Mozilla/5.0 (compatible; Nmap Scripting Engine; https://nmap.org/book/nse.html)"
192.168.209.42 - - [20/Sep/2022:05:01:39 +0000] "OPTIONS / HTTP/1.1" 200 181 "-" "Mozilla/5.0 (compatible; Nmap Scripting Engine; https://nmap.org/book/nse.html)"
192.168.209.42 - - [20/Sep/2022:05:01:39 +0000] "GET /robots.txt HTTP/1.1" 404 456 "-" "Mozilla/5.0 (compatible; Nmap Scripting Engine; https://nmap.org/book/nse.html)"
192.168.209.42 - - [20/Sep/2022:05:01:39 +0000] "GET / HTTP/1.1" 200 10945 "-" "Mozilla/5.0 (compatible; Nmap Scripting Engine; https://nmap.org/book/nse.html)"
192.168.209.42 - - [20/Sep/2022:05:01:39 +0000] "PROPFIND / HTTP/1.1" 405 524 "-" "Mozilla/5.0 (compatible; Nmap Scripting Engine; https://nmap.org/book/nse.html)"
192.168.209.42 - - [20/Sep/2022:05:01:39 +0000] "POST / HTTP/1.1" 200 10945 "-" "Mozilla/5.0 (compatible; Nmap Scripting Engine; https://nmap.org/book/nse.html)"
```

Q8. Explain whether or not you could prevent nmap from reaching the web server while still allowing legitimate clients to get service. Will a firewall be sufficient for this? Or do you need some other device? Please think critically about this.

A firewall would be sufficient to prevent nmap from reaching the server, because we can add rules that reject specific IP addresses or packet statuses.

Q9. What are your firewall rules? Run iptables -L on your VM and enter the output here.

![firewallrules](firewall.png)
