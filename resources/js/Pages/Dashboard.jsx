import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Attendance from "@/Components/Attendance/Index";
import { Loader } from "@googlemaps/js-api-loader";

export default function Dashboard({ auth, submitted }) {
    console.log(submitted);
    return (
        //Komponen 1
        //Komponen layout dari halaman dashboard
        <AuthenticatedLayout
            user={auth.user} //props = melewatkan argumen dalam authenticated layout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            {/* Komponen 2
            untuk membuat title */}
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            You're logged in!
                        </div>
                    </div>

                    {/* MEMBUAT SUBMIT ATTENDACE */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <section className="max-w-xl">
                            <div className="p-6 text-gray-900">
                                <Attendance />
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
