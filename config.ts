type Config = {
  listenPort: number,
  mongoUri: string
}

export const config: Config = {
  listenPort: +process.env.PORT || 8000,
  mongoUri: process.env.MONGO_URI,
}