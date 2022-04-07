import { Node } from 'src/domain/cluster/node'

export interface NodeSearch {
  byNodeName(nodeName: string): Promise<Node[]>
  byClusterName(clusterName: string): Promise<Node[]>
}

export const NODE_SEARCH = 'NodeSearch'
