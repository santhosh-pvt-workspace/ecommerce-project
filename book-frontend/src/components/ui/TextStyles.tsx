// Heading.tsx
export function Heading1({ children }: { children: React.ReactNode }) {
    return (
        <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
            {children}
        </h1>
    )
}

export function Heading2({ children }: { children: React.ReactNode }) {
    return (
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            {children}
        </h2>
    )
}

export function Heading3({ children }: { children: React.ReactNode }) {
    return (
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            {children}
        </h3>
    )
}

export function Heading4({ children }: { children: React.ReactNode }) {
    return (
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            {children}
        </h4>
    )
}

// Text.tsx
export function Text({ children }: { children: React.ReactNode }) {
    return (
        <p className="leading-7 [&:not(:first-child)]:mt-6">
            {children}
        </p>
    )
}

export function LargeText({ children }: { children: React.ReactNode }) {
    return (
        <div className="text-lg font-semibold">
            {children}
        </div>
    )
}

// List.tsx
export function UnorderedList({ children }: { children: React.ReactNode }) {
    return (
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
            {children}
        </ul>
    )
}

export function ListItem({ children }: { children: React.ReactNode }) {
    return <li>{children}</li>
}