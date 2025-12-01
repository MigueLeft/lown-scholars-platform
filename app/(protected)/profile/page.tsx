import { getSession } from '@/server/users';
import { redirect } from 'next/navigation';
import ImageDropzone from '@/components/profile/ImageDropzone';
import ChangePasswordForm from '@/components/profile/ChangePasswordForm';

export default async function ProfilePage() {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  const userName = session.user?.name || 'User';
  const userEmail = session.user?.email || 'user@example.com';
  const userImage = session.user?.image || undefined;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 normal-case" style={{ color: 'var(--color-brand-crimson)' }}>
          Profile
        </h1>
        <p className="text-base" style={{ color: 'var(--color-subtle)' }}>
          Manage your account settings and preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Picture Section */}
        <div className="card-harvard p-6">
          <h2 className="text-xl font-bold mb-4 normal-case" style={{ color: 'var(--color-heading)' }}>
            Profile Picture
          </h2>
          <ImageDropzone currentImage={userImage} userName={userName} />
        </div>

        {/* Basic Information */}
        <div className="card-harvard p-6">
          <h2 className="text-xl font-bold mb-4 normal-case" style={{ color: 'var(--color-heading)' }}>
            Basic Information
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-subtle)' }}>
                Full Name
              </label>
              <p className="text-base font-semibold" style={{ color: 'var(--color-heading)' }}>
                {userName}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-subtle)' }}>
                Email
              </label>
              <p className="text-base font-semibold" style={{ color: 'var(--color-heading)' }}>
                {userEmail}
              </p>
            </div>
          </div>
        </div>

        {/* Change Password */}
        <div className="lg:col-span-2">
          <ChangePasswordForm />
        </div>
      </div>
    </div>
  );
}
