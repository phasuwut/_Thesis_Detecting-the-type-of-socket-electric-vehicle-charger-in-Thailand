# Base image
FROM node:18.17

# Set working directory
WORKDIR /usr/src/app

# Add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# Install app dependencies
COPY package*.json ./
RUN npm install
RUN npm install react-scripts -g

# Copy app source code (assuming you have an app source code folder)
COPY . .

# Start app
CMD ["npm", "start"]
