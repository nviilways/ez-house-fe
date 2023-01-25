interface StandardResponse<T> {
  code: number;
  message: string;
  data: T | null;
}

export default StandardResponse;
