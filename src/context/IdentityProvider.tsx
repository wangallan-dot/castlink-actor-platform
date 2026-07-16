import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { IDENTITY_STORAGE_KEY, IdentityContext } from './identity';
import type { IdentityContextValue, UserIdentity } from './identity';

export function IdentityProvider({ children }: { children: ReactNode }) {
  const [identity, setIdentityState] = useState<UserIdentity>(() => {
    const stored = window.localStorage.getItem(IDENTITY_STORAGE_KEY);
    return stored === 'crew' ? 'crew' : 'actor';
  });

  const setIdentity = (nextIdentity: UserIdentity) => {
    setIdentityState(nextIdentity);
    window.localStorage.setItem(IDENTITY_STORAGE_KEY, nextIdentity);
  };

  const value = useMemo<IdentityContextValue>(() => ({
    identity,
    setIdentity,
    toggleIdentity: () => setIdentity(identity === 'actor' ? 'crew' : 'actor'),
  }), [identity]);

  return <IdentityContext.Provider value={value}>{children}</IdentityContext.Provider>;
}
