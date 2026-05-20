import { Bee } from '@ethersphere/bee-js'
import { createFeed } from './feed'
import { BEE_API, STAMP } from './globals'
import { createGsocListener } from './listener'
import { createMantarayWithMetadata } from './mantaray'

main()

async function main() {
  const bee = new Bee(BEE_API)

  // create feed
  if (1) {
    console.log(await createFeed(bee, STAMP, 'hello1', 'hello2'))
  }

  // create mantaray
  if (0) {
    console.log(await createMantarayWithMetadata(bee, STAMP, 'secretkey', 'secretvalue'))
  }

  // create listener
  if (0) {
    createGsocListener()
  }
}
