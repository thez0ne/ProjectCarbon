'use client';

import { Button, Dialog } from '@radix-ui/themes';
import SignUpForm from './signupForm';


export default function RegisterButton() {
    return (
      <Dialog.Root>
        <Dialog.Trigger>
          <Button className='bg-[#ffc53d] hover:bg-[#ffd60a]'>Register</Button>
        </Dialog.Trigger>

        <Dialog.Content style={{ maxWidth: 450 }}>
          <Dialog.Title>Register a new Account</Dialog.Title>
          <SignUpForm />
        </Dialog.Content>
      </Dialog.Root>
    );
}
