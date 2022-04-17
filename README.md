# Awaken Twitch Bot

The twitch bot for my Awaken: Chaos Era API

# Installation

## Requirements

- Docker

## Setup

- You will need to do the setup for discord.js

- Clone the repository

- Copy the .env.example file and name it .env
  `cp .env.example .env`

- fill the .env variable with your discord auth token
  `AUTH_TOKEN={ your_token }`

- Build the container
  `docker build . -t '{ app_name }:{ tag }'`

- run the container
  `docker run -it --rm { app_name }:{ tag }`

# Deploying

## Requirements

- A Heroku account and an empty heroku container

## Setup

You will need to set repository action secrets for the pipline to automatically deploy

- go to your repository settings -> secrets -> actions
- Add repository secrets with these key:value pairs
  - AUTH_TOKEN: { your token from the env file }
  - HEROKU_EMAIL: { the email you used to create your heroku account }
  - HEROKU_APP_NAME: { your apps name on heroku }
  - HEROKU_API_KEY: { your heroku api key } - on heroku go to account settings and scroll down until you see 'API KEY'
- All pushes to the `main` branch will now trigger automatic deploys and updates to your application

# Contributing

Please see the following files if you want to contribute to this project:

- [Code of Conduct](.github/CODE_OF_CONDUCT.md)
- [Contributing](.github/CONTRIBUTING.md)

# Authors

- **ImBrett** - _initial work_ - [github](https://github.com/ImBrett)

# License

This package is licensed under the [MIT License](./LICENSE)
