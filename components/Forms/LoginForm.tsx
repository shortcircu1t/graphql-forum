import { ReactElement, useState } from "react";

import { useMutation } from "@apollo/react-hooks";
import { LOGIN_MUTATION } from "../../graphql/user/mutations/login";
import { LoginSchema } from "../../utils/yupSchemas";

import EmailForm from "./EmailForm";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import ButtonPrimary from "../ButtonPrimary";
import Error from "../Error";
import InputWithIcon from "../InputWithIcon";
import Modal from "@material-ui/core/Modal";

interface FormData {
  login: boolean;
}

interface FormVars {
  email: string;
  password: string;
}

interface Props {
  openRegisterForm: () => void;
}

const Login = ({ openRegisterForm }: Props): ReactElement => {
  const [showModal, setShowModal] = useState(false);
  const [login, { error, data }] = useMutation<FormData, FormVars>(
    LOGIN_MUTATION
  );
  return (
    <>
      <div className="flex items-center justify-center w-full mt-8">
        <div className="w-full text-white">
          <h1 className="mb-3 text-2xl text-center lg:text-4xl">
            Hello again!
          </h1>
          <Formik
            validateOnBlur={false}
            validateOnChange={false}
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                await login({
                  variables: {
                    email: values.email,
                    password: values.password,
                  },
                });
                if (window) {
                  if (window.location.href.includes("confirm")) {
                    window.location.replace("/");
                  } else {
                    window.location.reload();
                  }
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
                <InputWithIcon tailwindString="w-full bg-white mb-3">
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
                <ErrorMessage name="password">
                  {(msg) => <Error msg={msg} />}
                </ErrorMessage>
                <InputWithIcon tailwindString="w-full bg-white">
                  <FontAwesomeIcon
                    icon={faKey}
                    size="1x"
                    color="gray"
                    className="mr-2 transition-colors duration-200"
                  />
                  <label htmlFor="password" className="hidden">
                    Password:
                  </label>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    className="w-full py-1 text-black lg:py-2"
                  />
                </InputWithIcon>

                <ButtonPrimary
                  text="Login"
                  disabled={isSubmitting}
                  type="submit"
                />
              </Form>
            )}
          </Formik>
          <Modal
            open={showModal}
            onClose={() => setShowModal(false)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <EmailForm />
          </Modal>
          <p className="lg:text-xl ">
            or{" "}
            <button
              className="text-yellow-300 underline"
              onClick={openRegisterForm}
              role="button"
              aria-label="Register"
            >
              REGISTER
            </button>
            {","}{" "}
            <button
              className="text-red-300 underline"
              onClick={() => setShowModal(true)}
              role="button"
              aria-label="Forgot password..."
            >
              Forgot Password?
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
