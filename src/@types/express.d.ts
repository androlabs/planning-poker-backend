declare namespace Express {
  export interface Request {
    id: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
  }
}
