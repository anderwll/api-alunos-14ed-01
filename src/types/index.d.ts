declare namespace Express {
  interface Request {
    authUser: {
      id: string;
      enable: boolean;
      login: string;
      iat: number;
    };
  }
}
