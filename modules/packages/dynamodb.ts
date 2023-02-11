import {
  AttributeDefinition,
  AttributeValue,
  CreateTableCommand,
  DeleteItemCommand,
  DynamoDBClient,
  GetItemCommand,
  KeySchemaElement,
  PutItemCommand,
} from '@aws-sdk/client-dynamodb'
import { Dictionary, oEntries } from '../utils/base'
import { loggerAfterReturnValue } from '../utils/logger'
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

type DynamoDbPropertyType = {
  AttributeDefinitions: AttributeDefinition[]
  KeySchema: KeySchemaElement[]
}

export class DynamoManager {
  async createTable(params: ICreateTable) {
    if (!params || !params?.tableAttribute || params?.tableAttribute?.length === 0) return null

    const tableProperty = params?.tableAttribute.reduce(
      (acc, cur) => {
        const [propertyKey, { keySchemaType, propertyType }] = oEntries(cur)[0]

        acc['AttributeDefinitions'].push({
          AttributeName: propertyKey,
          AttributeType: propertyType,
        })

        acc['KeySchema'].push({
          AttributeName: propertyKey,
          KeyType: keySchemaType,
        })

        return acc
      },
      {
        AttributeDefinitions: [],
        KeySchema: [],
      } as DynamoDbPropertyType
    )

    const data = await dynamoDBClient.send(
      new CreateTableCommand({
        ...tableProperty,
        ProvisionedThroughput: {
          ReadCapacityUnits: params?.config?.readCapacity ?? 1,
          WriteCapacityUnits: params?.config?.writeCapacity ?? 1,
        },
        TableName: params.tableName,
        StreamSpecification: {
          StreamEnabled: params?.config?.enableStream,
        },
      })
    )

    return loggerAfterReturnValue(console.log, data)
  }

  async retrieveItem(tableName: string, key: Record<string, AttributeValue>) {
    return dynamoDBClient
      .send(new GetItemCommand({ TableName: tableName, Key: key }))
      .then((res) => loggerAfterReturnValue(console.log, res))
  }

  async updateItem(tableName: string, item: Record<string, AttributeValue>) {
    return dynamoDBClient
      .send(new PutItemCommand({ TableName: tableName, Item: item }))
      .then((res) => loggerAfterReturnValue(console.log, res))
  }

  async deleteItem(tableName: string, key: Record<string, AttributeValue>) {
    return dynamoDBClient
      .send(new DeleteItemCommand({ TableName: tableName, Key: key }))
      .then((res) => loggerAfterReturnValue(console.log, res))
  }

  async batchRetrieve() {}

  async batchUpadte() {}

  async queryRetrieve() {}
  wang() {}
}
