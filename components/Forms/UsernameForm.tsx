import React, { ReactElement } from "react";

import { useMutation } from "@apollo/react-hooks";
import { CHANGE_USERNAME_MUTATION } from "../../graphql/user/mutations/changeUsername";
import { UsernameSchema } from "../../utils/yupSchemas";

import { Formik, Field, ErrorMessage, Form } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import ButtonPrimary from "../ButtonPrimary";
import Error from "../Error";
import InputWithIcon from "../InputWithIcon";

export default function UsernameForm(): ReactElement {
  const [changeUsername, { error, data }] = useMutation(
    CHANGE_USERNAME_MUTATION
  );
  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      initialValues={{ username: "" }}
      validationSchema={UsernameSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await changeUsername({
            variables: {
              ...values,
            },
          });
          if (window) {
            window.location.reload();
          }
        } catch (error) {
          console.log(error);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col items-center justify-center">
          {error && <Error msg={error.graphQLErrors[0].message} />}
          <ErrorMessage name="username">
            {(msg) => <Error msg={msg} />}
          </ErrorMessage>
          <p className="mb-2 text-xl">Change your username</p>
          <InputWithIcon tailwindString="w-full border border-black  bg-white">
            <FontAwesomeIcon
              icon={faEnvelope}
              size="1x"
              color="gray"
              className="mr-2 transition-colors duration-200"
            />
            <label htmlFor="username" className="hidden">
              Username:
            </label>
            <Field
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              className="w-full py-1 text-black lg:py-2"
            />
          </InputWithIcon>

          <ButtonPrimary text="Submit" disabled={isSubmitting} type="submit" />
        </Form>
      )}
    </Formik>
  );
}
