import React, { useEffect } from "react";
import FormField from "../../components/form/formField";
import FormWrapper from "../../components/form/formWrapper";
import "../../components/form/form.scss";
import { v4 as uuidv4 } from "uuid";

import {
  DeepMap,
  FieldError,
  UseFormSetFocus,
  UseFormRegister,
  FieldValues,
} from "react-hook-form/dist/types";
import { useStores } from "../../hooks/useStore";
import FieldsNames from "../../components/form/fieldsNames";
import { DESCRIPTION, TEXT, TITLE } from "../../CONSTANTS/error-messages";
import { UseFormSetValue } from "react-hook-form/dist/types/form";
import { setArticleValues } from "./ArticleContainer";

type PropsType = {
  onSubmit: (
    e?: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
  register: UseFormRegister<FieldValues>;
  setFocus: UseFormSetFocus<FieldValues>;
  errors: DeepMap<FieldValues, FieldError>;
  data: string[];
  add: () => void;
  change: (value: string, index: number) => void;
  remove: (index: number) => void;
  setValue: UseFormSetValue<FieldValues>;
};

export const ArticleFormView: React.FC<PropsType> = ({
  onSubmit,
  register,
  errors,
  data,
  add,
  change,
  remove,
  setFocus,
  setValue,
}) => {
  const { articleStore } = useStores();
  const { article, isSending, error, isEdit } = articleStore;

  useEffect(() => {
    if (isEdit) {
      setArticleValues(article!, setValue);
      console.log(2);
    }
    console.log(3);
  }, [isEdit, article, setValue]);

  useEffect(() => {
    setFocus(FieldsNames.TITLE);
    console.log(4);
  }, [setFocus]);

  return (
    <FormWrapper
      onSubmit={onSubmit}
      title="Create new article"
      btnTitle="Send"
      isSending={isSending}
      form={"article"}
    >
      <FormField
        register={register(FieldsNames.TITLE, {
          required: `${TITLE.errorMessage}`,
        })}
        type="text"
        name={FieldsNames.TITLE}
        label="Title"
        helperText={errors?.title?.message}
        serverErrors={error ? error : null}
      />
      <FormField
        register={register(FieldsNames.DESCRIPTION, {
          required: `${DESCRIPTION.errorMessage}`,
        })}
        type="text"
        name={FieldsNames.DESCRIPTION}
        label="Short description"
        helperText={errors?.description?.message}
        serverErrors={error ? error : null}
      />
      <label className="form__label">
        Text
        <textarea
          className="form__input form__input--textarea"
          {...register(FieldsNames.TEXTAREA, {
            required: `${TEXT.errorMessage}`,
          })}
          name={FieldsNames.TEXTAREA}
          placeholder="text"
        ></textarea>
        {!!errors.textarea && (
          <p className="form__error">{errors?.textarea?.message}</p>
        )}
      </label>
      <fieldset className="form__tag-list">
        <legend>Tags</legend>
        <ul>
          {data.map((tag, index) => {
            const name = uuidv4();
            return (
              <li key={name} className="form__tag">
                <input
                  className="form__input form__input--tag"
                  type="text"
                  placeholder="tag"
                  name={name}
                  defaultValue={data[index]}
                  onBlur={(e) => change(e.target.value, index)}
                />
                <button
                  className="form__button form__button--delete"
                  type="button"
                  onClick={() => remove(index)}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
        <button
          className="form__button form__button--add"
          type="button"
          onClick={add}
        >
          Add tag
        </button>
      </fieldset>
    </FormWrapper>
  );
};
