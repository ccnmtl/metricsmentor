FROM public.ecr.aws/docker/library/python:3.11.3-bullseye@sha256:13927a8172d13b6cdc87f50bf0a38ff4eceef05262f83870c9f6474d16117687
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
WORKDIR /src
COPY requirements.txt .

RUN apt-get update && \
 apt-get install -y \
    nodejs npm

RUN curl -fsSL https://deb.nodesource.com/setup_current.x | bash - && \
    apt-get install -y nodejs

RUN pip install --upgrade pip && \
    pip install --no-deps -r requirements.txt
COPY . .

RUN rm -rf local_settings.py

COPY ["package*.json","./"]

RUN npm install
RUN npm run build:prod
EXPOSE 8000
RUN chmod u+x entrypoint.sh

CMD ["./entrypoint.sh"]