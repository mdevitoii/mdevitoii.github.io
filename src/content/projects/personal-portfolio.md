---
title: 'Personal Portfolio'
description: 'Creating my portfolio'
keywords: 'Astro, HTML, CSS, GitHub'
pubDate: 'Sep 25 2026'
updatedDate: 'Oct 3 2026'
---

## Developing /var/log/michael
As I was entering my first few days of being a senior at Messiah University, the reality set in that this is my final year at this university. Looking back on previous years and accomplishments made, I came to the conclusion that I needed a source to document it all. Ideally, I could make something that would allow me to create blog-style posts about coursework and personal projects, while also containing a space for my resume and certifications. And thus, the idea of /var/log/michael was born.

![Astro Logo](/images/astro-logo.png)

## Wait, what is Astro?
My first instinct was to create a static web page: barebones HTML and CSS. However, I realized that I wanted to make the writing process for my "blog" as simple as possible. That's when I decided to take this project a step further and opt for a dynamic solution. After doing some research, I chose to use the Astro web framework. This was primarily because of the convenient file structure that Astro allows for, as well as being able to convert markdown files to HTML. 

Whenever I want to make a new post, instead of having to code out all the HTML for it, I simply just push a new markdown file to this site's GitHub repository. From there, Astro converts the markdown text into HTML and sets it within the main layout that my site uses. And, just like that, a new post has been made. This has been very fun to mess around with, and I am grateful for how smoothly this works. I hope that the simplicity of only having to write markdown files for posts inspires me to post frequently on here.

## Development Process
I began development by first installing Astro in a directory on my development VM. I develop within this virtual machine because of its location on my Proxmox infrastructure, and the ability to remotely access the machine using Apache Guacamole means that I can continue working on any device with a web browser. 

After developing the primary layout and figuring out how Astro's directory is organized, I consulted GitHub Copilot for help with CSS. Most of the CSS on this page was created using GPT-5.6 Luna, a less-powerful but still significantly capable model. Finally, after putting on some human touches and changing the color scheme, I was ready to begin writing this article!

## Hopes for /var/log/michael
The primary motive behind developing this page was to showcase my personal work and passion for cybersecurity. This site is also an extension of my resume, as most of my work cannot be consolidated into a single page.