# lambda-sns-to-chatwork-function

[![Build Status](https://travis-ci.org/chatwork/lambda-sns-to-chatwork-function.svg?branch=develop)](https://travis-ci.org/chatwork/lambda-sns-to-chatwork-function)
[![Dependency Status](https://david-dm.org/chatwork/lambda-sns-to-chatwork-function.png?theme=shields.io)](https://david-dm.org/chatwork/lambda-sns-to-chatwork-function)
[![devDependency Status](https://david-dm.org/chatwork/lambda-sns-to-chatwork-function/dev-status.png?theme=shields.io)](https://david-dm.org/chatwork/lambda-sns-to-chatwork-function#info=devDependencies)

Notify the SNS to ChatWork.

<img width="391" height="105" src="data:image/png;base64,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" alt="">

## Get started

```
export CHATWORK_API_TOKEN=xxxx
export CHATWORK_SEND_ROOM_ID=[ChatWork Room ID]
export CHATWORK_MESSAGE_TEMPLATE=[Notify Message]
git clone https://github.com/chatwork/lambda-sns-to-chatwork-function
cd lambda-sns-to-chatwork-function
npm install
npm run template
npm start # Notify the example events
```

## Configuration

You will generate `config/local.json`. When you run the `npm run template` to generate a `config/local.json` from the environment variable .


| name | type | value |
| :--: | :--: | :--: |
| CHATWORK_API_TOKEN | string | [ChatWork API Token](http://developer.chatwork.com/ja/authenticate.html) |
| CHATWORK_SEND_ROOM_ID | int | ID of the room to be sent to the ChatWork |
| CHATWORK_MESSAGE_TEMPLATE | string | The format of the message to be sent to the ChatWork (e.g. `<%- Message %>`) |

Or please create a `config/local.json`

```json
{
  "token": "[ChatWork API Token]",
  "roomId": [Send Room ID],
  "template": "[Message format]"
}
```

## Deployment

### Manual deploy

1. `git clone https://github.com/chatwork/lambda-sns-to-chatwork-function.git`
1. Generate `config/local.json`
2. Run the `npm run archive` tasks
3. It will upload the `archive.zip` as Lambda Function
4. Add the SNS to the event source

### Jenkins

1. `wget https://github.com/chatwork/lambda-sns-to-chatwork-function/archive/0.0.0.zip`
2. Generate `config/local.json`
3. `zip 0.0.0.zip config/local.json`
4. It will upload the `0.0.0.zip` to S3
5. To deploy the Lambda Function using the [AWS Lambda Plugin](https://wiki.jenkins-ci.org/display/JENKINS/AWS+Lambda+Plugin)

### TravisCI

1. To fork
2. Add configuration value to `.travis.yml` of `env`
3. Add `npm run template` to `.travis.yml` of `after_success`
4. Add deployment configuration to `.travis.yml` (e.g. [https://github.com/travis-ci/dpl#lambda](https://github.com/travis-ci/dpl#lambda))

## License

MIT

## Copyright

Copyright (c) 2015 ChatWork.inc
