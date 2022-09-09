import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { CharactersComponent } from './pages/characters/characters.component';
import { CharacterComponent } from './pages/character/character.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ComicsComponent } from './pages/comics/comics.component';
import { ComicComponent } from './pages/comic/comic.component';
import { CRUDComponent } from './pages/crud/crud.component';

@NgModule({
  declarations: [
    AppComponent,
    CharactersComponent,
    CharacterComponent,
    NavbarComponent,
    ComicsComponent,
    ComicComponent,
    CRUDComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule  
  ],
  providers: [FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule { }
