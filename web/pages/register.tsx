import React from "react";
import { Formik } from "formik";
import { InputField } from "../components/form/InputField";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ values, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
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
        </form>
      )}
    </Formik>
  );
};

export default Register;
