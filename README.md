## Docker References 
[Get Started](https://docs.docker.com/get-started/)



1. `docker run -d hello-world`
- Because I don't have it in me to deal with the whole fUlLy QuAliFiEd DoMaIn NaMe (FQDN) thing right now


Tag the build: `docker build --tag=initialhello .`

>  SECURITY WARNING: You are building a Docker image from Windows against a non-Windows Docker host. All files and directories added to build context will have '-rwxr-xr-x' permissions. It is recommended to double check and reset permissions for sensitive files and directories. 

- oh, oh good.


2. `docker run -p 4000:80 initialhello`
    2a. `docker run -d -p 4000:80 initialhello`

3. `winpty docker login`
    - TODO: Figure out what this TTY is all about

4. `docker tag initialhello agasper01/get-started:part2`