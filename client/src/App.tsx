import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./components/layout/layout";
import DataUploader from "./components/dashboard/DataUploader";
import StatsViewer from "./components/dashboard/StatsViewer";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <DataUploader />
            <StatsViewer />
          </div>
        </div>
      </Layout>
    </QueryClientProvider>
  );
};

export default App;
