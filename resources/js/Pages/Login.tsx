import { PageProps } from "@/types";
import { Head, Link, useForm } from "@inertiajs/react"
import GuestLayout from "@/Layouts/GuestLayout";
import DynamicForm from "@/components/dynamic-form";

export default function Page({ }: PageProps) {
    return (
        <GuestLayout>
            <Head title="Login" />
            <DynamicForm
                header={(title = "Sign in") => <h1 className="text-xl text-start font-bold mb-4">{title}</h1>}
                method="post" submitUrl={route('login')}
                className="min-w-96"
                inputs={[
                    { type: 'email', name: 'email', value: '' },
                    { type: 'password', name: 'password', value: '' },
                ]}
            >
                <div className="text-sm mt-4 space-x-2">
                    <span>Forgot your password?</span>
                    <Link className="text-lime-500 hover:text-lime-300" href="">Reset Password</Link>
                </div>
            </DynamicForm>
        </GuestLayout>
    )
}