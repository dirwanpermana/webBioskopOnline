// untuk membuat route page customer

import { redirect, type RouteObject } from "react-router-dom";
import CustomerSignUp from "@/pages/CustomerSignUp";
import CustomerSignIn from "@/pages/CustomerSignIn";
import CustomerHome from "@/pages/CustomerHome";
import { getSession } from "@/lib/utils";
import {
  getDetailMovie,
  getGenres,
  getMovies,
} from "@/services/global/global.service";
import CustomerBrowseGenre from "@/pages/CustomerBrowseGenre";
import { getTheaters } from "@/services/theater/theater.service";
import CustomerMovieDetail from "../pages/CustomerMovieDetail";
import CustomerTransaction from "@/pages/CustomerTransaction";
import CustomerTransactionSuccess from "@/pages/CustomerTransactionSuccess";
import CustomerWallet from "@/pages/CustomerWallet";
import CustomerWalletTopup from "@/pages/CustomerWalletTopup";
import CustomerWalletTopupSuccess from "@/pages/CustomerWalletTopupSuccess";
import CustomerOrders from "@/pages/CustomerOrders";
import {
  getOrderDetail,
  getOrders,
} from "@/services/transaction/transaction.service";
import CustomerOrderDetail from "@/pages/CustomerOrderDetail";
import CustomerSettings from "@/pages/CustomerSettings";

const customerRoutes: RouteObject[] = [
  // signUp
  {
    path: "/sign-up",
    element: <CustomerSignUp />,
  },
  // SignIn
  {
    path: "/sign-in",
    element: <CustomerSignIn />,
  },
  // Home
  {
    path: "/",
    // verifikasi login dulu sebelum masuk home
    loader: async () => {
      const user = getSession();
      // kalo !user atau role user bukan customer lemppar ke page sign in
      if (!user || user.role !== "customer") {
        throw redirect("/sign-in");
      }
      // kalo user bener tampilin data nya
      const movies = await getMovies();
      const genres = await getGenres();
      return {
        movies: movies.data,
        genres: genres.data,
      };
    },
    element: <CustomerHome />,
  },
  // CustomerBrowseGenre
  {
    path: "/browse/:genreId",
    loader: async ({ params }) => {
      const user = getSession();
      if (!user || user.role !== "customer") {
        throw redirect("/sign-in");
      }

      if (!params.genreId) {
        throw redirect("/");
      }

      const genres = await getGenres();
      const theaters = await getTheaters("customer");

      console.log({
        genres,
        theaters,
      });
      return {
        genres: genres.data,
        theaters: theaters.data,
      };
    },
    element: <CustomerBrowseGenre />,
  },
  // CustomerMovieDetail
  {
    path: "/movie/:movieId",
    loader: async ({ params }) => {
      const user = getSession();
      if (!user || user.role !== "customer") {
        throw redirect("/sign-in");
      }

      if (!params.movieId) {
        throw redirect("/");
      }
      const movieDetail = await getDetailMovie(params.movieId); //ambil data movie detail dari service
      return {
        detail: movieDetail.data.movie,
      };
    },
    element: <CustomerMovieDetail />,
  },
  // Customer Checkout
  {
    path: "/transaction-ticket",
    loader: async () => {
      const user = getSession();

      if (!user || user.role !== "customer") {
        throw redirect("/sign-in");
      }

      return true;
    },
    element: <CustomerTransaction />,
  },
  // transaction Success
  {
    path: "/transaction-ticket/success",
    loader: async () => {
      const user = getSession();

      if (!user || user.role !== "customer") {
        throw redirect("/sign-in");
      }

      return true;
    },
    element: <CustomerTransactionSuccess />,
  },
  // ewallet
  {
    path: "/wallets",
    loader: async () => {
      const user = getSession();

      if (!user || user.role !== "customer") {
        throw redirect("/sign-in");
      }

      return true;
    },
    element: <CustomerWallet />,
  },
  // CustomerWalletTopup
  {
    path: "/wallets/topup",
    loader: async () => {
      const user = getSession();

      if (!user || user.role !== "customer") {
        throw redirect("/sign-in");
      }

      return true;
    },
    element: <CustomerWalletTopup />,
  },
  // CustomerWalletTopupSuccess
  {
    path: "/wallets/topup/success",
    loader: async () => {
      const user = getSession();

      if (!user || user.role !== "customer") {
        throw redirect("/sign-in");
      }

      return true;
    },
    element: <CustomerWalletTopupSuccess />,
  },
  // Customer Order
  {
    path: "/orders",
    loader: async () => {
      const user = getSession();

      if (!user || user.role !== "customer") {
        throw redirect("/sign-in");
      }

      const transactions = await getOrders();

      return transactions.data;
    },
    element: <CustomerOrders />,
  },
  // Page Order detail ticket
  {
    path: "/orders/:orderId",
    loader: async ({ params }) => {
      const user = getSession();

      if (!user || user.role !== "customer") {
        throw redirect("/sign-in");
      }
// kalo gaada id redirect ke halaman orders
      if (!params.orderId) {
        throw redirect("/orders");
      }
// kalo ada id ambil api getorderdetail
      const transaction = await getOrderDetail(params.orderId);

      return transaction.data;
    },
    element: <CustomerOrderDetail />,
  },
// Customer Settings
  {
  	path: "/settings",
  	loader: async () => {
  		const user = getSession();

  		if (!user || user.role !== "customer") {
  			throw redirect("/sign-in");
  		}

  		return true;
  	},
  	element: <CustomerSettings />,
  },
];

export default customerRoutes;
