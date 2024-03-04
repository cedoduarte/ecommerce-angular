import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { LoginComponent } from "./pages/login/login.component";
import { PosterComponent } from "./pages/poster/poster.component";
import { ShoppingCartComponent } from "./pages/shopping-cart/shopping-cart.component";
import { StockComponent } from "./pages/stock/stock.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { SettingComponent } from "./pages/setting/setting.component";
import { authGuard } from "./guards/auth.guard";

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent,
        canActivate: [authGuard],
        children: [
            {
                path: "poster",
                component: PosterComponent
            },
            { 
                path: "shopping-cart",
                component: ShoppingCartComponent
            },
            {
                path: "stock",
                component: StockComponent
            },
            {
                path: "profile",
                component: ProfileComponent
            },
            {
                path: "setting",
                component: SettingComponent
            }
        ]
    },
    {
        path: "login",
        component: LoginComponent
    }
];
