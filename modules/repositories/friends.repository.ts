import { DynamoManager } from '../packages/dynamodb'

class FriendsRepository extends DynamoManager {
  constructor() {
    super()
  }
}

export const friendsRepository = new FriendsRepository()
