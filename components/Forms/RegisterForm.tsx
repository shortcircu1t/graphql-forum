import { ReactElement } from "react";
import { useMutation } from "@apollo/react-hooks";

import { REGISTER_MUTATION } from "../../graphql/user/mutations/register";
import { RegisterSchema } from "../../utils/yupSchemas";

import { Formik, Form, ErrorMessage, Field } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import ButtonPrimary from "../ButtonPrimary";
import Error from "../Error";
import InputWithIcon from "../InputWithIcon";

interface FormData {
  register: boolean;
}

interface FormVars {
  email?: string;
  password?: string;
  passwordConfirm?: string;
  username?: string;
}

interface Props {
  openLoginForm: () => void;
}

const RegisterForm = ({ openLoginForm }: Props): ReactElement => {
  const [register, { loading, error, data }] = useMutation<FormData, FormVars>(
    REGISTER_MUTATION
  );
  return (
    <>
      <div className="flex items-center justify-center mt-8">
        <div className="w-full text-white">
          <h1 className="mb-3 text-2xl text-center lg:text-4xl">
            Welcome to GraphQL Forum!
          </h1>
          {data?.register && (
            <p className="mb-2 text-lg text-teal-200">
              There's one last step! Confirm your account with an email we sent
              you.{" "}
              <span className="underline">
                It might take a few minutes for email to get into your inbox.
              </span>
            </p>
          )}
          {!data?.register && (
            <>
              <Formik
                validateOnBlur={false}
                validateOnChange={false}
                initialValues={{
                  email: "",
                  password: "",
                  passwordConfirm: "",
                  username: "",
                }}
                validationSchema={RegisterSchema}
                onSubmit={async (values, { setSubmitting }) => {
                  try {
                    const results = await register({
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
                    <ErrorMessage name="email">
                      {(msg) => <Error msg={msg} />}
                    </ErrorMessage>
                    <label htmlFor="email" className="hidden">
                      Email:
                    </label>
                    <InputWithIcon tailwindString="w-full bg-white mb-3">
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        size="1x"
                        color="gray"
                        className="mr-2 transition-colors duration-200"
                      />
                      <Field
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        className="w-full py-1 text-black lg:py-2"
                      />
                    </InputWithIcon>

                    <ErrorMessage name="password">
                      {(msg) => <Error msg={msg} />}
                    </ErrorMessage>
                    <label htmlFor="password" className="hidden">
                      Password:
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
                        name="password"
                        id="password"
                        placeholder="Password"
                        className="w-full py-1 text-black lg:py-2 "
                      />
                    </InputWithIcon>

                    <ErrorMessage name="passwordConfirm">
                      {(msg) => <Error msg={msg} />}
                    </ErrorMessage>
                    <label htmlFor="passwordConfirm" className="hidden">
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
                        name="passwordConfirm"
                        id="passwordConfirm"
                        placeholder="Confirm password"
                        className="w-full py-1 text-black lg:py-2"
                      />
                    </InputWithIcon>

                    <ErrorMessage name="username">
                      {(msg) => <Error msg={msg} />}
                    </ErrorMessage>
                    <label htmlFor="username" className="hidden">
                      Username:
                    </label>
                    <InputWithIcon tailwindString="w-full bg-white">
                      <FontAwesomeIcon
                        icon={faUser}
                        size="1x"
                        color="gray"
                        className="mr-2 transition-colors duration-200"
                      />
                      <Field
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Username"
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
              <p className="lg:text-xl ">
                or{" "}
                <button
                  className="text-yellow-300 underline"
                  onClick={openLoginForm}
                  aria-label="login"
                  role="button"
                >
                  LOGIN
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
