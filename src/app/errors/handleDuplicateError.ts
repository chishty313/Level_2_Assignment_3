import { TErrorMessages, TGenericErrorResponse } from '../interface/error';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleDuplicateError = (error: any): TGenericErrorResponse => {
  const regex = /"([^"]+)"/;
  const match = error.message.match(regex);
  const extractedMessage = match[1];
  const errorMessages: TErrorMessages = [
    {
      path: '',
      message: `${extractedMessage} is already exist`,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: 'Duplicate error',
    errorMessages,
  };
};

export default handleDuplicateError;
