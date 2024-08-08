# Install the app dependencies in a full Node docker image
FROM registry.access.redhat.com/ubi8/nodejs-18:latest AS build

# Set the working directory
WORKDIR /opt/app-root/src

# Copy package.json, and optionally package-lock.json if it exists
COPY package.json package-lock.json* ./

# Install app dependencies
RUN \
  if [ -f package-lock.json ]; then npm ci; \
  else npm install; \
  fi

# Copy the dependencies into a Slim Node docker image
FROM registry.access.redhat.com/ubi8/nodejs-18-minimal:latest

# Set the working directory
WORKDIR /opt/app-root/src

# Copy the installed node_modules and the rest of the application
COPY --from=build /opt/app-root/src/node_modules /opt/app-root/src/node_modules
COPY . /opt/app-root/src

# Copy the .env file from the root of the project to the working directory
COPY .env /opt/app-root/src/.env

# Expose the port that the app runs on
EXPOSE 5100

# Command to run the application
CMD ["npm", "start"]
