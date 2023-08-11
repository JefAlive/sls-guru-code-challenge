import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'

let options = {}
if (process.env.IS_OFFLINE) {
  options = {
    region: 'localhost',
    endpoint: 'http://0.0.0.0:8000',
    credentials: {
      accessKeyId: 'MockAccessKeyId',
      secretAccessKey: 'MockSecretAccessKey'
    }
  }
}

const client = new DynamoDBClient(options)
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: {
    convertClassInstanceToMap: true,
    removeUndefinedValues: true
  }
})

export default docClient;