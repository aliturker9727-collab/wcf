import { Sobee } from '@/sobee'

if (Sobee.Environment.Debug)
  Sobee.Log.info('Debug mode enabled')

const Hub = new Sobee.Network.Socket.Hub(Sobee.Environment.Port, [
  Sobee.Messages.Scenario.Control.Information,
  Sobee.Messages.Information,
  Sobee.Messages.GClass236,
  Sobee.Messages.GClass237,
  Sobee.Messages.GClass238,
  Sobee.Messages.GClass260,
])
