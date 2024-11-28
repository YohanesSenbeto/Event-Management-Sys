// schemas.ts
// This file defines Zod schemas for validating user input for authentication forms (Sign Up and Sign In).

import { z } from 'zod'; // Import Zod for schema-based validation.

/*
  Sign Up Schema
  --------------
  Validates the fields required for user registration:
  - email: Must be a valid email address.
  - password: Must be at least 6 characters long.
  - confirmPassword: Must also be at least 6 characters long. (Additional match validation can be done elsewhere.)
*/
export const SignUpSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
});

/*
  Sign In Schema
  --------------
  Validates the fields required for user login:
  - email: Must be a valid email address.
  - password: Must be at least 6 characters long.
*/
export const SignInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});
