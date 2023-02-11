import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
const dynamoClient = new DynamoDBClient({ region: 'ap-northeast-2' })
export { dynamoClient }
