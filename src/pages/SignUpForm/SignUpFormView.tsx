import React, { useEffect } from "react";
import {
  DeepMap,
  FieldError,
  FieldValues,
  UseFormRegister,
  UseFormSetFocus,
} from "react-hook-form";
import FieldsNames from "../../components/form/fieldsNames";

import FormField from "../../components/form/formField";
import FormWrapper from "../../components/form/formWrapper";
import { useStores } from "../../hooks/useStore";
import RouteURLS from "../../navigation/CONSTANTS";

type PropsType = {
  onSubmit: (
    e?: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
  register: UseFormRegister<FieldValues>;
  setFocus: UseFormSetFocus<FieldValues>;
  validError: DeepMap<FieldValues, FieldError>;
  isChecked: boolean;
};

export const SignUpFormView: React.FC<PropsType> = ({
  onSubmit,
  register,
  validError,
  isChecked,
  setFocus,
}) => {
  const { userStore } = useStores();
  const { isFetching, errors: serverErrors } = userStore;

  useEffect(() => {
    setFocus(FieldsNames.USERNAME);
  }, [setFocus]);

  return (
    <FormWrapper
      route={RouteURLS.SIGN_IN}
      linkTitle="Sign In."
      onSubmit={onSubmit}
      title="Create new account"
      btnTitle="create"
      linkText="Already have an account? "
      isFetch={isFetching}
      form={"user"}
      checked={isChecked}
    >
      <FormField
        register={register(FieldsNames.USERNAME)}
        type="text"
        name={FieldsNames.USERNAME}
        label="Username"
        helperText={validError?.username?.message}
        serverErrors={serverErrors?.username?.join(". ")}
      />
      <FormField
        register={register(FieldsNames.EMAIL)}
        type="email"
        name={FieldsNames.EMAIL}
        label="Email"
        helperText={validError?.email?.message}
        serverErrors={serverErrors?.email?.join(". ")}
      />
      <FormField
        register={register(FieldsNames.PASSWORD)}
        type="password"
        name={FieldsNames.PASSWORD}
        label="Password"
        helperText={validError?.password?.message}
      />
      <FormField
        register={register(FieldsNames.CONFIRM_PASSWORD)}
        type="password"
        name={FieldsNames.CONFIRM_PASSWORD}
        label="Repeat Password"
        helperText={validError?.confirmPassword?.message}
      />
      <hr />
      <FormField
        register={register(FieldsNames.ACCEPT_TERMS)}
        type="checkbox"
        name={FieldsNames.ACCEPT_TERMS}
        label="I agree to the processing of my personal information"
        helperText={validError?.acceptTerms?.message}
      />
    </FormWrapper>
  );
};
