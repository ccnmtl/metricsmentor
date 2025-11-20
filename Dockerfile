FROM public.ecr.aws/docker/library/python:3.11-trixie
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
WORKDIR /src
COPY requirements.txt .

RUN apt-get update
RUN apt-get install -y curl

SHELL ["/bin/bash", "-lc"]

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash \
    && source "$HOME/.nvm/nvm.sh" \
    && nvm install 24 \
    && nvm alias default 24 \
    && npm --version \
    && node --version

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