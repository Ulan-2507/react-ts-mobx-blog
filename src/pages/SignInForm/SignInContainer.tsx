import React, { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import RouteURLS from "../../navigation/CONSTANTS";
import { IUserAuthData } from "../../types/user";
import { Schema } from "../../CONSTANTS/validation-ruls";
import { useStores } from "../../hooks/useStore";

import { observer } from "mobx-react-lite";
import { SignInFormView } from "./SignInFormView";

export const SignInContainer = observer(() => {
  const { userStore } = useStores();
  const { isAuth, login } = userStore;
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<IUserAuthData>({
    resolver: yupResolver(Schema.signIn),
  });

  const onSubmit = handleSubmit((formValues: IUserAuthData) => {
    login({
      email: formValues.email,
      password: formValues.password,
    });
  });
  useEffect(() => {
    if (isAuth) {
      history.push(RouteURLS.ARTICLES);
    }
  }, [isAuth, history]);
  return (
    <SignInFormView
      register={register}
      validError={errors}
      setFocus={setFocus}
      onSubmit={onSubmit}
    />
  );
});
