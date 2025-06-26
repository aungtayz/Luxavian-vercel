
import React from 'react';
import { AuthProvider } from '../hooks/authprovider';

export default function RootLayout({children}:  {children: React.ReactNode}) {
return (
<AuthProvider>{children}</AuthProvider>
)
}