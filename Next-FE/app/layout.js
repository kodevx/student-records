import "./globals.css";
import ReduxProvider from "./reduxProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <Header />
          {children}
          {/* <Footer /> */}
        </ReduxProvider>
      </body>
    </html>
  );
}
