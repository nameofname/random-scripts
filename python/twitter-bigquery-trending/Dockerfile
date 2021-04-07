FROM python:3.7
RUN mkdir app
COPY ./* ./app
RUN python -m pip install -r ./app/requirements.txt
RUN chmod +x ./app/main.py
CMD ["./app/main.py"]
