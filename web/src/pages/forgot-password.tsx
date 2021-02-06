import React, { useState } from "react";
import { withUrqlClient } from "next-urql";
import { createUrlClient } from "../utils/createUrlClient";
import { Formik, Form } from "formik";
import { InputField } from "../components/form/InputField";
import { useForgotPasswordMutation } from "../generated/graphql";
import { exists } from "fs";
import { send } from "process";

const ForgotPassword: React.FC<{}> = ({}) => {
  const [complete, setComplete] = useState(false);
  const [, forgotPassword] = useForgotPasswordMutation();
  return (
    <Formik
      initialValues={{ email: "" }}
      onSubmit={async (values) => {
        await forgotPassword({ email: values.email });
        setComplete(true);
      }}
    >
      {({ values, handleChange }) =>
        complete ? (
          <div>If email exists, our can send an email.</div>
        ) : (
          <Form>
            <InputField
              label="Correo Electrónico"
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
            />
            <button>forgot password</button>
          </Form>
        )
      }
    </Formik>
  );
};

export default withUrqlClient(createUrlClient)(ForgotPassword);
