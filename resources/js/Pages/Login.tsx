import { PageProps } from "@/types";
import { Head, Link, useForm } from "@inertiajs/react"
import GuestLayout from "@/Layouts/GuestLayout";

export default function Page({ }: PageProps) {
    const {data, setData, errors, post } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    async function submit(e: React.FormEvent) {
        e.preventDefault();
        post(route('login'))
    }

    return (
        <GuestLayout>
            <Head title="Login" />
            <form onSubmit={submit} className="space-y-2">
                <h1 className="text-xl text-start font-bold mb-4">Sign in</h1>

                <label className="form-control w-full max-w-xs mt-4">
                    <div className="label mb-0 p-0">
                        <span className="label-text">Email address</span>
                        <span className="label-text-alt">required</span>
                    </div>
                    <input 
                        type="text" 
                        placeholder="Email" 
                        className="input input-bordered w-full max-w-xs" 
                        value={data.email}
                        onChange={e => setData('email', e.target.value)}
                    />

                    <div>
                        {errors.email && <span className="text-error text-sm">{errors.email}</span>}
                    </div>
                </label>
                
                <label className="form-control w-full max-w-xs">
                    <div className="label mb-0 p-0">
                        <span className="label-text">Password</span>
                        <span className="label-text-alt text-neutral">required</span>
                    </div>
                    <input 
                        type="text" 
                        placeholder="Password" 
                        className="input input-bordered w-full max-w-xs" 
                        value={data.password}
                        onChange={e => setData('password', e.target.value)}
                    />

                    <div>
                        {errors.password && <span className="text-error text-sm">{errors.password}</span>}
                    </div>
                </label>
                
                <button className="btn btn-primary mt-4">Submit</button>
            </form>
        </GuestLayout>
    )
}