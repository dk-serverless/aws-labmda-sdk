import { dynamoDBRepository } from './modules/repositories/dynamoRepository'
import { AttributeNameType, AttributePropertyType } from './modules/utils/types'

const dbRun = async () => {
  try {
    const result = await dynamoDBRepository.createTable({
      tableName: 'TEST_TABLE',
      tableAttribute: [
        {
          [AttributeNameType.SEASON]: {
            propertyType: AttributePropertyType.Number,
            keySchemaType: AttributePropertyType.HASH,
          },
        },
        {
          [AttributeNameType.EPISODE]: {
            propertyType: AttributePropertyType.Number,
            keySchemaType: AttributePropertyType.RANGE,
          },
        },
      ],
      config: {
        enableStream: false,
      },
    })

    console.log(result)
  } catch (e) {
    console.error('[ERROR] : ', e)
  }
}

new Promise((res, rej) => {
  res(1000)
}).then(() => {
  // db
  dbRun()
})
