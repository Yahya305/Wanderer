import Link from "next/link";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
    NavigationMenuViewport,
} from "./ui/navigation-menu";

function Navbar() {
    const routes = [
        {
            title: "Link 1",
            href: "/test-page1",
        },
        {
            title: "Link 2",
            href: "/test-page2",
        },
    ];
    return (
        <NavigationMenu className="py-2 px-4 w-[100vw] bg-primary text-primary-foreground">
            <NavigationMenuList className="flex gap-4">
                {routes.map(({ title, href }, key) => (
                    <NavigationMenuItem key={key}>
                        <Link href={href}>{title}</Link>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
            <NavigationMenuList className="flex justify-end gap-4 w-[calc(100vw_-_170px)]">
                <NavigationMenuItem>
                    <Link href="/login">Login</Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/signup">Signup</Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}

export default Navbar;
