import React, { useEffect } from "react";

import {
  DeepMap,
  FieldError,
  UseFormRegister,
  UseFormSetFocus,
} from "react-hook-form";
import FieldsNames from "../../components/form/fieldsNames";
import FormField from "../../components/form/formField";
import FormWrapper from "../../components/form/formWrapper";
import { useStores } from "../../hooks/useStore";
import RouteURLS from "../../navigation/CONSTANTS";
import { IUserAuthData } from "../../types/user";

type PropsType = {
  onSubmit: (
    e?: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
  register: UseFormRegister<IUserAuthData>;
  setFocus: UseFormSetFocus<IUserAuthData>;
  validError: DeepMap<IUserAuthData, FieldError>;
};

export const SignInFormView: React.FC<PropsType> = ({
  onSubmit,
  register,
  validError,
  setFocus,
}) => {
  const { userStore } = useStores();
  const { isFetching, errors: serverErrors } = userStore;

  useEffect(() => {
    setFocus(FieldsNames.EMAIL);
  }, [setFocus]);

  return (
    <FormWrapper
      route={RouteURLS.SIGN_UP}
      linkTitle="Sign Up."
      onSubmit={onSubmit}
      title="Sign In"
      btnTitle="Login"
      linkText="Don’t have an account? "
      isFetch={isFetching}
      form={"user"}
    >
      <FormField
        register={register(FieldsNames.EMAIL)}
        type="email"
        name={FieldsNames.EMAIL}
        label="Email"
        helperText={validError?.email?.message}
      />
      <FormField
        register={register(FieldsNames.PASSWORD)}
        type="password"
        name={FieldsNames.PASSWORD}
        label="Password"
        helperText={validError?.password?.message}
        serverErrors={serverErrors ? "email or password is invalid" : null}
      />
    </FormWrapper>
  );
};
