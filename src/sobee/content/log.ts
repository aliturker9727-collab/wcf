import { Logger } from 'tslog'

export const Log = new Logger({
  name: 'Sobee',
  prettyLogTemplate: '{{dateIsoStr}} {{logLevelName}} [{{name}}]: ',
})
