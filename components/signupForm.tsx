'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Flex, Text, Button } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';

const FormSchema = z
  .object({
    email: z.string().min(1, 'Email is required').email('Email is invalid'),
    username: z.string().min(1, 'Username is required').max(100),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password needs more than 8 characters'),
    confirmPassword: z.string().min(1, 'Password confirmation is required')
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Password do not match',
  })
  .refine((data) => {
    return data.password.match(/[a-z]/) && data.password.match(/[A-Z]/) && data.password.match(/[0-9]/);
  }, {
    path: ['password'],
    message: 'Password needs at least 1 upper case, 1 lower case, and a number',
  });

export default function SignUpForm() {
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
      confirmPassword: '',
    }
  });

  const router = useRouter();
  const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async (data) => {
    console.log(data);
    const response = await fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: data.email,
        username: data.username,
        password: data.password,
      }),
    });

    if (response.ok) {
      router.push('/login');
    } else {
      console.error(`Registration Failed: ${response.status}`);
    }
  };

  return (
    <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
      <Flex direction='column' gap='2'>
        {/* TODO: Add red outlines around input when validation fails */}
        <Text>email</Text>
        <input placeholder='Enter your email' {...register('email')} />
        {errors.email?.message && <span className='text-red-500'>{errors.email?.message}</span>}

        <Text>username</Text>
        <input placeholder='Enter a username' {...register('username')} />
        {errors.username?.message && <span className='text-red-500'>{errors.username?.message}</span>}

        <Text>password</Text>
        <input placeholder='Enter your password' type='password' {...register('password')} />
        {errors.password?.message && <span className='text-red-500'>{errors.password?.message}</span>}

        <Text>confirmPassword</Text>
        <input placeholder='Re-Enter your password' type='password' {...register('confirmPassword')} />
        {errors.confirmPassword?.message && <span className='text-red-500'>{errors.confirmPassword?.message}</span>}

        <Button>Submit</Button>
      </Flex>
    </form>
  );
}
