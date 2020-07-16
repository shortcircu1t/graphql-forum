import { ReactElement, useState } from "react";
import { useMutation } from "@apollo/react-hooks";

import { PostSchema } from "../../utils/yupSchemas";
import { ADD_POST_MUTATION } from "../../graphql/post/mutations/addPost";
import { uppercaseFirstChar } from "../../utils/uppercaseFirstChar";
import { CATEGORIES } from "../../config/constants";
import { useDropzone } from "react-dropzone";
import { CREATE_SIGNED_REQ_MUTATION } from "../../graphql/user/mutations/createSignedReq";
import formatFilename from "../../utils/formatFilename";
import uploadToAWS from "../../utils/uploadToAWS";

import { Formik, Form, ErrorMessage, Field } from "formik";
import ButtonPrimary from "../ButtonPrimary";
import Error from "../Error";

interface FormData {
  addPost: boolean;
}

interface FormVars {
  title: string;
  body: string;
  headerImgUrl?: string;
  categoryId: string;
}

const NewPostForm = (): ReactElement => {
  const [headerImg, setHeaderImg] = useState<any>();
  const [error, setError] = useState("");
  const [graphQLError, setGraphQLError] = useState<any>();
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (files) => setHeaderImg(files[0]),
  });
  const [createSignedRequestToAWS] = useMutation(CREATE_SIGNED_REQ_MUTATION);
  const [addPost] = useMutation<FormData, FormVars>(ADD_POST_MUTATION);
  return (
    <>
      <div className="flex items-center justify-center w-full p-4 mt-8">
        <div className="w-full text-white">
          <Formik
            validateOnBlur={false}
            validateOnChange={false}
            initialValues={{
              title: "",
              body: "",
              categoryId: "",
            }}
            validationSchema={PostSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                if (headerImg) {
                  if (headerImg.size > 5242880) {
                    setError("Max file size is 5mb.");
                    return;
                  }
                  const result = await createSignedRequestToAWS({
                    variables: {
                      filename: formatFilename((headerImg as any).name),
                      filetype: (headerImg as any).type,
                    },
                  });
                  await uploadToAWS(
                    result.data.createSignedRequestToAWS.signedRequest,
                    (headerImg as any).type,
                    headerImg
                  );
                  await addPost({
                    variables: {
                      ...values,
                      headerImgUrl: result.data.createSignedRequestToAWS.url,
                    },
                  });
                } else {
                  await addPost({
                    variables: {
                      ...values,
                      headerImgUrl: "",
                    },
                  });
                }
                if (window) {
                  window.location.replace("/");
                }
              } catch (error) {
                setGraphQLError(error);
              }
            }}
          >
            {({ isSubmitting, values }) => (
              <Form>
                {error && <p className="text-red-400">{error}</p>}
                {graphQLError && (
                  <Error msg={graphQLError.graphQLErrors[0].message} />
                )}
                <ErrorMessage name="title">
                  {(msg) => <Error msg={msg} />}
                </ErrorMessage>
                <label htmlFor="title">Title</label>
                <Field
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Title"
                  className="w-full p-1 lg:p-2 bg-black-light"
                />
                <ErrorMessage name="body">
                  {(msg) => <Error msg={msg} />}
                </ErrorMessage>
                <label htmlFor="body">Body</label>
                <Field
                  as="textarea"
                  name="body"
                  id="body"
                  className="block w-full p-1 bg-black-light lg:p-2"
                  placeholder="Body"
                />
                <ErrorMessage name="headerImg">
                  {(msg) => <Error msg={msg} />}
                </ErrorMessage>
                <label htmlFor="headerImg">Header Image</label>
                <input id="headerImg" {...getInputProps()} />
                <div
                  {...getRootProps()}
                  className={`${
                    isDragActive && "bg-teal-200"
                  }  p-2 py-5 text-lg flex items-center text-center border border-white border-dashed rounded-lg cursor-pointer relative`}
                >
                  {headerImg ? (
                    <p>{headerImg.name}</p>
                  ) : (
                    <p>Drag or click...</p>
                  )}
                </div>
                <ErrorMessage name="categoryId">
                  {(msg) => <Error msg={msg} />}
                </ErrorMessage>
                <label htmlFor="categoryId">
                  Category
                  <Field
                    as="select"
                    name="categoryId"
                    id="categoryId"
                    placeholder="Choose a category..."
                    className="w-full p-1 lg:p-2 bg-black-light"
                  >
                    <option>Choose here...</option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {uppercaseFirstChar(cat)}
                      </option>
                    ))}
                  </Field>
                </label>
                <ButtonPrimary
                  text="Submit"
                  disabled={isSubmitting}
                  type="submit"
                  ariaLabel="Create new post"
                />
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default NewPostForm;
