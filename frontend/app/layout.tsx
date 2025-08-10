import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import StoreProvider from "./providers/store-provider";
import AlertProvider from "./providers/alert-provider";
import I18NProvider from "./providers/i18n-provider";

export const metadata: Metadata = {
    title: "Appointment Requests",
    description: "Nutritionist appointment app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <I18NProvider>
                <StoreProvider>
                    <Navbar />
                    <AlertProvider>
                        {children}
                    </AlertProvider>
                </StoreProvider>
                </I18NProvider>
            </body>
        </html>
    );
}
