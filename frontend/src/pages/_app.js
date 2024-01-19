// _app.js
import { TasksProvider } from "@/components/TasksProvider";
import { AuthProvider } from "../components/AuthProvider";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      {/* Other global components or layouts can go here */}
      <TasksProvider>
        <Component {...pageProps} />
      </TasksProvider>
    </AuthProvider>
  );
}

export default MyApp;
