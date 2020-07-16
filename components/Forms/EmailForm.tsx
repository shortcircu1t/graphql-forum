import React, { ReactElement } from "react";

import { EmailSchema } from "../../utils/yupSchemas";
import { useMutation } from "@apollo/react-hooks";
import { SEND_PASSWORD_EMAIL_MUTATION } from "../../graphql/user/mutations/sendPasswordEmail";

import { Formik, Field, ErrorMessage, Form } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Error from "../Error";
import ButtonPrimary from "../ButtonPrimary";
import InputWithIcon from "../InputWithIcon";

export default function EmailForm(): ReactElement {
  const [sendPasswordEmail, { error, data }] = useMutation(
    SEND_PASSWORD_EMAIL_MUTATION
  );
  return (
    <div className="p-3 bg-white ">
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={{ email: "" }}
        validationSchema={EmailSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await sendPasswordEmail({
              variables: {
                email: values.email,
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
          <Form>
            {error && <Error msg={error.graphQLErrors[0].message} />}
            <ErrorMessage name="email">
              {(msg) => <Error msg={msg} />}
            </ErrorMessage>
            <InputWithIcon tailwindString="w-full border border-black mb-3 ">
              <FontAwesomeIcon
                icon={faEnvelope}
                size="1x"
                color="gray"
                className="mr-2 transition-colors duration-200"
              />
              <label htmlFor="email" className="hidden">
                Email:
              </label>
              <Field
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="w-full py-1 text-black lg:py-2"
              />
            </InputWithIcon>
            <ButtonPrimary
              text="Submit"
              disabled={isSubmitting}
              type="submit"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
}
