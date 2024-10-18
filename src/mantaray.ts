import { Bee } from '@ethersphere/bee-js'
import { Binary } from 'cafe-utility'
import { Bytes, MantarayNode, Reference } from 'mantaray-js'

export async function createMantarayWithMetadata(
  bee: Bee,
  stamp: string,
  key: string,
  value: string,
): Promise<Reference> {
  const mantaray = new MantarayNode()
  mantaray.setMetadata = {
    [key]: value,
  }
  return mantaray.save(async data => {
    const uploadDataResult = await bee.uploadData(stamp, data)
    return Binary.hexToUint8Array(uploadDataResult.reference) as Bytes<32>
  })
}
