import React from "react";
import { NavLink, Outlet } from "react-router-dom";

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "@/components/mode-toggle";
import { TypographyH2 } from "@/components/ui/typography";
import { BrainIcon, ChartBarIcon, CompassIcon, HomeIcon } from "lucide-react";
import {
    NavigationMenuItemProps,
    NavigationMenuLinkProps,
} from "@radix-ui/react-navigation-menu";
import { cn } from "@/lib/utils";

const NavigationMenuItemWithIcon = ({
    children,
    ...props
}: NavigationMenuItemProps) => {
    return (
        <NavigationMenuItem {...props} className="flex items-center gap-2">
            {children}
        </NavigationMenuItem>
    );
};

const NavigationMenuLinkWithIcon = ({
    children,
    className,
    ...props
}: NavigationMenuLinkProps) => {
    return (
        <NavigationMenuLink {...props} className={cn("flex items-center gap-2", className)}>
            {children}
        </NavigationMenuLink>
    );
};

const PublicLayout = () => {
    return (
        <React.Fragment>
            <header className="sticky top-0 z-10 bg-opacity-60 backdrop-blur-md bg-black flex items-center justify-between p-4 gap-4">
                <NavigationMenu>
                    <NavigationMenuList className="flex items-center gap-2">
                        <NavigationMenuItemWithIcon>
                            <CompassIcon className="w-8 h-8" />
                            <TypographyH2 className="mr-5">
                                Neurocompass
                            </TypographyH2>
                        </NavigationMenuItemWithIcon>
                        <NavigationMenuItem>
                            <NavLink to={"/"}>
                                <NavigationMenuLinkWithIcon
                                    className={navigationMenuTriggerStyle()}
                                >
                                    <HomeIcon className="w-6 h-6" />
                                    Home
                                </NavigationMenuLinkWithIcon>
                            </NavLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavLink to={"/visualization"}>
                                <NavigationMenuLinkWithIcon
                                    className={navigationMenuTriggerStyle()}
                                >
                                    <ChartBarIcon className="w-6 h-6" />
                                    Visualization
                                </NavigationMenuLinkWithIcon>
                            </NavLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavLink to={"/prediction"}>
                                <NavigationMenuLinkWithIcon
                                    className={navigationMenuTriggerStyle()}
                                >
                                    <BrainIcon className="w-6 h-6" />
                                    Prediction
                                </NavigationMenuLinkWithIcon>
                            </NavLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
                <ModeToggle />
            </header>
            <main>
                <Outlet />
            </main>
        </React.Fragment>
    );
};

export default PublicLayout;
