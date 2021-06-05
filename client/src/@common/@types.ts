import { CombinedError, OperationContext, OperationResult } from "urql";

export type GraphqlResponse<T> = {
  response: T;
  fetching: boolean;
  error: CombinedError;
  mutate?: (variables?: T, context?: Partial<OperationContext>) => Promise<OperationResult>;
  reexecuteQuery?: () => void;
};
