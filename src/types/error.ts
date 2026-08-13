export type AppErrorKind =
  | 'NETWORK'
  | 'TIMEOUT'
  | 'GRAPHQL'
  | 'VALIDATION'
  | 'UNKNOWN';

export interface AppError {
  kind: AppErrorKind;
  message: string;
}
