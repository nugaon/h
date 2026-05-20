import { InformationSignal } from '@anythread/gsoc'
import { BEE_API, GSOC_ID, STAMP, TARGET_OVERLAY } from './globals'

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
const informationSignal = new InformationSignal(BEE_API, {
  postageBatchId: STAMP,
  consensus: {
    id: GSOC_ID,
    assertRecord,
  },
})
const { resourceId } = informationSignal.mine(TARGET_OVERLAY, 16)

// write GSOC record that satisfies the message format with the `write` method.
const fn = async () => {
  const uploadedSoc = await informationSignal.write({ winner: 'Hello there' }, resourceId)
  // eslint-disable-next-line no-console
  console.log('all good', uploadedSoc)
}
fn()
