import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { Dictionary } from '../utils/base'
import { AttributePropertyType, KeySchemaType } from '../utils/types'

let dynamoDBClient: DynamoDBClient

if (!dynamoDBClient) {
  console.log('dynamoDb init')
  dynamoDBClient = new DynamoDBClient({ region: 'ap-northeast-2' })
}

interface ICreateTable {
  tableName: string
  tableAttribute: Dictionary<{
    propertyType: AttributePropertyType
    keySchemaType: KeySchemaType
  }>[]
  config: {
    enableStream?: boolean // default false,
    readCapacity?: number // default 1
    writeCapacity?: number // default 1
  }
}

export class DynamoManager {
  async createTable() {}

  async retrieveItem() {}

  async updateItem() {}

  async deleteItem() {}

  async batchRetrieve() {}

  async batchUpadte() {}

  async queryRetrieve() {}
  wang() {}
}
