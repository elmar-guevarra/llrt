/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */
import { SSMClient, GetParameterCommand } from '@aws-sdk/client-ssm';
const ssmClient = new SSMClient();

export const handler = async (event, context) => {

  // GetParameter
  const ssmCommand = new GetParameterCommand({
      Name: '/artemis/amt/access-control/user/firm-id',
      WithDecryption: false,
  });
  const ssmResponse = await ssmClient.send(ssmCommand);

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: "hello world",
      parameter: ssmResponse.Parameter?.Value
    }),
  };

  return response;
};
