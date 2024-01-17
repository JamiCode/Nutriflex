// _app.js
import { AuthProvider } from "../components/AuthProvider";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      {/* Other global components or layouts can go here */}
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
