"use client";

import { Bell, ChevronsUpDown, LogOut, UserCog2 } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import { User } from "@/types";
import { usePage } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
export function NavUser({ user }: { user: User }) {
    const { isMobile } = useSidebar();
    const { auth } = usePage().props;

    // function to get the full avatar URL
    const getAvatarUrl = (avatarPath: string | null) => {
        if (!avatarPath) return null;
        return `/avatars/${avatarPath.replace(/^\//, '')}`;
    };

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                {auth.user.avatar ? (   
                                    <AvatarImage src={getAvatarUrl(auth.user.avatar) || undefined} alt={auth.user.name} />
                                ) : (
                                    <AvatarFallback className="rounded-lg">
                                        {auth.user.name.charAt(0)}
                                    </AvatarFallback>
                                )}
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">
                                    {user.name}
                                </span>
                                <span className="truncate text-xs">
                                    {user.email}
                                </span>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <Link
                                href={route("profile.edit")}
                                className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                            >
                                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        {auth.user.avatar ? (
                                            <AvatarImage src={getAvatarUrl(auth.user.avatar) || undefined} alt={auth.user.name} />
                                        ) : (
                                            <AvatarFallback className="rounded-lg">
                                                {auth.user.name.charAt(0)}
                                            </AvatarFallback>
                                        )}
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">
                                            {auth.user.name}
                                        </span>
                                        <span className="truncate text-xs">
                                            {user.email}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem asChild>
                                <Link
                                    href={route("profile.edit")}
                                    className="cursor-pointer"
                                >
                                    Profile
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                    className="cursor-pointer w-full"
                                >
                                    Log out
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
