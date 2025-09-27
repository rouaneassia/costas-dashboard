import { createBrowserRouter } from "react-router-dom";
import Publication from "../pages/Publication";
import Addequipe from "../pages/Addequipe";
import ListEquipes from "../pages/ListEquipes";
import Addpublication from "../pages/AddPublication";
import Homepublication from "../pages/PublicationList";

import LoginForm from "../auth/Login";
import Register from "../auth/register";
import ProtectedRoute from "../conditions/ProtectedRoute";
import AuthProtected from "../conditions/AuthProtected";
import NotFound from "../composantDashbord/404";
import PublicationDetail from "../composantDashbord/PublicationDetail";
import AppLayout from "../Layout/AppLayout";
import Rendevous from "../pages/RendezVous";
import EquipeDetail from "../composantDashbord/EquipeDetail";
import ModifierEquipe from "../composantDashbord/ModifierEquipe";
import ModifierPublication from "../composantDashbord/Updatepublication";

export const router = createBrowserRouter([
    {

                path: "login",
                element: (
                    <AuthProtected>
                        <LoginForm />
                    </AuthProtected>
                ),
            },
            {
                path: "register",
                element: (
                    <AuthProtected>
                        <Register />
                    </AuthProtected>
                ),
           
    },
    {
        path: "/",
        errorElement: <NotFound />,
        element: <AppLayout />,
        children: [
            {
                index: true,
                element: (
                    <ProtectedRoute>
                        <Publication />
                    </ProtectedRoute>
                ),
            },
            {
                path: "ajouter-equipe",
                element: (
                    <ProtectedRoute>
                        <Addequipe />
                    </ProtectedRoute>
                ),
            },
            {
                path: "liste-equipe",
                element: (
                    <ProtectedRoute>
                        <ListEquipes />
                    </ProtectedRoute>
                ),
            },
            {
                path: "ajouter-publication",
                element: (
                    <ProtectedRoute>
                        <Addpublication />
                    </ProtectedRoute>
                ),
            },
            {
                path: "liste-publications",
                element: (
                    <ProtectedRoute>
                        <Homepublication />
                    </ProtectedRoute>
                ),
            },
            {
                path: "equipe/:id",
                element: (
                    <ProtectedRoute>
                        < ModifierEquipe />
                    </ProtectedRoute>
                ),
            },
           
            {
                path: "publication/:id",
                element: (
                    <ProtectedRoute>
                        <PublicationDetail />
                    </ProtectedRoute>

                )
            },
            {
                path: "/equipe/detail/:id",
                element: (
                    <ProtectedRoute>
                        <EquipeDetail />
                    </ProtectedRoute>

                )
            },
             {
                path: "/modifier-publication/:id",
                element: (
                    <ProtectedRoute>
                        <ModifierPublication />
                    </ProtectedRoute>

                )
            },
           
            {
                path: "reservation",
                element: (
                    <ProtectedRoute>
                        <Rendevous />
                    </ProtectedRoute>
                )
            }
        ],
    },
]);
