# Use official Node image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm ci --only=production

# Bundle app source
COPY . .

# Expose port (match `PORT` in your .env)
EXPOSE 4000

# Start the server
CMD [ "npm", "start" ]
