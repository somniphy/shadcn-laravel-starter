"use client";
import { PropsWithChildren } from "react";
import { PageProps } from "@/types";

import ApplicationLogo from "@/components/application-logo";
import { Link, Head } from "@inertiajs/react";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggler } from "@/components/theme-toggler";
import { AppWindowIcon } from "lucide-react";
export default function Guest({
    children,
    auth,
    header,
}: PropsWithChildren<
    PageProps<{
        header: { title: string };
    }>
>) {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Head title={header.title} />
            <div className="relative flex min-h-screen flex-col bg-background">
                <div className="w-full mx-auto border-border/40 dark:border-border min-[1800px]:max-w-7xl min-[1800px]:border-x">
                    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-border">
                        <nav className="flex h-14 text-sm items-center px-6 gap-4 justify-between">
                            <Link href={route("dashboard")}>
                                <AppWindowIcon className="size-6 text-sidebar-primary-background" />
                            </Link>
                            <div className="flex items-center gap-4">
                                {auth?.user ? (
                                    <Link href={route("dashboard")}>
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link href={route("login")}>Login</Link>
                                        <Link href={route("register")}>
                                            Register
                                        </Link>
                                    </>
                                )}
                                <ThemeToggler />
                            </div>
                        </nav>
                    </header>
                </div>
                <main>
                    <div className="relative">{children}</div>
                </main>
            </div>
        </ThemeProvider>
    );
}
