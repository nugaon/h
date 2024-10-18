import { Bee } from '@ethersphere/bee-js'
import { Wallet } from 'ethers'

const PK = '4259c61fd17b19ab471bd3148742b4fe13006b2182022f0f4906004d3c8a2d98'
const TOPIC = '00'.repeat(32)

interface FeedCreation {
  feedKeyAddress: string
  feedUploadAddress: string
  feedManifestAddress: string
}

export async function createFeed(
  bee: Bee,
  stamp: string,
  update1: string,
  update2: string,
): Promise<FeedCreation> {
  const wallet = new Wallet(PK)
  const manifest = await bee.createFeedManifest(stamp, 'sequence', TOPIC, wallet.address)
  const feedWriter = bee.makeFeedWriter('sequence', TOPIC, PK)
  const upload1 = await bee.uploadData(stamp, update1)
  const upload2 = await bee.uploadData(stamp, update2)
  feedWriter.upload(stamp, upload1.reference, { index: 0 })
  const feedUploadResults = await feedWriter.upload(stamp, upload2.reference, { index: 1 })
  return {
    feedKeyAddress: wallet.address,
    feedUploadAddress: feedUploadResults.reference,
    feedManifestAddress: manifest.reference,
  }
}
