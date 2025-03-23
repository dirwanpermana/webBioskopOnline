// file ini utk route admin memanggil path dan element setiap component
import { redirect, type RouteObject } from "react-router-dom";
import AdminLoginPage from "../pages/AdminLoginPages";
import AdminOverview from "@/pages/AdminOverview";
import AdminLayout from "@/components/AdminLayout";
import { getSession } from "@/lib/utils";
import AdminGenre from "@/pages/AdminGenre";
import { getDetailGenre, getGenres } from "@/services/genre/genre.service";
import AdminGenreForm from "@/pages/AdminGenre/form";
import AdminTheater from "@/pages/AdminTheater";
import { getDetailTheater, getTheaters } from "@/services/theater/theater.service";
import AdminTheaterForm from "@/pages/AdminTheater/form";
import AdminMovie from "@/pages/AdminMovie";
import { getDetailMovie, getMovies } from "@/services/movie/movie.service";
import AdminMovieForm from "@/pages/AdminMovie/form";
import AdminCustomer from "@/pages/AdminCustomer";
import { getCustomers, getTransactions, getWalletTransactions } from "@/services/customer/customer.service";
import AdminTransactions from "@/pages/AdminTransaction";
import AdminWalletTransactions from "@/pages/AdminWalletTransaction";


const adminRoutes: RouteObject[] = [
    {
        path: "/admin/login", //redirect ke halaman adminLoginPages
        element: <AdminLoginPage/> //panggil element AdminLoginPage
    },
    {
        path: "/admin",
        element: <AdminLayout/>,
        loader: () => {
// Ambil data sesi dari secureLocalStorage
            const user = getSession();
            console.log(user);
// Periksa apakah sesi valid dan role adalah admin
            if(!user || user?.role !== "admin") {
                throw redirect("/admin/login") //jika user tidak valid/bukan admin Redirect ke loginPage
            }
            return user;
        },
// kasih array nested utk menampilkan AdminOverview
        children: [
            {
                index: true, //index = adminOverview agar kebaca
                element: <AdminOverview/>,
            },

// Page Genre
            {
                path: "/admin/genres",
// ketika load halaman genre, panggil data api genre
                loader: async () => {
                    const genres = await getGenres();
                    return genres.data; //depetin data genre dari file adminGenre
                },
                element: <AdminGenre />, //panggil parameter AdminGenre
            },
// form Add Genre
            {
                path: "/admin/genres/create",  
                element: <AdminGenreForm />,
            },

// edit data genre
            {
                path: "/admin/genres/edit/:id",
// kalo gaada parameter redirect ke halamman genre
                loader: async ({params}) => {
                    if (!params.id) {
                        throw redirect("/admin/genres");
                    }
// kalo dapet parameter nya tampilin detail genre
                    const detail = await getDetailGenre(params.id);
                    return detail.data;
                },
                element: <AdminGenreForm />,
            },


// Panggil page Theaters
            {
                path: "/admin/theaters",
                loader: async () => {
// ketika load halaman theater, panggil data api get genre
                    const theaters = await getTheaters();
                    return theaters.data;
                },
                element: <AdminTheater />,
            },
            {
                path: "/admin/theaters/create",  
                element: <AdminTheaterForm />,
            },
// edit data genre  
            {
                path: "/admin/theaters/edit/:id",
// kalo gaada parameter redirect ke halamman genre
                loader: async ({params}) => {
                    if (!params.id) {
                        throw redirect("/admin/theaters");
                    }
// kalo dapet parameter nya tampilin detail genre
                    const detail = await getDetailTheater(params.id);
                    return detail.data;
                },
                element: <AdminTheaterForm />,
            },

// Page Movies
            {
                path: "/admin/movies",
                loader: async () => {
                    const movies = await getMovies();

                    return movies.data;
                },
                element: <AdminMovie />,
            },

// form Add Movies
            {
                path: "/admin/movies/create",
        // opsi genre / theater
                loader: async () => {
                    const genres = await getGenres();
                    const theaters = await getTheaters();

                    return {
                        genres: genres.data,
                        theaters: theaters.data,
                        detail: null,
                    };
                },
                element: <AdminMovieForm />,
            },
            {
				path: "/admin/movies/edit/:id",
				loader: async ({ params }) => {
// kalo gaada param redirect ke halaman movies
					if (!params.id) {
						throw redirect("/admin.movies");
					}
// kalo params ada lanjutin funugsi bawah
					const genres = await getGenres();
					const theaters = await getTheaters();
					const detail = await getDetailMovie(params.id);

					return {
						genres: genres.data,
						theaters: theaters.data,
						detail: detail.data,
					};
				},
				element: <AdminMovieForm />,
			},
// Admin Costumer
            {
                path: "/admin/customers",
                loader: async () => {
                    const customers = await getCustomers();
                    return customers.data;
                },
                element: <AdminCustomer/>,
            },
// Transaction
            {
                path: "/admin/transactions",
                loader: async () => {
                    const transactions = await getTransactions();

                    return transactions.data;
                },
                element: <AdminTransactions />,
            },
// Wallet Transaction
            {
                path: "/admin/wallet-transactions",
                loader: async () => {
                    const walletTransactions = await getWalletTransactions();

                    return walletTransactions.data;
                },
                element: <AdminWalletTransactions />,
            },
        ],
    },
];

export default adminRoutes;