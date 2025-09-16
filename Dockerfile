FROM node:20-slim

WORKDIR /app

COPY package*.json ./

RUN apt-get update && apt-get install -y \
    libcairo2-dev \
    libpango1.0-dev \
    libjpeg-dev \
    libgif-dev \
    librsvg2-dev \
    build-essential \
    git \
    && rm -rf /var/lib/apt/lists/*

RUN npm install --production

COPY . .

CMD ["node", "index.js"]

