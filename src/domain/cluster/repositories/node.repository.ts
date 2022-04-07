import { Node } from '../node'
import { NodeId } from '../value-objects/node-vo'

export interface NodeRepository {
  save(node: Node): void
  update(id: NodeId, node: Partial<Node>): void
  find(id: NodeId): Promise<Node>
  delete(node: NodeId): void
}

export const NODE_REPOSITORY = 'NodeRepository'
