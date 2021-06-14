import React, { useEffect } from "react";
import FormField from "../../components/form/formField";
import FormWrapper from "../../components/form/formWrapper";
import {
  DeepMap,
  FieldError,
  FieldValues,
  UseFormRegister,
  UseFormSetFocus,
} from "react-hook-form/dist/types";
import { IUser } from "../../types/user";
import FieldsNames from "../../components/form/fieldsNames";
import { useStores } from "../../hooks/useStore";

type PropsType = {
  onSubmit: (
    e?: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
  register: UseFormRegister<FieldValues>;
  setFocus: UseFormSetFocus<FieldValues>;
  validError: DeepMap<FieldValues, FieldError>;
  setUserValues: (user: IUser) => void;
};
export const ProfileFormView: React.FC<PropsType> = ({
  onSubmit,
  register,
  validError,
  setFocus,
  setUserValues,
}) => {
  const { userStore } = useStores();
  const { user, isFetching, success, errors: serverError } = userStore;

  useEffect(() => {
    if (user) {
      setUserValues(user);
    }
  }, [setUserValues, user]);

  useEffect(() => {
    setFocus(FieldsNames.USERNAME);
  }, [setFocus]);

  return (
    <FormWrapper
      onSubmit={onSubmit}
      title="Edit Profile"
      btnTitle="Save"
      success={success}
      isFetch={isFetching}
      form={"user"}
    >
      <FormField
        register={register(FieldsNames.USERNAME)}
        type="text"
        name={FieldsNames.USERNAME}
        label="Username"
        helperText={validError?.username?.message}
        serverErrors={serverError ? serverError.username?.join(". ") : null}
      />
      <FormField
        register={register(FieldsNames.EMAIL)}
        type="email"
        name={FieldsNames.EMAIL}
        label="Email"
        helperText={validError?.email?.message}
        serverErrors={serverError ? serverError.email?.join(". ") : null}
      />
      <FormField
        register={register(FieldsNames.PASSWORD)}
        type="password"
        name={FieldsNames.PASSWORD}
        label="New Password"
        helperText={validError?.password?.message}
      />
      <FormField
        register={register(FieldsNames.IMAGE)}
        type="url"
        name={FieldsNames.IMAGE}
        label=" Avatar image (url)"
        helperText={validError?.image?.message}
      />
    </FormWrapper>
  );
};
