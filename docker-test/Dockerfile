FROM bash

COPY docker-entrypoint.sh .

RUN alias ll='ls -l'

# Add Tini
ENV TINI_VERSION v0.19.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini-static /tini
RUN chmod +x /tini
# Use -g flag so that tini will kill the whole process group : 
# https://github.com/krallin/tini#process-group-killing
ENTRYPOINT ["/tini", "-g", "--"]

# ENTRYPOINT [ "bash",  "docker-entrypoint.sh" ]
CMD [ "./docker-entrypoint.sh" ]
