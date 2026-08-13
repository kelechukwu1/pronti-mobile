export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

export interface ToastMessage {
  id: number;
  variant: ToastVariant;
  title: string;
  description?: string;
}

type Listener = (message: ToastMessage) => void;

const listeners = new Set<Listener>();
let counter = 0;

function emit(
  variant: ToastVariant,
  title: string,
  description?: string,
): void {
  const message: ToastMessage = { id: ++counter, variant, title, description };
  listeners.forEach(listener => listener(message));
}

export const toast = {
  success: (title: string, description?: string) =>
    emit('success', title, description),
  error: (title: string, description?: string) =>
    emit('error', title, description),
  warning: (title: string, description?: string) =>
    emit('warning', title, description),
  info: (title: string, description?: string) =>
    emit('info', title, description),
  subscribe(listener: Listener): () => void {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
};
