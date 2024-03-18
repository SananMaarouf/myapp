
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


This project was made for Attensi as part of technical interview.

It was made with:

Next.JS, TailwindCSS and Prisma. The database is Sqlite3.

## Getting Started
There are two ways to use this project, you can run it locally on your machine using Docker, or spin up a development server.
**Using Docker**
Build an image from the dockerfile

     docker build -t attensi .
   then

     docker run -p 3000:3000 -d attensi
open your browser and go to [http://localhost:3000/](http://localhost:3000/)
 
**Using dev server**

With the package manager of your choice

```bash

npm  run  dev

# or

yarn  dev

# or

pnpm  dev

# or

bun  dev

```

   

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
