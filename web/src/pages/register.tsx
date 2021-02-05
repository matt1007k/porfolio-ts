import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/form/InputField";
import { useRegisterMutation } from "../generated/graphql";
import { createUrlClient } from "../utils/createUrlClient";
import { toErrorMap } from "../utils/toErrorMap";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [, register] = useRegisterMutation();
  return (
    <Formik
      initialValues={{ email: "", username: "", password: "" }}
      onSubmit={async (values, { setErrors }) => {
        const response = await register({ options: values });
        if (response.data?.register.errors) {
          setErrors(toErrorMap(response.data?.register.errors));
        } else if (response.data?.register.user) {
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
            label="Correo Electrónico"
            type="text"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          <InputField
            label="Contraseña"
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
          <button>Sign Up</button>
        </Form>
      )}
    </Formik>
  );
};

export default withUrqlClient(createUrlClient)(Register);
