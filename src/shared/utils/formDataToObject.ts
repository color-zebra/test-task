export const formDataToObject = (formdata: FormData) => {
  const result: Record<string, unknown> = {};
  formdata.forEach(function (value, key) {
    result[key] = value;
  });

  return result;
};
