import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../shared/api/query-client";

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <h1>Hello World</h1>
    </QueryClientProvider>
  );
}
