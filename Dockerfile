# Set the base image to use for subsequent instructions
FROM node:slim

# Copy the repository contents to the container
COPY . .

# RUN npm install --production

# Run the specified command within the container
ENTRYPOINT ["node", "/dist/index.js"]
