import {NavLink} from "react-router-dom";
import {CircleCheckBig} from "lucide-react";

export function Footer() {
    return (
        <footer className="w-full border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
                <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                    <NavLink to="/" className="flex items-center gap-2">
                        <CircleCheckBig className="h-8 w-8" strokeWidth={2.5}/>
                        {/*<div className="h-8 w-8 rounded-lg bg-primary" />*/}
                        <span className="text-xl font-semibold">Just TodoIt</span>
                    </NavLink>

                    <p className="text-sm text-foreground/80">
                        &copy; {new Date().getFullYear()} matvei. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}