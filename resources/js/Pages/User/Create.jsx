import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import Selectbox from "@/Components/Selectbox";
import roles from "@/data/roles.json";

export default function UserCreate({ auth }) {
    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
            role: "user",
        }); //Hook dari react, useform sangat berguna dari inertia karena dia membawa data

    const submit = (e) => {
        e.preventDefault();

        post(route("users.store"), {
            preserveScroll: true, //dijaga ga ke scroll
            onSuccess: () => {
                alert("User created");
            },
            onError: (errors) => {
                console.log(errors); //menampilkan error
            },
        });
    };

    return (
        //Komponen 1
        //Komponen layout dari halaman dashboard
        <AuthenticatedLayout
            user={auth.user} //props = melewatkan argumen dalam authenticated layout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Users
                </h2>
            }
        >
            {/* Komponen 2
            untuk membuat title */}
            <Head title="Users" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <section className="max-w-x1">
                                <header>
                                    <h2 className="text-lg font-medium text-gray-900">
                                        Create User
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-600">
                                        Create a new user.
                                    </p>
                                </header>

                                <form
                                    onSubmit={submit}
                                    className="mt-6 space-y-6"
                                >
                                    <div>
                                        <InputLabel
                                            htmlFor="name"
                                            value="Name"
                                        />

                                        <TextInput
                                            id="name"
                                            className="mt-1 block w-full"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                            required
                                            isFocused
                                            autoComplete="name"
                                        />

                                        <InputError
                                            className="mt-2"
                                            message={errors.name}
                                        />
                                    </div>
                                    {/* EMAIL */}
                                    <div>
                                        <InputLabel
                                            htmlFor="email"
                                            value="Email"
                                        />

                                        <TextInput
                                            id="email"
                                            type="email"
                                            className="mt-1 block w-full"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                            required
                                            autoComplete="username"
                                        />

                                        <InputError
                                            className="mt-2"
                                            message={errors.email}
                                        />
                                    </div>
                                    {/* ROLE */}
                                    <div>
                                        <InputLabel
                                            htmlFor="role"
                                            value="Role"
                                        />

                                        <Selectbox
                                            onChange={(e) =>
                                                setData("role", e.target.value)
                                            }
                                            id="role"
                                            currentValue="user"
                                            options={roles} //mengarah ke resources/data/roles.json
                                        />

                                        <InputError
                                            className="mt-2"
                                            message={errors.email}
                                        />
                                    </div>

                                    {/* PASSWORD */}
                                    <div>
                                        <InputLabel //Bagian label
                                            htmlFor="password"
                                            value="New Password"
                                        />

                                        <TextInput //Bagian Input
                                            id="password"
                                            value={data.password}
                                            onChange={(e) =>
                                                setData(
                                                    "password",
                                                    e.target.value
                                                )
                                            }
                                            type="password"
                                            className="mt-1 block w-full"
                                            autoComplete="new-password"
                                        />

                                        <InputError //Bagian Error
                                            message={errors.password}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="password_confirmation"
                                            value="Confirm Password"
                                        />

                                        <TextInput
                                            id="password_confirmation"
                                            value={data.password_confirmation}
                                            onChange={(e) =>
                                                setData(
                                                    "password_confirmation",
                                                    e.target.value
                                                )
                                            }
                                            type="password"
                                            className="mt-1 block w-full"
                                            autoComplete="new-password"
                                        />

                                        <InputError
                                            message={
                                                errors.password_confirmation
                                            }
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="flex items-center gap-4">
                                        {/* membantu untuk tidak terjadinya manipulasi data, ketika belum selesai di bagian pengisisan makan blm bisa submit */}
                                        <PrimaryButton disabled={processing}>
                                            Save
                                        </PrimaryButton>

                                        <Transition
                                            show={recentlySuccessful} //tipe data boolean(true/false)
                                            enter="transition ease-in-out"
                                            enterFrom="opacity-0"
                                            leave="transition ease-in-out"
                                            leaveTo="opacity-0"
                                        >
                                            {/* kalau true akan menampilkan ini */}
                                            <p className="text-sm text-gray-600">
                                                Saved.
                                            </p>
                                        </Transition>
                                    </div>
                                </form>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
