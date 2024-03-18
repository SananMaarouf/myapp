# Use the official Node.js 20 image as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the project files to the working directory
COPY . .

# Expose the port that Next.js will run on (change it if needed)
EXPOSE 3000

# Generate the Prisma Client
RUN npx prisma generate

# Apply any pending migrations
RUN npx prisma db seed

# Build the Next.js project
RUN npm run build

# Set the environment variable for Prisma to use SQLite as the database
ENV DATABASE_URL="sqlite:./prisma/dev.db"

# Run the Next.js server
CMD ["npm", "run", "start"]