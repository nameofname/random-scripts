# A little playground for docker

I created this to play around with running docker from the cli to understand the differneces between ENTRYPOINT and CMD, and also figure out some things about how docker handles processes. 

## ENTRYPOINT vs CMD : 

- ENTRYPOINT will pass arguments to your executable
- CMD wont
- You can use ENTRYPOINT together with CMD
- You can pass a command to docker container with the docker run command and it will override the docker CMD directive
	- ie. `docker run test-container echo 'heyo'`
	- this replaces whatever is inside the CMD directive
	- in this way, CMD is like default behavior

## Processes in Docker

- Docker ENTRYPOINT or CMD runs as PID 1 inside the container
- sending SIGTERM (ctrl+C) to the running container kills whatever is running under PID 1
- however, this doesn't work exactly as it would in a non-containerized environment
- there are a bunch of good posts about this, I don't really get it all, but it's interesting, check out the following 
	- https://www.ctl.io/developers/blog/post/gracefully-stopping-docker-containers/	- https://github.com/krallin/tini#process-group-killing
- the solution I came up with is: use tini with the -g flag as your entrypoint, then hitting ctrl+C kills the container and child processes. 