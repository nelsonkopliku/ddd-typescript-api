import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common'
import { UnableToAddNode, UnableToRemoveNode } from 'src/domain/cluster/exceptions'
import { NonExistentCluster } from 'src/domain/cluster/exceptions/nonexistent-cluster.exception'
import { EntityNotFoundError, QueryFailedError } from 'typeorm'

type HandledExceptions =
  | QueryFailedError
  | EntityNotFoundError
  | NonExistentCluster
  | UnableToAddNode
  | UnableToRemoveNode
@Catch(QueryFailedError, EntityNotFoundError, NonExistentCluster, UnableToAddNode, UnableToRemoveNode)
export class ClusterManagementExceptionFilter implements ExceptionFilter {
  catch(exception: HandledExceptions, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const request = ctx.getRequest()

    let status = HttpStatus.INTERNAL_SERVER_ERROR
    let message = `Internal server error`

    if (exception instanceof QueryFailedError) {
      switch ((exception as any).code) {
        case 'ER_DUP_ENTRY':
          status = HttpStatus.BAD_REQUEST

          const alreadyExistingNodeName = request.body.name
          const clusterName = request.body.cluster

          message = `Node '${alreadyExistingNodeName}' already exists on cluster '${clusterName}'`

          break
        default:
      }
    } else if (exception instanceof NonExistentCluster) {
      status = HttpStatus.BAD_REQUEST

      const clusterName = request.params.clusterName

      message = `Operation not permitted on non existent cluster '${clusterName}'`
    } else if (exception instanceof UnableToAddNode) {
      status = HttpStatus.BAD_REQUEST
      message = exception.message
    } else if (exception instanceof UnableToRemoveNode) {
      status = HttpStatus.FORBIDDEN
      message = exception.message
    } else {
      status = HttpStatus.NOT_FOUND
      message = `Unable to perform operation on not existent node`
    }

    response.status(status).json({
      statusCode: status,
      message,
    })
  }
}
