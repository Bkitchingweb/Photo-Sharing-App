import RegisterForm from '@/features/auth/components/RegisterForm';

const SignUp = () => {
    return (
        <div className="min-h-screen flex justify-center items-center">
          <div className="max-w-md w-full">
            <h1>Signup</h1>
            <RegisterForm />
          </div>
        </div>
      );
}

export default SignUp