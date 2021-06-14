import { yupResolver } from "@hookform/resolvers/yup";
import { observer } from "mobx-react-lite";
import React from "react";
import { useForm } from "react-hook-form";

import { IUser, IUserUpdateData } from "../../types/user";
import { Schema } from "../../CONSTANTS/validation-ruls";
import { ProfileFormView } from "./ProfileFormView";
import FieldsNames from "../../components/form/fieldsNames";
import { useStores } from "../../hooks/useStore";

export const ProfileContainer: React.FC = observer(() => {
  const { userStore } = useStores();
  const { updateUser } = userStore;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setFocus,
  } = useForm({
    resolver: yupResolver(Schema.profile),
  });

  const onSubmit = handleSubmit((formValues: IUserUpdateData) => {
    const data: IUserUpdateData = {
      username: formValues.username,
      email: formValues.email,
      password: formValues.password,
    };
    if (formValues.image) data.image = formValues.image;

    updateUser(data);
  });
  const setUserValues = (user: IUser): void => {
    setValue(FieldsNames.USERNAME, user.username);
    setValue(FieldsNames.EMAIL, user.email);
    setValue(FieldsNames.IMAGE, user.image || "");
  };
  return (
    <ProfileFormView
      onSubmit={onSubmit}
      register={register}
      validError={errors}
      setFocus={setFocus}
      setUserValues={setUserValues}
    />
  );
});
