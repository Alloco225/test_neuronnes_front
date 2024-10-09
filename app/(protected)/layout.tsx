'use client';
import { ReactNode, useEffect, useState } from 'react';
import { getUser, logout } from '../../services/auth';
import { useRouter } from 'next/navigation';

interface ProtectedLayoutProps {
  children: ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const router = useRouter();
  const [user, setUser] = useState<User|null>(null);

	useEffect(() => {
		const loadUser = async () => {
			const userData = await getUser();

      setUser(userData);
		};

		loadUser();
	}, [router]);

  if (!user) {
    // Redirect to login if the user is not authenticated
    return <p>Unauthorized. Please log in.</p>;
  }

  return (
    <div>
      <header>
        <nav>
          <p>Logged in as: {user.first_name}</p>

          <button onClick={logout}>
            Logout
          </button>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}
