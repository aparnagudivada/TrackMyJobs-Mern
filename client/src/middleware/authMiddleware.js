import { UnauthenticatedError, UnauthorizedError } from '../errors/customErrors.js';
import { verifyJWT } from '../utils/tokenUtils.js';
import {BadRequestError} from '../errors/customErrors.js';


export const authenticateUser =  (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    throw new UnauthenticatedError('authentication invalid');
  }

  try {
    const { userId, role } = verifyJWT(token);
    const testUser = userId === '66afe9cef666454770e519b5';
    req.user = { userId, role, testUser };
    next();
  } catch (error) {
    throw new UnauthenticatedError('authentication invalid');
  }
};
export const checkForTestUser = (req, res, next) => {
  if (req.user.testUser) {
    throw new BadRequestError('Demo User. Read Only!');
  }
  next();
};


export const authorizedPermissions=(...roles)=>{
 
  return (req,res,next)=>{
if(!roles.includes(req.user.role))
{
  throw new UnauthorizedError('Unauthorized to access this role');
}
console.log(roles)
    next();
  }
 

}