import '../../neumorphism.css';

const SignupForm = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
      <h2 className='text-3xl font-bold text-gray-800 mb-6'>Sing Up</h2>
      <form className='flex flex-col w-80'>
        <input
          type='email'
          placeholder='Email'
          className='neumorphism-button mb-4 p-3 focus:outline-none'
        />
        <input
          type='password'
          placeholder='Password'
          className='neumorphism-button mb-4 p-3 focus:outline-none'
        />
        <input
          type='password'
          placeholder='Confirm Password'
          className='neumorphism-button mb-6 p-3 focus:outline-none'
        />
        <input
          type='nickname'
          placeholder='Nickname'
          className='neumorphism-button mb-6 p-3 focus:outline-none'
        />
        <button
          type='submit'
          className='neumorphism-button p-3 font-semibold text-gray-700'
        >
          Sign up
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
