import React from "react";
import { Form, Formik } from "formik";
import { InputField } from "../components/form/InputField";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";

interface loginProps {}

const Login: React.FC<loginProps> = ({}) => {
  const router = useRouter();
  const [, login] = useLoginMutation();
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={async (values, { setErrors }) => {
        const response = await login({ options: values });
        if (response.data?.login.errors) {
          setErrors(toErrorMap(response.data?.login.errors));
        } else if (response.data?.login.user) {
          router.push("/");
        }
      }}
    >
      {({ values, handleChange }) => (
        <Form>
          <InputField
            label="Nombre de usuario"
            type="text"
            name="username"
            value={values.username}
            onChange={handleChange}
          />
          <InputField
            label="Contraseña"
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
          <button>Sign In</button>
        </Form>
      )}
    </Formik>
  );
};

export default Login;
