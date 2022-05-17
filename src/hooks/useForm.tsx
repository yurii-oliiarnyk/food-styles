import { useMemo, useState } from "react";

const useForm = <T extends string>(
  initialValues: Record<T, string>,
  schema: Record<T, { validate: (value: string) => boolean; message: string }>,
) => {
  const [isFormValid, setIsFormValid] = useState(true);
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<
    Record<T, { isValid: boolean; message?: string }>
  >(() => {
    const fieldErrors: Record<any, { isValid: boolean; message?: string }> = {};

    for (const field in initialValues) {
      fieldErrors[field] = { isValid: true };
    }

    return fieldErrors as Record<T, { isValid: boolean; message?: string }>;
  });

  const setFieldValue = (fieldName: T) => {
    return (value: string) => {
      setValues(state => ({
        ...state,
        [fieldName]: value,
      }));
    };
  };

  const checkValidation = (): boolean => {
    let formValidation = true;

    for (const field in values) {
      const isValid = schema[field].validate(values[field]);

      if (!isValid) {
        formValidation = false;
      }

      setErrors(oldErrors => ({
        ...oldErrors,
        [field]: {
          isValid,
          message: schema[field].message,
        },
      }));
    }

    setIsFormValid(formValidation);

    return formValidation;
  };

  const errorMessages = useMemo<string[]>(() => {
    const errs: string[] = [];

    for (const field in errors) {
      if (!errors[field].isValid && errors[field].message) {
        errs.push(errors[field].message as string);
      }
    }

    return errs;
  }, [errors]);

  return {
    values,
    errorMessages,
    setFieldValue,
    isFormValid,
    checkValidation,
  };
};

export default useForm;
