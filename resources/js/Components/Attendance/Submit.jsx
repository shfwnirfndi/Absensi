import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import Selectbox from "@/Components/Selectbox";
import { useState, useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";

export default function SubmitAttendance() {
    //console.log(import.meta.env.VITE_GOOGLE_MAPS_API_KEY);

    //loader dan Loader initialization
    const loader = new Loader({
        //Loader digunakan untuk memuat Google Maps API dengan konfigurasi seperti kunci API (apikey) yang diambil dari variabel lingkungan (VITE_GOOGLE_MAPS_API_KEY).
        apikey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        version: "weekly",
        libraries: ["geocoder"], //memerlukan fitur geocoder dari Google Maps API.
    });

    //state dan form management.
    const [transitioning, setTransitioning] = useState(false); //digunakan untuk mengelola status transisi (transitioning), yang mengontrol tampilan input deskripsi berdasarkan status absensi.
    const {
        data,
        setData,
        post,
        transform,
        errors,
        processing,
        recentlySuccessful,
    } = useForm({
        //custom hook yang digunakan untuk mengelola data form, termasuk pengaturan data (setData), pengiriman data (post), transformasi data (transform), dan penanganan kesalahan (errors).
        prepareData: {}, //Objek yang akan berisi data yang disiapkan untuk dikirim
        status: "attend", //Status default untuk absensi
        description: "", //Deskripsi yang dapat diisi pengguna
        latitude: "", //Data latitude (diisi setelah pengguna memberi izin)
        longitude: "", //Data longitude (diisi setelah pengguna memberi izin)
        address: "", //// Alamat yang akan diisi setelah geocoder berhasil
    }); //Hook dari react, useform sangat berguna dari inertia karena dia membawa data

    //Langkah pertama memanggil getLatling untuk mendapatkan posisi dari latitude dan longitude / mengambil lokasi geolocation pengguna
    const getLatLing = (e) => {
        e.preventDefault();

        //Simpan LATITUDE ANG LONGITUDE
        //Fungsi ini dipanggil saat pengguna ingin mengirimkan absensi. Ia mengambil lokasi geografis pengguna menggunakan navigator.geolocation.getCurrentPosition.
        navigator.geolocation.getCurrentPosition(
            function (position) {
                createGeocoder(position.coords);
            },
            function () {
                alert("Tidak bisa mendapatkan lokasi");
            }
        );
    };

    // function createGeocoder(coordinates) {
    //     loader
    //         .load()
    //         .then(() => {
    //             const geocoder = new google.maps.Geocoder();

    //             geocoder.geocode(
    //                 {
    //                     location: {
    //                         lat: coordinates.latitude,
    //                         lng: coordinates.longitude,
    //                     },
    //                 },
    //                 (results, status) => {
    //                     if (status === "OK") {
    //                         if (results[0]) {
    //                             let objLocation = {
    //                                 latitude: coordinates.latitude,
    //                                 longitude: coordinates.longitude,
    //                                 address: results[0].formatted_address,
    //                             };
    //                             setData({ prepareData: objLocation });
    //                         } else {
    //                             alert(
    //                                 "Tidak bisa mendapatkan alamat untuk lokasi ini."
    //                             );
    //                         }
    //                     } else {
    //                         alert("Geocoder gagal karena: " + status);
    //                     }
    //                 }
    //             );
    //         })
    //         .catch((error) => {
    //             console.error("Error loading Google Maps API:", error);
    //         });
    // }

    function createGeocoder(coordinates) {
        loader.load().then(() => {
            const geocoder = new google.maps.Geocoder();

            geocoder
                .geocode({
                    //memanfaatkan menggunakan geocode, dimana geocode membutuhkan latitude dan longitude
                    location: {
                        lat: coordinates.latitude,
                        lng: coordinates.longitude,
                    },
                })
                .then((response) => {
                    if (!response.results[0]) {
                        alert("Tidak bisa mendapatkan lokasi");
                        return;
                    }

                    //setPrepareData
                    let objLocation = {
                        //hasilnya berisi latitude, longitude dan address
                        //objek dari latitude and longitude
                        latitude: coordinates.latitude,
                        longitude: coordinates.longitude,
                        address: response.results[0].formatted_address,
                    };
                    setData("prepareData", objLocation);
                });
        });
    }

    //Pengiriman Data Ke Back-End
    //setData latitude and longitude
    useEffect(() => {
        //dimana use effect akan memanfaatkan address untuk melakukan proses transform data
        if (data.prepareData.hasOwnProperty("address")) {
            transform((data) => ({
                ...data.prepareData, //menhancurkan data prepare data (latitude and longitude)
                status: data.status,
                description: data.description,
            }));

            //Penyimpanan Data
            //SUBMIT DATA KE BAGIAN BACKEND
            post(route("attendances.submit"), {
                preserveScroll: true, //dijaga ga ke scroll
                onSuccess: () => {
                    alert("Absensi berhasi di submit");
                },
                onError: (errors) => {
                    console.log(errors); //menampilkan error
                },
            });
        }
    }, [data.prepareData]);
    //useEffect ini dipanggil ketika data.prepareData berubah (setelah mendapatkan alamat dari geocoder). Ini melakukan transformasi data dan mengirimnya ke backend menggunakan post dari Inertia.js untuk submit absensi.

    //Transisi Antara Status Absensi
    useEffect(() => {
        if (data.status === "attend") {
            //membuat logika pengulangan/looping
            setTransitioning(false);
        } else {
            setTransitioning(true);
        }
    }, [data.status]);
    //useEffect ini mengatur transitioning berdasarkan data.status. Jika status adalah "attend", maka transitioning diatur ke false, dan sebaliknya.

    //Render Form
    //Form ini mengandung elemen-elemen seperti select box untuk memilih status absensi, input deskripsi, dan tombol untuk mengirimkan absensi. Disabled state tombol disetel berdasarkan processing dari useForm.
    return (
        <form onSubmit={getLatLing} className="mt-6 space-y-6">
            <div>
                <InputLabel htmlFor="info" value="Silahkan lakukan absensi" />

                <Selectbox
                    onChange={(e) => setData("status", e.target.value)}
                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                    options={[
                        { value: "attend", label: "Hadir" },
                        { value: "leave", label: "Cuti" },
                        { value: "sick", label: "Sakit" },
                        { value: "permit", label: "Izin" },
                        { value: "business_trip", label: "Perjalanan Dinas" },
                        {
                            value: "remote",
                            label: "Kerja Remote (Diluar Kantor)",
                        },
                    ]}
                />

                <InputError className="mt-2" message={errors.status} />
            </div>

            <Transition
                show={transitioning} //tipe data boolean(true/false)
                enter="transition ease-in-out"
                enterFrom="opacity-0"
                leave="transition ease-in-out"
                leaveTo="opacity-0"
            >
                <div>
                    <InputLabel htmlFor="description" value="penjelasan" />

                    <TextInput
                        onChange={(e) => setData("description", e.target.value)}
                        className="w-full"
                    />

                    <InputError className="mt-2" message={errors.description} />
                </div>
            </Transition>

            <div className="flex items-center gap-4">
                {/* membantu untuk tidak terjadinya manipulasi data, ketika belum selesai di bagian pengisisan makan blm bisa submit */}
                <PrimaryButton disabled={processing}>Absensi</PrimaryButton>
            </div>
        </form>
    );
}
