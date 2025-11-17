import {NavLink, useNavigate} from "react-router-dom"
import { useState } from 'react'
import {CircleCheckBig, Menu, X} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {useActions} from "@/hooks/actions.ts";
import {useAppSelector} from "@/hooks/reduxTypedHooks.ts";

const navigation = [
    { name: 'Todos', href: '/' },
    { name: 'Create', href: '/todos/create' },
    { name: 'About', href: '/about'}
]

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const navigate = useNavigate();

    const {logout} = useActions();
    const isAuth = useAppSelector(state => state.login.isAuthenticated);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
                <div className="flex lg:flex-1">
                    <NavLink to="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">matvei</span>
                        <div className="flex items-center gap-2">
                            <CircleCheckBig className="h-8 w-8" strokeWidth={2.5}/>
                            {/*<div className="h-8 w-8 rounded-lg bg-primary" />*/}
                            <span className="text-xl font-semibold">Just TodoIt</span>
                        </div>
                    </NavLink>
                </div>

                <div className="flex lg:hidden">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                        className="cursor-pointer"
                    >
                        {mobileMenuOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </Button>
                </div>

                <div className="hidden lg:flex lg:gap-x-8">
                    {navigation.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.href}
                            className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </div>

                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    {(isAuth) ?
                        (<Button variant="outline" onClick={() => logout()} className="cursor-pointer">
                            Sign out
                        </Button>) :
                        (<Button onClick={() => navigate("login")} className="cursor-pointer">
                            Sign in
                        </Button>)
                    }
                </div>
            </nav>

            {mobileMenuOpen && (
                <div className="lg:hidden absolute left-0 right-0 top-full bg-background border-b border-border shadow-lg animate-in slide-in-from-top-2 duration-200">
                    <div className="space-y-1 px-4 pb-3 pt-2">
                        {navigation.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.href}
                                className="block rounded-md px-3 py-2 text-base font-medium text-foreground/80 hover:bg-accent hover:text-foreground"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item.name}
                            </NavLink>
                        ))}
                        <div className="pt-2">
                            {(isAuth) ?
                                (<Button
                                    variant="outline"
                                    className="w-full cursor-pointer"
                                    onClick={() => logout()}
                                >
                                    Sign out
                                </Button>) :
                                (<Button
                                    className="w-full cursor-pointer"
                                    onClick={() => navigate("login")}
                                >
                                    Sign in
                                </Button>)
                            }

                        </div>
                    </div>
                </div>
            )}
        </header>
    )
}
