export function validation(textToValidate, validationType) {
  if (validationType === "nameNoNumbers") {
    if (textToValidate.length < 2 || textToValidate.length > 100)
      return ["error", "Nazwa jest za krótka lub za długa"];
    else if (!/^[a-zA-Z0-9\s\-']+$/.test(textToValidate))
      return ["error", "Nazwa posiada niedozwole symbole"];
    else if (!/\d/.test(textToValidate))
      return ["error", "Nazwa posiada numery"];
    return ["success", ""];
  } else if (validationType === "nameWithNumbers") {
    if (textToValidate.length < 2 || textToValidate.length > 100)
      return ["error", "Nazwa jest za krótka lub za długa"];
    else if (!/^[a-zA-Z0-9\s\-']+$/.test(textToValidate))
      return ["error", "Nazwa posiada niedozwole symbole"];
    return ["success", ""];
  } else if (validationType === "number") {
    if (Number(textToValidate) <= 0 || textToValidate.lenght > 10) {
      return ["error", "Numer musi sie zawierać w odpowiednich przedziałach"];
    }
    return ["success", ""];
  } else if (validationType === "phoneNumber") {
    if (textToValidate < 111111111 || textToValidate > 999999999) {
      return ["error", "Numer telefonu jest nie poprawny"];
    }
    return ["success", ""];
  }
}
