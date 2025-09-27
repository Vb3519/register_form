// Регулярки для проверки корректности заполнения полей формы:
export const userLoginPattern: RegExp =
  /^(?=(?:.*[a-zA-Z]){2,})[a-zA-Z0-9_]{3,15}$/;
export const userPasswordPattern: RegExp =
  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{4,}$/;
