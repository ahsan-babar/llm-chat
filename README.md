# Project Setup

This guide will help you set up your environment variables and run the application using Docker Compose.

## Environment Setup

1. Locate the `.env.example` file in the root directory of the project.

2. Make a copy of the `.env.example` file and rename it to `.env`.

   On a Mac, you can do this in the terminal with the following command:

   ```bash
   cp .env.example .env
   ```

3. Open the .env file and replace the example values with your actual values.

**Note:** The `.env` file is typically included in the `.gitignore` file to prevent sharing sensitive information. Make sure not to commit your `.env` file to the repository.


### Environment Variables
Here is the list of environment variables used to configure production of application.

 | Variables                         | Valid Value | Default Value                                 | Description                                                                   |
 | ----------------------------------| ------------| ----------------------------------------------| ------------------------------------------------------------------------------|
 | `NODE_ENV`                        | String      | development                                   | The environment varaible                                                  |
 | `PORT`                             | Number      | 3000                                             | Port for NestJS Application  |
 | `MONGODB_URI`           | String  | mongodb://mongo:27017/llm-chat                                    | MongoDB Connection string|
 | `LLM_SERVER_URL`           | String  |              http://llm-chat-server:3000                  | Python FastAPI Server URL|
 | `MISTRAL_MODEL_ID`           | String  | {{Hugging Face Model Ids}}                                    | [Hugging Face](https://huggingface.co/) Model Id|
 | `LLAMA_MODEL_ID`           | String  | {{Hugging Face Model Ids}}                                    | [Hugging Face](https://huggingface.co/) Model Id|
 | `HF_TOKEN`           | String  | {{Hugging Face Auth Token}}                                    | [Hugging Face](https://huggingface.co/) Auth Token|



## Running the Application with Docker Compose

Ensure Docker and Docker Compose are installed on your machine. If not, you can download them from the [Docker website](https://www.docker.com/products/docker-desktop).

To start the application, navigate to the root directory of the project in your terminal and run:

```bash
docker-compose up
```

To stop the application, press `Ctrl+C` in the terminal where you ran `docker-compose up`. To remove the containers entirely, run:

```bash
docker-compose down
```

**Note:** Docker Compose runs all services in the background by default. If you want to run them in the foreground, use `docker-compose up -d`.
```

## Python FastAPI Server
1. Python Chat server will be listening on http://localhost:3000
2. Swagger API docs can be viewed http://localhost:3000/docs

## Nest.js API Server
1. Nest.js Chat server will be listening on http://localhost:3001
2. Swagger API docs can be viewed http://localhost:3001/api/docs