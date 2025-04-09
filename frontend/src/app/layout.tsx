"use client";

import Header from "@/Components/header";
import { ReactNode } from "react";
import "./globals.css";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Header />
                {children}
            </body>
        </html>
    );
}
