"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dynamoClient = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const dynamoClient = new client_dynamodb_1.DynamoDBClient({ region: 'us-east-2' });
exports.dynamoClient = dynamoClient;
