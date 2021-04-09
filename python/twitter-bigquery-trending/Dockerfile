FROM python:3.7
RUN mkdir app
# Copy reqiurements and install before copying the entire folder
# this prevents changes to the app dir from invalidating the cache
# and causing Docker to reinstall every build
COPY requirements.txt ./app/requirements.txt
RUN python -m pip install -r ./app/requirements.txt
RUN apt-get update && apt-get install -y vim
COPY ./* ./app
RUN chmod +x ./app/main.py
CMD ["./app/start.sh"]
