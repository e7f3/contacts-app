//  Обработчик ошибок 

export const handleError = (error) => {
  if (error) {
    if (error.response) alert(error.response.data.message);
    else console.log(error.message);
  }
};
