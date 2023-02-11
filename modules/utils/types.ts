// --------------------------------------  DynamoDB Type ----------------------------------
export enum AttributeNameType {
  NAME = 'Name', // 이름
  PERSONALITY = 'Personality', // 성격
  JOB = 'Job', // 직업
  HAS_DATING = 'Has_dating', // 연애 여부
}

export enum AttributePropertyType {
  Number = 'N',
  Boolean = 'B',
  S = 'S',
}

export enum KeySchemaType {
  HASH = 'HASH',
  RANGE = 'RANGE',
}

// -----------------------------------------------------------------------------------------
