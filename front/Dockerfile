FROM node:13.12.0-alpine

WORKDIR /app

# COPY package.json ./
# COPY package-lock.json ./
COPY . ./

CMD ["cd front", "npm", "install"]

# RUN npm install


CMD ["npm", "start"]