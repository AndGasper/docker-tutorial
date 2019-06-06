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


swarm name?
```
docker stack deploy -c docker-compose.yml getstartedlab
```

```
ID                  NAME                  IMAGE                         NODE                    DESIRED STATE       CURRENT STATE                ERROR               PORTS
t9rkj479quin        getstartedlab_web.1   agasper01/get-started:part2   linuxkit-00155dd1010b   Running             Running about a minute ago
xtu7gon7vza9        getstartedlab_web.2   agasper01/get-started:part2   linuxkit-00155dd1010b   Running             Running about a minute ago
lpfb1b2yhdcx        getstartedlab_web.3   agasper01/get-started:part2   linuxkit-00155dd1010b   Running             Running about a minute ago
ostymy4bm34b        getstartedlab_web.4   agasper01/get-started:part2   linuxkit-00155dd1010b   Running             Running about a minute ago
vd9u98ewu28j        getstartedlab_web.5   agasper01/get-started:part2   linuxkit-00155dd1010b   Running             Running about a minute ago

```


Updating 


```
# make the image
docker build --tag={tagname} {context}
# Tag the image
docker tag initialhello agasper01/get-started:part2
```

ba02ab567bc0


docker service ls
```
me1fkknlj9c0
``` 

Take the image hash from the `docker service ls`

docker service update --image {newimage} {SERVICE}

I must have screwed up the tagging because the username/projectname:tagname picked up to the old one


Command: 
```
docker service update --image agasper01/get-started:mk1 me1fkknlj9c0
```
Output: A lot of stuff about updating
Verify the container has the latest image with:
`docker service ls`


## Updating the image running in the swarm

```
# Build the image and name (--tag)
docker build --tag={image} {context}
# Tag the image
docker tag {image} {tagname}
# Update the swarm
docker service update --image {tagname} {serviceid}
```

Note: you can get service id from `docker service ls`