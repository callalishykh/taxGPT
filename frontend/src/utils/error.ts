const formatErrorsToString = (errors: any): string => {
  let errorString = "";
  console.log(errors, "errors");
  for (const key in errors) {
    if (errors.hasOwnProperty(key) && Array.isArray(errors[key])) {
      errors[key].forEach((error: string) => {
        errorString += `\n${key}: ${error}`;
      });
    }
  }
  return errorString;
};
export default formatErrorsToString;
