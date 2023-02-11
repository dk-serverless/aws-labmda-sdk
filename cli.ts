import { friendsRepository } from './modules/repositories/friends.repository'
import { AttributeNameType, AttributePropertyType, KeySchemaType } from './modules/utils/types'

const qoa = require('qoa')

enum CliFuncType {
  CREATE = 'create',
  DELETE = 'delete',
  UPDATE = 'update',
  GET = 'get',
  PUT = 'put',
  BATCH_WRITE = 'batch_write',
  BATCH_READ = 'batch_read',
  QUERY_SCAN = 'query_scan',
}

const runCli = async () =>
  await qoa
    .interactive({
      type: 'interactive',
      query: 'dynamoDB Friends Cli',
      handle: 'treat',
      symbol: '>',
      menu: [CliFuncType.CREATE, CliFuncType.DELETE, CliFuncType.GET, CliFuncType.PUT],
    })
    .then((res) => res.treat)

const tick = async () =>
  await qoa
    .confirm({
      type: 'confirm',
      query: 'Continue... Enter',
      handle: 'update',
      accept: 'Y',
      deny: 'n',
    })
    .then((res) => res.update)

;(async () => {
  while (true) {
    // run
    const subject = await runCli()

    // execute
    switch (subject) {
      case CliFuncType.CREATE:
        await friendsRepository.createTable({
          tableName: 'Friends',
          tableAttribute: [
            {
              [AttributeNameType.NAME]: {
                propertyType: AttributePropertyType.S,
                keySchemaType: KeySchemaType.HASH,
              },
            },
            {
              [AttributeNameType.JOB]: {
                propertyType: AttributePropertyType.S,
                keySchemaType: KeySchemaType.RANGE,
              },
            },
          ],
          config: {
            enableStream: false,
            readCapacity: 1,
            writeCapacity: 1,
          },
        })
      case CliFuncType.DELETE:
        await friendsRepository.deleteItem('Friends', {
          [AttributeNameType.NAME]: {
            [AttributePropertyType.S]: 'leedonggyu',
          },
          [AttributeNameType.JOB]: {
            [AttributePropertyType.S]: 'programmer',
          },
        })

      case CliFuncType.GET:
        await friendsRepository.retrieveItem('Friends', {
          [AttributeNameType.NAME]: {
            [AttributePropertyType.S]: 'leedonggyu',
          },
          [AttributeNameType.JOB]: {
            [AttributePropertyType.S]: 'programmer',
          },
        })

      case CliFuncType.PUT:
        await friendsRepository.updateItem('Friends', {
          [AttributeNameType.NAME]: {
            [AttributePropertyType.S]: 'leedonggyu',
          },
          [AttributeNameType.JOB]: {
            [AttributePropertyType.S]: 'programmer',
          },
        })
    }

    // question
    if (!(await tick())) {
      console.log('---------- bye --------')
      process.exit(0)
    }

    // clear
    console.clear()
  }
})()
