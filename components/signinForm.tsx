'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Flex, Text, Button } from '@radix-ui/themes';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';

const FormSchema = z
  .object({
    email: z.string().min(1, 'Email is required').email('Email is invalid'),
    username: z.string().min(1, 'Username is required').max(100),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Passwords have more than 8 characters'),
  });

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      username: '',
      password: '',
    }
  });
  const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = (data) => console.log(data);

  return (
    <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
      <Flex direction="column" gap="2">

        <Text>email</Text>
        <input {...register('email')} />
        {errors.email?.message && <span className='text-red-500'>{errors.email?.message}</span>}

        <Text>username</Text>
        <input {...register('username')} />
        {errors.username?.message && <span className='text-red-500'>{errors.username?.message}</span>}

        <Text>password</Text>
        <input {...register('password')} />
        {errors.password?.message && <span className='text-red-500'>{errors.password?.message}</span>}

        <Button>Sign In</Button>
      </Flex>
    </form>
  );
}
