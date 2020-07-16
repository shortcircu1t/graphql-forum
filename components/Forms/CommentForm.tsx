import { ReactElement } from "react";
import { useMutation, useApolloClient } from "@apollo/react-hooks";

import { CommentSchema } from "../../utils/yupSchemas";

import { ADD_COMMENT_MUTATION } from "../../graphql/comment/mutations/addComment";
import { GET_COMMENTS_BATCH_QUERY } from "../../graphql/comment/queries/getCommentsBatch";
import { COMMENTS_PAGE_SIZE } from "../../config/constants";

import { Formik, Form, ErrorMessage, Field } from "formik";
import ButtonPrimary from "../ButtonPrimary";
import Error from "../Error";

interface FormData {
  addComment: boolean;
}

interface FormVars {
  comment: string;
  postId: number;
}

interface Props {
  postId: number;
}

const CommentForm = ({ postId }: Props): ReactElement => {
  const client = useApolloClient();
  const [addComment, { error, data }] = useMutation<FormData, FormVars>(
    ADD_COMMENT_MUTATION,
    {
      refetchQueries: [
        {
          query: GET_COMMENTS_BATCH_QUERY,
          variables: { postId, pageSize: COMMENTS_PAGE_SIZE },
        },
      ],
    }
  );
  return (
    <div className="flex items-center justify-center w-full h-40 min-h-full mt-2 mb-8 ">
      <div className="w-full h-40 text-white">
        <Formik
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={{
            comment: "",
          }}
          validationSchema={CommentSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              await addComment({
                variables: {
                  ...values,
                  postId,
                },
              });
              resetForm();
            } catch (error) {
              console.log(error);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="h-full min-h-full border border-gray-600">
              <div className="h-full grid-rows-2">
                <div className="h-20">
                  {error && <Error msg={error.graphQLErrors[0].message} />}
                  <ErrorMessage name="comment">
                    {(msg) => <Error msg={msg} />}
                  </ErrorMessage>
                  <label htmlFor="comment" className="hidden">
                    Comment:
                  </label>
                  <Field
                    as="textarea"
                    name="comment"
                    id="comment"
                    className="block w-full h-full p-1 overflow-hidden outline-none resize-none bg-black-light lg:p-2"
                    placeholder="Write your comment..."
                  ></Field>
                </div>
                <div className="flex justify-between px-4 py-2">
                  <div></div>
                  <div>
                    <ButtonPrimary
                      text="Submit"
                      disabled={isSubmitting}
                      type="submit"
                    />
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CommentForm;
