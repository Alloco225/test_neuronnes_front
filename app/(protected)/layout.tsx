// import { ReactNode } from "react";

// interface AuthLayoutProps {
// 	children: ReactNode;
// }

// export default function AuthLayout({ children }: AuthLayoutProps) {
// 	return (
// 		<div className="auth-layout">
// 			<header>
// 				<h1>Welcome to the App</h1>
// 			</header>
// 			<main>{children}</main>
// 		</div>
// 	);
// }


// app/(protected)/layout.tsx
import { ReactNode } from 'react';
import { getUser } from '../../services/auth';

interface ProtectedLayoutProps {
  children: ReactNode;
}

export default async function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const user = await getUser();

  if (!user) {
    // Redirect to login if the user is not authenticated
    return <p>Unauthorized. Please log in.</p>;
  }

  return (
    <div>
      <header>
        <nav>
          <p>Logged in as: {user.first_name}</p>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}
