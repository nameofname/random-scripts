FROM python:3.7
RUN mkdir app
COPY ./* ./app
RUN python -m pip install -r ./app/requirements.txt
RUN chmod +x ./app/main.py
RUN apt-get update && apt-get install -y vim
CMD ["./app/main.py"]
