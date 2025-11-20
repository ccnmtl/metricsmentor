FROM public.ecr.aws/docker/library/python:3.11-trixie
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
WORKDIR /src
COPY requirements.txt .

RUN apt-get update && \
    apt-get install -y curl && \
    curl -L https://raw.githubusercontent.com/tj/n/master/bin/n -o n && \
    bash n 22.16.0 && \
    apt-get clean

SHELL ["/bin/bash", "-o", "pipefail", "-c"]

RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir --no-deps -r requirements.txt
COPY . .

RUN rm -rf local_settings.py

COPY ["package*.json","./"]

RUN npm install
RUN npm run build:prod
EXPOSE 8000
RUN chmod u+x entrypoint.sh

CMD ["./entrypoint.sh"]