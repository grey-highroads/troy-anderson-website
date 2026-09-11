import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'gknd24m7',
    dataset: 'production'
  },
  deployment: {
    autoUpdates: false,
  },
})
