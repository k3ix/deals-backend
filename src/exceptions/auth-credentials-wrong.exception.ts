import {HttpException, HttpStatus} from "@nestjs/common";


export class AuthCredentialsWrongException extends HttpException {
  constructor() {
    super( 'Username/email or password are incorrect!', HttpStatus.FORBIDDEN);
  }
}