import { Bee } from '@ethersphere/bee-js'
import { Binary } from 'cafe-utility'
import { Bytes, MantarayNode } from 'mantaray-js'

export async function createMantarayWithMetadata(
  bee: Bee,
  stamp: string,
  key: string,
  value: string,
): Promise<string> {
  const mantaray = new MantarayNode()
  mantaray.setMetadata = {
    [key]: value,
  }
  return Binary.uint8ArrayToHex(
    await mantaray.save(async data => {
      const uploadDataResult = await bee.uploadData(stamp, data)
      return Binary.hexToUint8Array(uploadDataResult.reference) as Bytes<32>
    }),
  )
}
