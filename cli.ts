import { friendsRepository } from './modules/repositories/friends.repository'
import { Dictionary } from './modules/utils/base'

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

const runCliMapping: Dictionary<() => Promise<any>> = {
  [CliFuncType.CREATE]: friendsRepository.createTable,
  [CliFuncType.DELETE]: friendsRepository.deleteItem,
  [CliFuncType.UPDATE]: friendsRepository.updateItem,
  [CliFuncType.GET]: friendsRepository.retrieveItem,
  [CliFuncType.PUT]: friendsRepository.updateItem,
  [CliFuncType.BATCH_WRITE]: friendsRepository.batchUpadte,
  [CliFuncType.BATCH_READ]: friendsRepository.batchRetrieve,
  [CliFuncType.QUERY_SCAN]: friendsRepository.queryRetrieve,
}

const runCli = async () =>
  await qoa
    .interactive({
      type: 'interactive',
      query: 'dynamoDB Friends Cli',
      handle: 'treat',
      symbol: '>',
      menu: [
        CliFuncType.CREATE,
        CliFuncType.DELETE,
        CliFuncType.UPDATE,
        CliFuncType.GET,
        CliFuncType.PUT,
        CliFuncType.BATCH_WRITE,
        CliFuncType.BATCH_READ,
        CliFuncType.QUERY_SCAN,
      ],
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

    // execute func
    const result = await runCliMapping[subject]()
    console.log(result)

    // question
    if (!(await tick())) {
      console.log('---------- bye --------')
      process.exit(0)
    }

    // clear
    console.clear()
  }
})()
