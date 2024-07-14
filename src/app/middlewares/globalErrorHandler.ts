/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from "express";


const globalErrorHandler = (err: any, res:Response)=>{

    const statusCode = 500;
    const message = err.message || 'Something went wrong';
  
  
      res.status(statusCode).json({
        success: false,
        message: message || 'Something went wrong',
        error : err
      })
  
}

export default globalErrorHandler;
