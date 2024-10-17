import { InformationSignal } from '@anythread/gsoc'

const beeUrl = 'http://159.89.31.18:1633/'
const postageBatchId = '0000000000000000000000000000000000000000000000000000000000000000' // for write operations, the Postage Batch ID must be set.
const id = 'SampleDapp:v1'
// it is also possible to mine the resourceId to the desired Bee node to ensure they will get the message as soon as possible on the forwarding Kademlia network
const targetBeeOverlayAddress = 'b0baf37700000000000000000000000000000000000000000000000000000000'

interface SampleDappRecord {
  /** winner of the message */
  winner: string
}

function assertRecord(value: unknown): asserts value is SampleDappRecord {
  if (value !== null && typeof value === 'object' && Object.keys(value).includes('winner')) {
    return
  }
  throw new Error('The given value is not a valid personal storage record')
}

// initialize object that will read and write the GSOC according to the passed consensus/configuration
const informationSignal = new InformationSignal(beeUrl, {
  postageBatchId,
  consensus: {
    id,
    assertRecord,
  },
})
const { resourceId } = informationSignal.mine(targetBeeOverlayAddress, 16)

// write GSOC record that satisfies the message format with the `write` method.
const fn = async () => {
  const uploadedSoc = await informationSignal.write({ winner: 'Hello there' }, resourceId)
  // eslint-disable-next-line no-console
  console.log('all good', uploadedSoc)
}
fn()
