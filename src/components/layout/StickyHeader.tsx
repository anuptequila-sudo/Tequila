import React, { useEffect, useRef, useState } from "react";
const menuItems = [
    { key: "home", label: "Home", href: "#" },
    { key: "case-studies", label: "Case Studies", href: "#" },
    { key: "what-we-do", label: "What we do" }, // has dropdown
    { key: "the-agency", label: "The agency", href: "#" },
    { key: "insights", label: "Insights", href: "#" },
    { key: "faq", label: "FAQ", href: "#" },
    { key: "contact", label: "Contact", href: "#" },
];

// three-column dropdown content for "What we do"
const whatWeDoColumns = [
    [
        { label: "Strategy", href: "#" },
        { label: "Research", href: "#" },
        { label: "Branding", href: "#" },
    ],
    [
        { label: "UX / UI", href: "#" },
        { label: "Product Design", href: "#" },
        { label: "Service Design", href: "#" },
    ],
    [
        { label: "Development", href: "#" },
        { label: "Integrations", href: "#" },
        { label: "Support", href: "#" },
    ],
];

const StickyHeader: React.FC = () => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const whatWeDoBtnRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (
                open &&
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node) &&
                whatWeDoBtnRef.current &&
                !whatWeDoBtnRef.current.contains(e.target as Node)
            ) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open]);

    return (
        <div
            style={{
                position: "fixed",
                bottom: 18,
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 1000,
                width: "90%",
                maxWidth: 1100,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "rgba(255,255,255,0.95)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                borderRadius: 40,
                padding: "10px 18px",
                gap: 16,
                backdropFilter: "blur(6px)",
                fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
            }}
            aria-hidden={false}
        >
            <nav
                aria-label="Main"
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    flex: 1,
                    justifyContent: "center",
                }}
            >
                {menuItems.map((m) =>
                    m.key === "what-we-do" ? (
                        <div
                            key={m.key}
                            style={{ position: "relative", display: "inline-block" }}
                            onMouseEnter={() => setOpen(true)}
                            onMouseLeave={() => setOpen(false)}
                        >
                            <button
                                ref={whatWeDoBtnRef}
                                onClick={() => setOpen((s) => !s)}
                                aria-haspopup="true"
                                aria-expanded={open}
                                style={{
                                    background: "transparent",
                                    border: "none",
                                    padding: "8px 12px",
                                    cursor: "pointer",
                                    fontSize: 15,
                                    fontWeight: 600,
                                }}
                            >
                                {m.label}
                            </button>

                            {/* Dropdown appears above the menu item */}
                            {open && (
                                <div
                                    ref={dropdownRef}
                                    role="menu"
                                    style={{
                                        position: "absolute",
                                        bottom: "calc(100% + 10px)", // places dropdown above the button
                                        left: "50%",
                                        transform: "translateX(-50%)",
                                        background: "white",
                                        borderRadius: 10,
                                        boxShadow: "0 12px 36px rgba(0,0,0,0.12)",
                                        padding: 16,
                                        minWidth: 520,
                                        display: "grid",
                                        gridTemplateColumns: "repeat(3, 1fr)",
                                        gap: 12,
                                        zIndex: 1100,
                                    }}
                                >
                                    {whatWeDoColumns.map((col, ci) => (
                                        <div key={ci} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                            {col.map((item) => (
                                                <a
                                                    key={item.label}
                                                    href={item.href}
                                                    role="menuitem"
                                                    style={{
                                                        color: "#111",
                                                        textDecoration: "none",
                                                        padding: "6px 8px",
                                                        borderRadius: 6,
                                                        fontSize: 14,
                                                    }}
                                                    onClick={() => setOpen(false)}
                                                >
                                                    {item.label}
                                                </a>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <a
                            key={m.key}
                            href={m.href}
                            style={{
                                padding: "8px 12px",
                                borderRadius: 8,
                                textDecoration: "none",
                                color: "#111",
                                fontWeight: 600,
                                fontSize: 15,
                            }}
                        >
                            {m.label}
                        </a>
                    )
                )}
            </nav>

            {/* Right-side image occupying ~5% of the header width */}
            <div style={{ width: "5%", minWidth: 36, display: "flex", justifyContent: "flex-end" }}>
                <img
                    src="/images/Logo.svg"
                    alt="Right"
                    style={{
                        width: "100%",
                        height: "auto",
                        display: "block",
                        borderRadius: 6,
                        objectFit: "cover",
                    }}
                />
            </div>
        </div>
    );
};

export default StickyHeader;