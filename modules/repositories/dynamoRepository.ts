import { AttributeDefinition, CreateTableCommand, CreateTableInput, KeySchemaElement } from '@aws-sdk/client-dynamodb'
import { dynamoClient } from '../packages/dynamodb'
import { Dictionary, oEntries } from '../utils/base'
import { loggerAfterReturnValue } from '../utils/logger'

interface ICreateTable {
  tableName: string
  tableAttribute: Dictionary<{
    propertyType: string
    keySchemaType: string
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

class DynamoDBRepository {
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

    const tables: CreateTableInput = {
      ...tableProperty,
      ProvisionedThroughput: {
        ReadCapacityUnits: params?.config?.readCapacity ?? 1,
        WriteCapacityUnits: params?.config?.writeCapacity ?? 1,
      },
      TableName: params.tableName,
      StreamSpecification: {
        StreamEnabled: params?.config?.enableStream,
      },
    }

    const data = await dynamoClient.send(new CreateTableCommand(tables))
    return loggerAfterReturnValue(console.log, `[DynamoDB Create] : ${data.$metadata.httpStatusCode}`)
  }

  isExistTable() {}
}

export const dynamoDBRepository = new DynamoDBRepository()
