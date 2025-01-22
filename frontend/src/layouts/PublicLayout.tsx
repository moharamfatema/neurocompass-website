import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

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

const navLinks = [
    { to: "/", label: "Home", icon: HomeIcon },
    { to: "/visualization", label: "Visualization", icon: ChartBarIcon },
    { to: "/prediction", label: "Prediction", icon: BrainIcon },
];

const PublicLayout = () => {
    const { pathname } = useLocation();
    const activeLink = navLinks.find((link) => link.to === pathname);

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
                        {navLinks.map((link) => (
                            <NavigationMenuItem key={link.to}>
                                <NavLink to={link.to}>
                                    <NavigationMenuLinkWithIcon
                                        className={navigationMenuTriggerStyle()}
                                        active={activeLink?.to === link.to}
                                    >
                                        <link.icon className="w-6 h-6" />
                                        {link.label}
                                    </NavigationMenuLinkWithIcon>
                                </NavLink>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>
                <ModeToggle />
            </header>
            <main>
                <Outlet />
            </main>
            <footer
                style={{
                    position: "fixed",
                    bottom: "0",
                    left: "0",
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "5px 20px",
                }}
                className=" bg-opacity-20 backdrop-blur-md bg-black text-xs"
            >
                <p style={{ marginLeft: "10px" }}>Neurobooster 2024-2025</p>
                <p style={{ marginRight: "10px" }}>Learning Analytics @UDE</p>
            </footer>
        </React.Fragment>
    );
};

export default PublicLayout;
