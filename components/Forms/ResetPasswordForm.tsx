import { useMutation } from "@apollo/react-hooks";

import { ResetPasswordSchema } from "../../utils/yupSchemas";
import { ReactElement } from "react";
import { RESET_PASSWORD_MUTATION } from "../../graphql/user/mutations/resetPassword";

import { Formik, Form, ErrorMessage, Field } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import ButtonPrimary from "../ButtonPrimary";
import Error from "../Error";
import InputWithIcon from "../InputWithIcon";

interface FormData {
  changePassword: boolean;
}

interface FormVars {
  newPassword?: string;
  newPasswordConfirm?: string;
}

interface Props {
  token: string;
}

const ResetPasswordForm = ({ token }: Props): ReactElement => {
  const [changePassword, { loading, error, data }] = useMutation<
    FormData,
    FormVars
  >(RESET_PASSWORD_MUTATION);
  return (
    <>
      <div className="flex items-center justify-center mt-8">
        <div className="w-full text-white">
          <h1 className="mb-3 text-2xl text-center lg:text-4xl">
            Reset password.
          </h1>

          <>
            <Formik
              validateOnBlur={false}
              validateOnChange={false}
              initialValues={{
                newPassword: "",
                newPasswordConfirm: "",
                token,
              }}
              validationSchema={ResetPasswordSchema}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  const results = await changePassword({
                    variables: values,
                  });
                  setSubmitting(false);
                } catch (error) {
                  setSubmitting(false);
                  console.log(error);
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  {error && <Error msg={error?.graphQLErrors[0]?.message} />}
                  <ErrorMessage name="newPassword">
                    {(msg) => <Error msg={msg} />}
                  </ErrorMessage>
                  <label htmlFor="newPassword" className="hidden">
                    New password:
                  </label>
                  <InputWithIcon tailwindString="w-full bg-white mb-3">
                    <FontAwesomeIcon
                      icon={faKey}
                      size="1x"
                      color="gray"
                      className="mr-2 transition-colors duration-200"
                    />
                    <Field
                      type="password"
                      name="newPassword"
                      id="newPassword"
                      placeholder="New password"
                      className="w-full py-1 text-black lg:py-2 "
                    />
                  </InputWithIcon>

                  <ErrorMessage name="newPasswordConfirm">
                    {(msg) => <Error msg={msg} />}
                  </ErrorMessage>
                  <label htmlFor="newPasswordConfirm" className="hidden">
                    Confirm Password:
                  </label>
                  <InputWithIcon tailwindString="w-full bg-white mb-3">
                    <FontAwesomeIcon
                      icon={faKey}
                      size="1x"
                      color="gray"
                      className="mr-2 transition-colors duration-200"
                    />
                    <Field
                      type="password"
                      name="newPasswordConfirm"
                      id="newPasswordConfirm"
                      placeholder="Confirm password"
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
          </>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordForm;
