import { useSyncExternalStore } from 'react';

export function useIsClient() {
  return useSyncExternalStore(
    () => () => {}, // subscribe: não precisamos subscrever a nada
    () => true,     // getSnapshot (client): retorna true
    () => false     // getServerSnapshot (server): retorna false
  );
}

