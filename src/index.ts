import { InformationSignal } from '@anythread/gsoc'

const beeUrl = 'http://159.89.31.18:1633/'
const postageBatchId = '8cf2ec7baae2d1e91724a438d1ec82621a4ccab6d8069e8a353430af2c4cb2c9' // for write operations, the Postage Batch ID must be set.
const id = 'SampleDapp:v1'
// it is also possible to mine the resourceId to the desired Bee node to ensure they will get the message as soon as possible on the forwarding Kademlia network
const targetBeeOverlayAddress = 'b0baf37700000000000000000000000000000000000000000000000000000000'

interface SampleDappRecord {
  /** text of the message */
  text: string
  /** creation time of the comment */
  timestamp: number
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

// subscribe to incoming topics on the receiver node
// this will immediately invoge `onMessage` and `onError` function if the message arrives to the target neighborhood of the Kademlia network.
const cancelSub = informationSignal.subscribe(
  // eslint-disable-next-line no-console
  { onMessage: msg => console.log('hack', msg), onError: console.log },
  resourceId,
)
