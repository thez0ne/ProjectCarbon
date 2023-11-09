'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Flex, Text, Button, Separator } from '@radix-ui/themes';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
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
    // console.log(data);
    const signInData = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    console.log('signed in: ', signInData);
    if (signInData?.ok) {
      router.refresh();
      router.push('/');
    } else {
      // TODO get message about failure from api/auth
      toast('Failed to login', {
        theme: 'dark',
        hideProgressBar: true,
      });
    }
  };

  const signInWithGithub = async (data: any) => {
    // console.log('yesyes githubing time', data);
    signIn('github', { callbackUrl: '/', redirect: false });
  };

  return (
    <div className='w-full h-full' >
      <Flex direction='column' gap='5'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex direction='column' gap='3'>

            <Text as='label' size='3' mb='-2' weight='bold'>Email</Text>
            <input className='px-2 py-2' placeholder='Enter your email' {...register('email')} />
            {errors.email?.message && <span className='text-red-500'>{errors.email?.message}</span>}

            <Text as='label' size='3' mb='-2' weight='bold'>Password</Text>
            <input className='px-2 py-2' placeholder='Enter your password' type='password' {...register('password')} />
            {errors.password?.message && <span className='text-red-500'>{errors.password?.message}</span>}

            <Button>Log In</Button>
          </Flex>
        </form>
        <Separator my='2' size='4' />
        <Button onClick={signInWithGithub}>
          <GitHubLogoIcon />
          Log In with GitHub
        </Button>
        <ToastContainer />
      </Flex>
    </div>
  );
}
