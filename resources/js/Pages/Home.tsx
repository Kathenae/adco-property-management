import { Head, Link } from "@inertiajs/react"

export default function Page() {
    return (
        <div>
            <Head title="Home" />
            <h1>Home page</h1>
            <Link href={route('home')}>Home</Link>
        </div>
    )
}