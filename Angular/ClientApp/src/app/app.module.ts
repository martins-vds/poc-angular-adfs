import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AuthModule, LogLevel, OidcConfigService, OidcSecurityService } from 'angular-auth-oidc-client';
import { AppComponent } from './app.component';
import { routing } from './app.routes';
import { AuthorizationGuard } from './authorization.guard';
import { AutoLoginComponent } from './auto-login/auto-login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { ProtectedComponent } from './protected/protected.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';

export function loadConfig(oidcConfigService: OidcConfigService) {
    return () =>
        oidcConfigService.withConfig({
            stsServer: 'https://adfs.vinima.org/adfs',
            authWellknownEndpoint: 'https://adfs.vinima.org/adfs/.well-known/openid-configuration',
            redirectUrl: window.location.origin,
            postLogoutRedirectUri: window.location.origin,
            clientId: 'ba25899d-46b7-459e-8ddf-639cd61da658',
            scope: 'openid profile email api://e38ea64a-2962-4cde-bfe7-dd2822fdab32/user_impersonation',
            responseType: 'id_token token',
            silentRenew: true,
            maxIdTokenIatOffsetAllowedInSeconds: 600,
            issValidationOff: true,
            autoUserinfo: false,
            silentRenewUrl: window.location.origin + '/silent-renew.html',
            logLevel: LogLevel.Debug,          
        });
}

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        AutoLoginComponent,
        ForbiddenComponent,
        UnauthorizedComponent,
        ProtectedComponent,
        FetchDataComponent,
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
        HttpClientModule,
        AuthModule.forRoot(),
        FormsModule,
        routing,
    ],
    providers: [
        OidcSecurityService,
        OidcConfigService,
        {
            provide: APP_INITIALIZER,
            useFactory: loadConfig,
            deps: [OidcConfigService],
            multi: true,
        },
        AuthorizationGuard,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
