# Frontend Dockerfile

# Step 1: Use the official Node image
FROM node:20 AS frontend

# Set the working directory inside the container
WORKDIR /usr/src/app

# Step 2: Copy the package.json and package-lock.json files and install dependencies for the frontend
COPY package.json package-lock.json ./

# Install dependencies for the frontend
RUN npm install

# Step 3: Copy all the frontend source files
COPY . .

# Step 4: Expose the frontend port (if the React app runs on port 3000)
EXPOSE 3000

# Step 5: Start the frontend app
CMD ["npm", "start"]