import { Node } from '../../node'
import { ClusterName } from '../../value-objects/cluster-vo'
import { NodeId } from '../../value-objects/node-vo'

export interface PowerManagementService {
  powerOn(node: Node)
  shutDown(node: Node)
  reboot(node: Node)
}

export type PowerManagementOperation = { cluster: ClusterName; node: NodeId }

export type PowerOnNode = PowerManagementOperation
export type ShutDownOnNode = PowerManagementOperation
export type RebootNode = PowerManagementOperation

export const POWER_MANAGEMENT_SERVICE = 'PowerManagementService'
