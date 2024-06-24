import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { TErrorMessages } from '../interface/error';
import config from '../config';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';
import handleCastError from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDuplicateError';
import AppError from '../errors/AppError';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  // Setting default Values
  let statusCode = 500;
  let message = 'Something went wrong';

  let errorMessages: TErrorMessages = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);

    statusCode = simplifiedError?.statusCode;

    message = simplifiedError?.message;

    errorMessages = simplifiedError?.errorMessages;
  } else if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error);

    statusCode = simplifiedError?.statusCode;

    message = simplifiedError?.message;

    errorMessages = simplifiedError?.errorMessages;
  } else if (error?.name === 'CastError') {
    const simplifiedError = handleCastError(error);

    statusCode = simplifiedError?.statusCode;

    message = simplifiedError?.message;

    errorMessages = simplifiedError?.errorMessages;
  } else if (error?.code === 11000) {
    const simplifiedError = handleDuplicateError(error);

    statusCode = simplifiedError?.statusCode;

    message = simplifiedError?.message;

    errorMessages = simplifiedError?.errorMessages;
  } else if (error instanceof AppError) {
    statusCode = error?.statusCode;

    message = error?.message;

    errorMessages = [
      {
        path: '',
        message: error?.message,
      },
    ];
  } else if (error instanceof Error) {
    message = error?.message;

    errorMessages = [
      {
        path: '',
        message: error?.message,
      },
    ];
  }

  // Ultimate return
  return res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    // error,
    stack: config.NODE_ENV === 'development' ? error?.stack : null,
  });
};

export default globalErrorHandler;
