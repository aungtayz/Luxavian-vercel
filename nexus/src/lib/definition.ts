import zod from 'zod';
export const SignupFormSchema = zod.object({
    name: zod.string().min(2, {message: 'Name must be at least two characters long'}).trim(),
    email: zod.string().min(4, {message: 'email must be at least four characters long'}).trim(),
    password: zod
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Contain at least one special character.',
    })
    .trim(),});

    export type SignupFormState =   | {
        errors?: {
          name?: string[]
          email?: string[]
          password?: string[]
        }
        message?: string
      }
    | undefined