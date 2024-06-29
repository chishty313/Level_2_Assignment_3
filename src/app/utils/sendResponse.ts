import { Response } from 'express';

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  token?: string;
  data: T;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  // Checking if the data is empty or not
  if (Array.isArray(data.data) && data.data.length === 0) {
    res.status(404).json({
      success: false,
      statusCode: 404,
      message: 'No Data Found',
      data: [],
    });
  } else {
    res.status(data?.statusCode).json({
      success: data.success,
      statusCode: data.statusCode,
      message: data.message,
      token: data?.token,
      data: data.data,
    });
  }
};

export default sendResponse;
