//declare module "jsonwebtoken" {
    interface payloadJson extends JwtPayload {
        username: string;
        email: string;
        user_id: string;
        role: string
    }
  //}



    namespace Express {
      interface Request {
        user: {
          username?: string,
          email?: string,
          id: string, 
          role: string
        }
      }
    }


