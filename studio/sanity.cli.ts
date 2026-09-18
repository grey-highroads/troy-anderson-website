import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'gknd24m7',
    dataset: 'production'
  },
  deployment: {
    appId: 't79qynbc05nitxgc59r4fq63',
    autoUpdates: false,
  },
})
