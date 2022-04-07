import { Node } from 'src/domain/cluster/node'
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Entity('nodes')
@Index(['cluster', 'name'], { unique: true })
export class NodeEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: string

  @Column({
    name: 'cluster',
    nullable: false,
  })
  public cluster!: string

  @Column({
    name: 'name',
    nullable: false,
  })
  @Index(['name'], {
    fulltext: true,
  })
  public name!: string

  @Column({
    name: 'is_powered_on',
    type: 'boolean',
    nullable: false,
    default: false,
  })
  public isPoweredOn = false

  public static fromNode(node: Node): NodeEntity {
    const self = new NodeEntity()
    const { id, cluster, name, poweredOn } = node
    if (id) self.id = id
    self.cluster = cluster
    self.name = name
    self.isPoweredOn = poweredOn
    return self
  }

  public toNode(): Node {
    const { id, cluster, name, isPoweredOn } = this
    return Node.reconstitute(id, cluster, name, isPoweredOn)
  }
}
