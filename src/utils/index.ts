import * as AWS from "aws-sdk";
import csv from "csvtojson";

export const s3CSVLoader = async (params: { Bucket: string; Key: string }) => {
  // TODO: Implement Singleton for AWS.S3
  let S3 = new AWS.S3();

  let data = async function () {
    const stream = S3.getObject(params).createReadStream();
    const json = await csv().fromStream(stream);
    return json;
  };

  let csvData = await data();

  return csvData;
};

export const convertStringNumber = (str: string) => {
  const num = parseFloat(str);
  if (str.includes("k")) {
    return num * 1000;
  }
  if (str.includes("m")) {
    return num * 1000000;
  }
  if (str.includes("b")) {
    return num * 1000000000;
  }
  return num;
};
