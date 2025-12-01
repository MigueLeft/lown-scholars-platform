import SignupForm from '@/components/auth/SignupForm';

export default function SignupPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: 'linear-gradient(135deg, #1E1E1E 0%, #2D2D2D 50%, #1E1E1E 100%)'
      }}
    >
      <div className="card-harvard bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <SignupForm />
      </div>
    </div>
  );
}
