import type { RecordModel } from 'pocketbase';
import { Result } from 'true-myth'

function id<A>(a: A) {
  return a
}

export function asyncTryOrElse<T>(
  fn: () => Promise<T>
): Promise<Result<T, unknown>>
export function asyncTryOrElse<T, E>(
  fn: () => Promise<T>,
  onErr: (value: unknown) => E
): Promise<Result<T, E>>
export function asyncTryOrElse<T extends {}, E>(
  fn: () => Promise<T>,
  onErr?: (value: unknown) => E
): Promise<Result<T, unknown>> {
  return fn().then(Result.ok<T, E>, onErr ?? id)
}

export type PBRecord<T, E = Record<string, unknown>> = RecordModel &
  T &
  (E extends Record<string, unknown>
    ? {
        expand: { [Key in keyof E]: E[Key] };
      }
    : {});

