'use client';

import { Button, Dialog } from '@radix-ui/themes';
import SignInForm from './signinForm';


export default function LogInButton() {
    return (
      <Dialog.Root>
        <Dialog.Trigger>
          <Button>Log In</Button>
        </Dialog.Trigger>

        <Dialog.Content style={{ maxWidth: 450 }}>
          <Dialog.Title>Log In to Your Account</Dialog.Title>
          <SignInForm />
        </Dialog.Content>
      </Dialog.Root>
    );
}
