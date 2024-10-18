import { Bee } from '@ethersphere/bee-js'
import { BEE_API, STAMP } from './globals'
import { createGsocListener } from './listener'
import { createMantarayWithMetadata } from './mantaray'

main()

async function main() {
  const bee = new Bee(BEE_API)
  console.log(await createMantarayWithMetadata(bee, STAMP, 'secretkey', 'secretvalue'))
  if (0) {
    createGsocListener()
  }
}
