// src/types/custom.d.ts

import { Request } from 'express';

declare module 'express' {
  interface Request {
    user?: {
      id: string;
      // Add other properties as needed
    };
  }
}
