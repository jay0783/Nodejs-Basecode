// export interface Basic {
//   id: number,
// }

// export interface Customer extends Basic{
//   name: string,
//   email?: string,
//   password?: string
// }

/**
 * Define interface for User Model
 *
 * @author Sameer <sameerp.spaceo@gmail.com>
 */

//  export interface Tokens {
// 	kind: string;
// 	accessToken: string;
// 	tokenSecret?: string;
// }

export default interface UserInterface {
  fullname: string;
  email: string;
  password: string;
  passwordResetToken: string;
  passwordResetExpire: Date;
  picture: string;
  emailTime: string;
}
