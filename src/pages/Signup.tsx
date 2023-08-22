import { Link, useNavigate } from 'react-router-dom';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FcGoogle } from 'react-icons/fc';
import { useToast } from '@/components/ui/use-toast';
import {
  useSignInWithGoogle,
  useCreateUserWithEmailAndPassword,
} from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebaseConfig';

const formSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
  password: z.string().min(8, 'Password must be at least 8 characters long.'),
});

function Signup() {
  const [handleSignup] = useCreateUserWithEmailAndPassword(auth);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { email, password } = values;
      await handleSignup(email, password);
      navigate('/login');
      toast({ title: 'Signup Successful' });
    } catch (error) {
      console.error('Error', error);
      toast({
        title: 'Something went wrong!',
      });
    }
  }

  const [googleSignup] = useSignInWithGoogle(auth);
  async function signupWithGoogle() {
    try {
      await googleSignup();
      navigate('/');
      toast({ title: 'Signup Successful' });
    } catch (error) {
      console.error('Error', error);
      toast({ title: 'Something went wrong' });
    }
  }

  return (
    <div className="grid h-screen place-content-center">
      <div className="mx-auto w-full">
        <h2 className="mb-4 text-center text-xl font-normal">Signup Page</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email" {...field} />
                  </FormControl>
                  <FormDescription>This is your public email.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter password" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your private password.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button variant={'outline'} type="submit">
              Submit
            </Button>
            <div className="flex items-center">
              <div className="flex-1 h-0.5 bg-gray-300 border-t border-gray-400"></div>
              <p className="mx-4">Or</p>
              <div className="flex-1 h-0.5 bg-gray-300 border-t border-gray-400"></div>
            </div>
            <div className="flex items-center justify-center">
              <Button
                className=""
                variant={'outline'}
                onClick={signupWithGoogle}
              >
                <FcGoogle className="mr-2 h-4 w-4" />
                Signup with Google
              </Button>
            </div>
            <p className="text-center">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-500 hover:underline">
                Log in
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default Signup;
