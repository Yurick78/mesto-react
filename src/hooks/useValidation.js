import React, { useState } from 'react';

const useValidation = (value = '', validations) => {

  const [isTextError, setTextError] = useState('');
  const [isInputValid, setInputValid] = useState(false);
  const minLength = validations.minLength;
  // eslint-disable-next-line no-useless-escape
  const regExpUrl = /^(https?:\/\/)([\w\.]+)\.([a-z]{2,6}\.?)(\/[\w\.]*)*\/?$/;


  React.useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case 'isEmpty':
          if (value) {
            setInputValid(true);
            setTextError('');
          } else {
            setInputValid(false);
            setTextError('Поле должно быть заполнено');
          }
          break;
        case 'minLength':
          if (value.length >= validations[validation]) {
            setInputValid(true);
            setTextError('');
          } else {
            if (value) {
              setInputValid(false);
              setTextError(`Минимальная длинна ${validations[validation]} символов`);
            }
          }
          break;
        case 'maxLength':
          if (value.length <= validations[validation] && value.length > minLength) {
            setInputValid(true);
            setTextError('');
          } else {
            if (value.length > validations[validation]) {
              setInputValid(false);
              setTextError(`Максимальная длинна ${validations[validation]} символов`);
            }
          }
          break;
        case 'isLink':
          if (regExpUrl.test(value)) {
            setInputValid(true);
            setTextError('');
          } else {
            if (value) {
              setInputValid(false);
              setTextError(`Введите корректный адрес ссылки`);
            }
          }
          break;
      }

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return {
    isTextError,
    isInputValid
  }

}

export default useValidation;
