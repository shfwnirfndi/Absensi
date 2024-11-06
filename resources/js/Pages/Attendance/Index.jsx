import Pagination from "@/Components/Pagination";
import { Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function AttendanceIndex({ auth, attendances }) {
    console.log(attendances);
    return (
        //Komponen 1
        //Komponen layout dari halaman dashboard
        <AuthenticatedLayout
            user={auth.user} //props = melewatkan argumen dalam authenticated layout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Attendances
                </h2>
            }
        >
            {/* Komponen 2
            untuk membuat title */}
            <Head title="Attendances" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* TOTAL DATA */}
                    <div className="flex justify-between items-center mb-2">
                        <label className="font-bold">
                            Total : {attendances.total}
                        </label>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/* Kelas dari Tailwind */}
                            <table className="min-w-full">
                                <thead>
                                    <tr className="border-b-2">
                                        <th className="px-6 py-3 text-left text-lg font-medium text-black">
                                            Tanggal
                                        </th>
                                        <th className="px-6 py-3 text-left text-lg font-medium text-black">
                                            Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-lg font-medium text-black">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-lg font-medium text-black w-1/2">
                                            Alamat
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {attendances.data.map(
                                        ({
                                            id,
                                            user,
                                            created_at,
                                            address,
                                            status,
                                        }) => (
                                            <tr
                                                key={id}
                                                className="border-b add:bg-white even:bg-slate-200"
                                            >
                                                <td className="px-6 py-4">
                                                    {created_at}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {user.name}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {status}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {address}
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                            <Pagination links={attendances.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
