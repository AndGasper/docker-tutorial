## Docker References 
[Get Started](https://docs.docker.com/get-started/)


2. `docker run -p 4000:80 initialhello`
    2a. `docker run -d -p 4000:80 initialhello`

3. `winpty docker login`

4. `docker tag initialhello agasper01/get-started:part2`


## Starting the swarm
```
docker stack deploy -c docker-compose.yml getstartedlab
```

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


## Using the http_test.js
`node ./http_test.js`
- Truth be told, I'm not really sure what this is for just yet. Just thought it'd be interesting to see what would happen if I ran it 1000 times.