'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Flex, Text, Button } from '@radix-ui/themes';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormSchema = z
  .object({
    email: z.string().min(1, 'Email is required').email('Email is invalid'),
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
      password: '',
    }
  });

  const router = useRouter();
  const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async (data, e?: React.BaseSyntheticEvent) => {
    e?.preventDefault();
    console.log(data);
    const signInData = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    console.log('signed in: ', signInData);
    if (signInData?.ok) {
      router.refresh();
      router.push('/channel/public');
    } else {
      // TODO get message about failure from api/auth
      toast('Failed to login', {
        theme: 'dark',
        hideProgressBar: true,
      });
    }
  };

  return (
    <div className='w-full h-full' >
      <Flex direction="column" gap="5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex direction="column" gap="3">

            <Text>email</Text>
            <input {...register('email')} />
            {errors.email?.message && <span className='text-red-500'>{errors.email?.message}</span>}

            <Text>password</Text>
            <input {...register('password')} />
            {errors.password?.message && <span className='text-red-500'>{errors.password?.message}</span>}

            <Button>Sign In</Button>
          </Flex>
        </form>
        <Text className='text-center'> -------------------- or -------------------- </Text>
        <Button onClick={(data) => console.log('yesyes githubing time', data)}>Sign In with GitHub</Button>
        <ToastContainer />
      </Flex>
    </div>
  );
}
