// src/types/custom.d.ts

import { Request } from 'express';

declare module 'express' {
  interface Request {
    user?: {
      id: any;
      // Add other properties if needed
    };
  }
}
