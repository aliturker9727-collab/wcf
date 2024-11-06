import { from as From } from 'env-var'
import dotenv from 'dotenv'

dotenv.config()
const Env = From(process.env, {})

export const Environment = {
  Debug: Env.get('DEBUG').required().asBool(),
  Port: Env.get('PORT').required().asPortNumber(),
  Fps: Env.get('FPS').required().asInt(),
}
