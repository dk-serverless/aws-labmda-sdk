# DynomoDB Practice use

## Execute

```
    // Command
    npm install
    npm run start
```

## Folder

```
    - Handler-1
    - Handler_2
    ...
    - Modules
        - Repositores...
        - Pakcages...
        - Services...
        - Models...
```

## DynamoDB Command

- [x] DeleteTableCommand (Delete)
- [x] UpdateItemCommand (Update)
- [x] GetItemCommand (Read)
- [x] PutItemCommand (Insert)
- [x] Batch_Writing
- [x] Batch_Reading
- [x] Query_Scanning

## PartiQL

```ts

    // insert
    const insertParams = {
        Statement : 'insert into product value {'id' : "?", 'productName' : "?" }',
        Parameters : [{ N : 3}, {S : "new phone"}]
    }

    // read
    const selectParams = {
        Statement : "select * from product where id = ?",
        Parameters: [{N: "3"}]
    }

    // update
    const updateParams = {
        Statement : "update product set productName=? where id =?",
        Parameters : [{S: "updated phone", {N : "3"}}]
    }

    // delete
    const deleteParmas = {
        Statement : "delete from product where id = ?",
        Parameters : [{N : "3"}]
    }

    await dynamoDbClient.send(ExecuteStatementCommand(...))
```

## Proceduer

```
    npm init -y
    npm i typescript -D
    tsc --init

    npx eslint --init
    npm install -D prettier eslint-config-prettier eslint-plugin-prettier
    npm i aws-sdk
```

## Reference

- https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/index.html#description
