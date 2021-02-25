const AWS = require("aws-sdk");
AWS.config.update({ region: process.env.TABLE_REGION });

const dynamodbClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const items = await getItems();

  console.log("ddb data: ", items);

  for (const item of items) {
    item.status = "processed";
    await updateitem(item);
    console.log("Prcessed item : ", item);
  }
};

async function updateitem(item) {
  try {
    let putItemParams = {
      TableName: process.env.API_MONITORAPI_EMAILJOBTABLE_NAME,
      Item: item,
    };

    const res = await dynamodbClient.put(putItemParams).promise();
   
    return res;
  } catch (err) {
    console.log("PUT error : ", err);
    return null;
  }
}

async function getItems() {
  try {
    const params = {
      TableName: process.env.API_MONITORAPI_EMAILJOBTABLE_NAME,
      FilterExpression: "#status = :job_status_val",
      ExpressionAttributeNames: {
        "#status": "status",
      },
      ExpressionAttributeValues: { ":job_status_val": "active" },
    };

    const data = await dynamodbClient.scan(params).promise();
    return data.Items;
  } catch (err) {
    console.log("DDB Error: ", err);
  }
}
