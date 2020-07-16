import { FileSchema } from "../../../../utils/yupSchemas";
import aws from "aws-sdk";

export const resolvers = {
  Mutation: {
    createSignedRequestToAWS: async (
      _,
      { filename, filetype },
      { session: { user } }
    ) => {
      try {
        if (!user) {
          throw new Error("Unauthorized.");
        }
        await FileSchema.validate({ filename, filetype });
        const s3 = new aws.S3({
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          signatureVersion: "v4",
          region: "eu-west-3",
        });
        const s3Params = {
          Bucket: process.env.S3_BUCKET_NAME,
          Key: filename,
          Expires: 900,
          ContentType: filetype,
          ACL: "public-read",
        };
        const signedRequest = s3.getSignedUrl("putObject", s3Params);
        const url = `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${filename}`;
        return {
          signedRequest,
          url,
        };
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
