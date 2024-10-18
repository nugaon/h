import { InformationSignal } from '@anythread/gsoc'
import { BEE_API, GSOC_ID, STAMP, TARGET_OVERLAY } from './globals'

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
const informationSignal = new InformationSignal(BEE_API, {
  postageBatchId: STAMP,
  consensus: {
    id: GSOC_ID,
    assertRecord,
  },
})
const { resourceId } = informationSignal.mine(TARGET_OVERLAY, 16)

// subscribe to incoming topics on the receiver node
// this will immediately invoke `onMessage` and `onError` function if the message arrives to the target neighborhood of the Kademlia network.
const cancelSub = informationSignal.subscribe(
  // eslint-disable-next-line no-console
  { onMessage: msg => console.log('hack', msg), onError: console.log },
  resourceId,
)
