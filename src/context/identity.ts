import { createContext } from 'react';

export type UserIdentity = 'actor' | 'crew';

export type IdentityContextValue = {
  identity: UserIdentity;
  setIdentity: (identity: UserIdentity) => void;
  toggleIdentity: () => void;
};

export const IdentityContext = createContext<IdentityContextValue | null>(null);
export const IDENTITY_STORAGE_KEY = 'castlink:identity';
