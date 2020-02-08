import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbInputModule } from 'ngb-input';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { LoginComponent } from './components/login/login.component';
import { LibraryComponent } from './components/library/library.component';
import { LibraryFormComponent } from './components/library/form/library-form.component';

import { SessionService } from './services/session.service';
import { DatabaseService } from './services/database.service';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        LibraryComponent,
        LibraryFormComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        NgbInputModule,
        NgbModalModule
    ],
    providers: [
        SessionService,
        DatabaseService
    ],
    entryComponents: [
        LibraryFormComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
