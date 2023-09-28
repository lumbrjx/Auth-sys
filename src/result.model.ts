export type Result<T, E> = {
  success: boolean;
  data?: T;
  error?: E;
};

export function parseToResult<T, E>(data: T, error?: E): Result<T, E> {
  return {
    success: !error,
    data,
    error,
  };
}
