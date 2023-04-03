export const displayError = (endpointName: string) => {
  switch (endpointName) {
    case 'regUser':
      return undefined;
    case 'authorizationUser':
      return undefined;
    case 'forgotPassword':
      return undefined;
    case 'resetPassword':
      return undefined;
    case 'updateUser':
      return 'Изменения не были сохранены. Попробуйте позже!';
    case 'verificationTokenPost':
      return 'Ссылка не работает';

    default:
      return 'Что-то пошло не так. Обновите страницу через некоторое время.';
  }
};
