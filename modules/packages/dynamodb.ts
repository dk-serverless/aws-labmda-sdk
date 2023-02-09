import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
const dynamoClient = new DynamoDBClient({ region: 'us-east-2' })
export { dynamoClient }
