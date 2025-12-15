// app/components/BotIdProvider.tsx
'use client';
import '../botid-client';
import { ReactNode } from 'react';

export default function BotIdProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
