import React from "react";
import { Form, Formik } from "formik";
import { InputField } from "../components/form/InputField";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrlClient } from "../utils/createUrlClient";
import NextLink from "next/link";

interface loginProps {}

const Login: React.FC<loginProps> = ({}) => {
  const router = useRouter();
  const [, login] = useLoginMutation();
  return (
    <Formik
      initialValues={{ usernameOrEmail: "", password: "" }}
      onSubmit={async (values, { setErrors }) => {
        const response = await login(values);
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
            label="Nombre de usuario o Correo Electrónico"
            type="text"
            name="usernameOrEmail"
            value={values.usernameOrEmail}
            onChange={handleChange}
          />
          <InputField
            label="Contraseña"
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <NextLink href="/forgot-password">forgot password?</NextLink>
          </div>
          <button>Sign In</button>
        </Form>
      )}
    </Formik>
  );
};

export default withUrqlClient(createUrlClient)(Login);
