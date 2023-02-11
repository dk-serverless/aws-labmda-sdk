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

- https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-started-nodejs.html
- https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/index.html
- https://aws.amazon.com/ko/blogs/compute/using-node-js-es-modules-and-top-level-await-in-aws-lambda/
- (DynamoDB use SDK) https://docs.aws.amazon.com/ko_kr/amazondynamodb/latest/developerguide/GettingStarted.CreateTable.html
