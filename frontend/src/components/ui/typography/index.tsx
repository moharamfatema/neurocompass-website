import { cn } from "@/lib/utils";

export function TypographyH2({
    children,
    className,
    ...props
}: React.HTMLProps<HTMLHeadingElement>) {
    return (
        <h2
            className={cn(
                "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
                className,
            )}
            {...props}
        >
            {children}
        </h2>
    );
}
