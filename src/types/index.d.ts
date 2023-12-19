declare namespace Express {
  interface Request {
    authUser: {
      id: string;
      enable: boolean;
      login: string;
      type: string;
      iat: number;
    };
  }
}
