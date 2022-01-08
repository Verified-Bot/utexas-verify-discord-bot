import { config } from "aws-sdk";

config.update({
  region: process.env.AWS_REGION,
});

import { DynamoDB } from "aws-sdk";

export interface User {
  discord_id: String;
  token_requested_at: number;
  encrypted_eid: Buffer;
  claims: {
    major: String[];
    school: String[];
    affiliation: String[];
  };
}

export const docClient = new DynamoDB.DocumentClient();

export const getUser = async (discord_id: string) => {
  const user = await docClient
    .get({ TableName: "users", Key: { discord_id } })
    .promise();
  return user as any as User;
};
