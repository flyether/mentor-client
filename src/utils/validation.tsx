import * as Yup from 'yup';

export const validationOnChange = Yup.object().shape({
  password: Yup.string()
    .required('1')
    .test('password', '2', (value) => {
      const hasLength = value && value.length >= 8;
      const hasDigit = value && /\d/.test(value);
      const hasUpperCaseLetter = value && /[A-Z]/.test(value);
      const isLatinAlphabet = value && /^[a-zA-Z0-9]+$/.test(value);
      if (!hasUpperCaseLetter && !hasLength && !isLatinAlphabet && !hasDigit) {
        return false;
      }
      return true;
    })

    .test('password', '3', (value) => {
      console.log(value);
      const hasLength = value && value.length >= 8;
      const hasUpperCaseLetter = value && /[A-Z]/.test(value);
      const isLatinAlphabet = value && /^[a-zA-Z0-9]+$/.test(value);
      if (!hasUpperCaseLetter && !hasLength && !isLatinAlphabet) {
        return false;
      }
      return true;
    })
    .test('password', '4', (value) => {
      console.log(value);
      const hasLength = value && value.length >= 8;
      const hasUpperCaseLetter = value && /[A-Z]/.test(value);
      const hasDigit = value && /\d/.test(value);
      if (!hasUpperCaseLetter && !hasLength && !hasDigit) {
        return false;
      }
      return true;
    })
    .test('password', '14', (value) => {
      console.log(value);
      const hasLength = value && value.length >= 8;
      const hasDigit = value && /\d/.test(value);
      const isLatinAlphabet = value && /^[a-zA-Z0-9]+$/.test(value);
      if (!isLatinAlphabet && !hasLength && !hasDigit) {
        return false;
      }
      return true;
    })

    .test('password', '5', (value) => {
      console.log(value);
      const hasLength = value && value.length >= 8;
      const hasUpperCaseLetter = value && /[A-Z]/.test(value);
      if (!hasUpperCaseLetter && !hasLength) {
        return false;
      }
      return true;
    })

    .test('password', '6', (value) => {
      const hasDigit = value && /\d/.test(value);
      const hasUpperCaseLetter = value && /[A-Z]/.test(value);
      if (!hasDigit && !hasUpperCaseLetter) {
        return false;
      }
      return true;
    })

    .test('password', '7', (value) => {
      console.log(value);
      const isLatinAlphabet = value && /^[a-zA-Z0-9]+$/.test(value);
      const hasUpperCaseLetter = value && /[A-Z]/.test(value);

      if (!hasUpperCaseLetter && !isLatinAlphabet) {
        return false;
      }
      return true;
    })

    .test('password', '9', (value) => {
      const hasLength = value && value.length >= 8;
      const isLatinAlphabet = value && /^[a-zA-Z0-9]+$/.test(value);
      if (!isLatinAlphabet && !hasLength) {
        return false;
      }
      return true;
    })
    .test('password', '10', (value) => {
      const hasDigit = value && /\d/.test(value);
      const isLatinAlphabet = value && /^[a-zA-Z0-9]+$/.test(value);
      if (!isLatinAlphabet && !hasDigit) {
        return false;
      }
      return true;
    })
    .test('password', '13', (value) => {
      const hasDigit = value && /\d/.test(value);
      const hasLength = value && value.length >= 8;
      if (!hasDigit && !hasLength) {
        return false;
      }
      return true;
    })

    .test('password', '15', (value) => {
      const isLatinAlphabet = value && /^[a-zA-Z0-9]+$/.test(value);
      if (!isLatinAlphabet) {
        return false;
      }
      return true;
    })

    .test('password', '8', (value) => {
      const hasUpperCaseLetter = value && /[A-Z]/.test(value);
      if (!hasUpperCaseLetter) {
        return false;
      }
      return true;
    })
    .test('password', '12', (value) => {
      const hasDigit = value && /\d/.test(value);
      if (!hasDigit) {
        return false;
      }
      return true;
    })
    .min(8, '17'),
});
