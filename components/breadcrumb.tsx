import Link from "next/link"

interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="px-4 py-4 text-sm text-muted-foreground border-b border-border">
      <div className="max-w-7xl mx-auto flex gap-2 items-center">
        {items.map((item, index) => (
          <div key={item.href} className="flex gap-2 items-center">
            <Link href={item.href} className="hover:text-primary transition">
              {item.label}
            </Link>
            {index < items.length - 1 && <span>/</span>}
          </div>
        ))}
      </div>
    </nav>
  )
}
