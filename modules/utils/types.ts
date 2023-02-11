// --------------------------------------  DynamoDB Type ----------------------------------
export const AttributeNameType = {
  SEASON: 'Season',
  EPISODE: 'Episode',
} as const

export const AttributePropertyType = {
  Number: 'N',
  S: 'String',
  HASH: 'HASH',
  RANGE: 'RANGE',
} as const

// -----------------------------------------------------------------------------------------
