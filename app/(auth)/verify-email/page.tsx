import { Suspense } from 'react';
import VerifyEmailForm from '@/components/auth/VerifyEmailForm';

export default function VerifyEmailPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: 'linear-gradient(135deg, #1E1E1E 0%, #2D2D2D 50%, #1E1E1E 100%)'
      }}
    >
      <div className="card-harvard bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <Suspense fallback={<div className="text-center">Loading...</div>}>
          <VerifyEmailForm />
        </Suspense>
      </div>
    </div>
  );
}
