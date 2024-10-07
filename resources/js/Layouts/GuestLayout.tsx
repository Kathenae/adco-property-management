import { PropsWithChildren } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LucideBuilding2 } from 'lucide-react';

export default function GuestLayout({ children }: PropsWithChildren) {
    return (

        <div className="w-full flex flex-col justify-center lg:grid h-screen lg:grid-cols-2">
            <div className='hidden text-white lg:block relative'>
                <div className=' bg-black absolute top-0 left-0 w-full h-full -z-[5] bg-cover filter' />
                <div className='w-full h-full flex flex-col space-y-4 justify-center items-center bg-transparent'>
                    <LucideBuilding2 strokeWidth={0.6} className='h-24 w-24' />
                    <h1 className='text-3xl'>ADCO Property Management Solution</h1>
                </div>
            </div>
            <div className="flex flex-col h-full items-center justify-center py-12">
                {children}
            </div>
        </div>
    );
}
