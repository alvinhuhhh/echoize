import * as React from "react";

import { cn } from "@/lib/utils";

export interface TypographyProps
  extends React.HTMLAttributes<HTMLHeadingElement> {}

const H1 = React.forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ className, ...props }, ref) => {
    return (
      <h1
        ref={ref}
        className={cn(
          `${className} scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl`
        )}
      >
        {props.children}
      </h1>
    );
  }
);

const H2 = React.forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ className, ...props }, ref) => {
    return (
      <h2
        ref={ref}
        className={cn(
          `${className} scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0`
        )}
      >
        {props.children}
      </h2>
    );
  }
);

const H3 = React.forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ className, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={cn(
          `${className} scroll-m-20 text-2xl font-semibold tracking-tight`
        )}
      >
        {props.children}
      </h3>
    );
  }
);

const H4 = React.forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ className, ...props }, ref) => {
    return (
      <h4
        ref={ref}
        className={cn(
          `${className} scroll-m-20 text-xl font-semibold tracking-tight`
        )}
      >
        {props.children}
      </h4>
    );
  }
);

const P = React.forwardRef<HTMLParagraphElement, TypographyProps>(
  ({ className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(`${className} leading-7 [&:not(:first-child)]:mt-6`)}
      >
        {props.children}
      </p>
    );
  }
);

const Large = React.forwardRef<HTMLParagraphElement, TypographyProps>(
  ({ className, ...props }, ref) => {
    return (
      <p ref={ref} className={cn(`${className} text-lg font-semibold`)}>
        {props.children}
      </p>
    );
  }
);

const Small = React.forwardRef<HTMLParagraphElement, TypographyProps>(
  ({ className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(`${className} text-sm font-medium leading-none`)}
      >
        {props.children}
      </p>
    );
  }
);

const Muted = React.forwardRef<HTMLParagraphElement, TypographyProps>(
  ({ className, ...props }, ref) => {
    return (
      <p ref={ref} className={cn(`${className} text-sm text-muted-foreground`)}>
        {props.children}
      </p>
    );
  }
);

export { H1, H2, H3, H4, P, Large, Small, Muted };
