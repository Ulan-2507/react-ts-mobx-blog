import { yupResolver } from "@hookform/resolvers/yup";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import FieldsNames from "../../components/form/fieldsNames";
import { Schema } from "../../CONSTANTS/validation-ruls";
import { useStores } from "../../hooks/useStore";
import RouteURLS from "../../navigation/CONSTANTS";

import { SignUpFormView } from "./SignUpFormView";

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: string;
}

export const SignUpContainer = observer(() => {
  const { userStore } = useStores();
  const { success, setSuccess, registerUser } = userStore;

  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
    watch,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(Schema.signUp),
  });

  const onSubmit = handleSubmit((formValues: FormData) => {
    registerUser({
      username: formValues.username,
      email: formValues.email.toLowerCase(),
      password: formValues.password,
    });
  });

  useEffect(() => {
    if (success) {
      history.push(`${RouteURLS.ARTICLES}`);
      setSuccess(false);
    }
  }, [history, success, setSuccess]);

  let isChecked = !!watch(FieldsNames.ACCEPT_TERMS);
  return (
    <SignUpFormView
      register={register}
      validError={errors}
      setFocus={setFocus}
      isChecked={isChecked}
      onSubmit={onSubmit}
    />
  );
});
