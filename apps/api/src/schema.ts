export const schema = `
  type Action {
    id: ID!
    type: String!
    status: String!
    details: String
    txHash: String
  }

  type AgentResponse {
    success: Boolean!
    message: String!
    actions: [Action]
  }

  type Query {
    health: String
    balance(chain: String!, address: String!): String
  }

  type Mutation {
    executeCommand(instruction: String!): AgentResponse
  }
`;
