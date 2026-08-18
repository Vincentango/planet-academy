import { runSeed } from './index'

runSeed().catch((err) => {
  console.error(err)
  process.exit(1)
})
