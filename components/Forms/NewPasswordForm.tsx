import React, { ReactElement } from "react";

import { NewPasswordSchema } from "../../utils/yupSchemas";
import { useMutation } from "@apollo/react-hooks";
import { CHANGE_PASSWORD_MUTATION } from "../../graphql/user/mutations/changePassword";

import { Formik, Field, ErrorMessage, Form } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Error from "../Error";
import ButtonPrimary from "../ButtonPrimary";
import InputWithIcon from "../InputWithIcon";

export default function NewPasswordForm(): ReactElement {
  const [changePassword, { error, data }] = useMutation(
    CHANGE_PASSWORD_MUTATION
  );
  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      initialValues={{
        oldPassword: "",
        newPassword: "",
        newPasswordConfirm: "",
      }}
      validationSchema={NewPasswordSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await changePassword({
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
        <Form className="flex flex-col items-center justify-center w-8/12 lg:w-5/12">
          {error && <Error msg={error.graphQLErrors[0].message} />}
          <ErrorMessage name="username">
            {(msg) => <Error msg={msg} />}
          </ErrorMessage>
          <p className="mb-2 text-xl">Change your password</p>
          <InputWithIcon tailwindString="w-full border border-black mb-2  bg-white">
            <FontAwesomeIcon
              icon={faEnvelope}
              size="1x"
              color="gray"
              className="mr-2 transition-colors duration-200"
            />
            <label htmlFor="oldPassword" className="hidden">
              Old password:
            </label>
            <Field
              type="password"
              name="oldPassword"
              id="oldPassword"
              placeholder="Old password..."
              className="w-full py-1 text-black lg:py-2"
            />
          </InputWithIcon>
          <InputWithIcon tailwindString="w-full border border-black mb-2 bg-white">
            <FontAwesomeIcon
              icon={faEnvelope}
              size="1x"
              color="gray"
              className="mr-2 transition-colors duration-200"
            />
            <label htmlFor="newPassword" className="hidden">
              New password:
            </label>
            <Field
              type="password"
              name="newPassword"
              id="newPassword"
              placeholder="New Password..."
              className="w-full py-1 text-black lg:py-2"
            />
          </InputWithIcon>
          <InputWithIcon tailwindString="w-full border border-black mb-2 bg-white">
            <FontAwesomeIcon
              icon={faEnvelope}
              size="1x"
              color="gray"
              className="mr-2 transition-colors duration-200"
            />
            <label htmlFor="newPasswordConfirm" className="hidden">
              New Password Confirm:
            </label>
            <Field
              type="password"
              name="newPasswordConfirm"
              id="newPasswordConfirm"
              placeholder="New Password Confirm..."
              className="w-full py-1 text-black lg:py-2"
            />
          </InputWithIcon>
          <ButtonPrimary text="Submit" disabled={isSubmitting} type="submit" />
        </Form>
      )}
    </Formik>
  );
}
