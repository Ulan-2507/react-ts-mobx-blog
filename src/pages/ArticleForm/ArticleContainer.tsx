import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types/fields";
import { UseFormSetValue } from "react-hook-form/dist/types/form";

import { useHistory } from "react-router-dom";
import FieldsNames from "../../components/form/fieldsNames";
import useDataStore from "../../hooks/useDataStore";
import { useStores } from "../../hooks/useStore";
import RouteURLS from "../../navigation/CONSTANTS";

import { IArticle } from "../../types/article";
import { ArticleFormView } from "./ArticleFormView";

export const ArticleContainer: React.FC = observer(() => {
  const { articleStore } = useStores();
  const {
    article,
    isEdit,
    success,
    setSuccess,
    setEdit,
    createArticle,
    updateArticle,
  } = articleStore;

  const initialValue = isEdit ? article!.tagList : [];
  const [data, add, change, remove] = useDataStore(initialValue);
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
    setValue,
  } = useForm({
    mode: "onBlur",
  });
  const onSubmit = handleSubmit((formValues) => {
    console.log(formValues, data);
    if (isEdit) {
      updateArticle({
        article: {
          title: formValues.title,
          description: formValues.description,
          body: formValues.textarea,
          tagList: data,
        },
      });
      return;
    }
    createArticle({
      article: {
        title: formValues.title,
        description: formValues.description,
        body: formValues.textarea,
        tagList: data,
      },
    });
  });

  useEffect(() => {
    if (success && !isEdit) {
      history.push(`${RouteURLS.ARTICLES}/${article!.slug}`);
      setSuccess(false);
      setEdit(false);
    }
    console.log(1);
  }, [history, success, article, isEdit, setSuccess, setEdit]);

  return (
    <ArticleFormView
      onSubmit={onSubmit}
      register={register}
      errors={errors}
      data={data}
      add={add}
      change={change}
      remove={remove}
      setFocus={setFocus}
      setValue={setValue}
    />
  );
});

export const setArticleValues = (
  article: IArticle,
  setValue: UseFormSetValue<FieldValues>
): void => {
  setValue(FieldsNames.TITLE, article.title, { shouldValidate: true });
  setValue(FieldsNames.DESCRIPTION, article.description, {
    shouldValidate: true,
  });
  setValue(FieldsNames.TEXTAREA, article.body, { shouldValidate: true });
};
