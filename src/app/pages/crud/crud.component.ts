import { Component, OnInit } from '@angular/core';
import { provideRoutes, Router } from '@angular/router';
import { empty, Observable } from 'rxjs';
// import { SuperHeroes } from 'src/app/models/heroes';
import { MarvelService } from 'src/app/servives/marvel.service';
import { SuperHeroes } from 'src/app/models/heroes';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { heroArray } from 'src/app/models/hero.array';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CRUDComponent implements OnInit {

  title='CRUD';
  form_hero!: FormGroup;
  characters?:Observable<any>;
  selectedHero: SuperHeroes = new SuperHeroes(0, '');
  heroArray = heroArray;

  constructor(private marvelSvc:MarvelService, private router:Router, private fb: FormBuilder) { }

  ngOnInit(): void{
    this.getAllCharacters();
    this.form_hero = this.fb.group({
      hero_id: ['', Validators.required],
      hero_name: ['', Validators.required]
    });
  }

  getAllCharacters() {
    this.characters = this.marvelSvc.getCRUD();
  }

  getCharacter(id:string) {
    console.log(id);
  }

  openForEdit(hero: SuperHeroes) {
    this.selectedHero = hero;
    this.setHeroInForm(); 
  }

  addOrEdit() {
    if (!this.areInputsEmpty()) {
      let oldHeroId = this.selectedHero.id;
      if (!oldHeroId) {
        this.heroArray.push(new SuperHeroes(this.form_hero.get('hero_id')?.value, this.form_hero.get('hero_name')?.value))
      }
      let index = this.heroArray.findIndex(hero => oldHeroId === hero.id);
      this.setHeroSelected();
      this.heroArray[index] = this.selectedHero;
      this.clearForm();
    }
  }

  delete() {
    if(confirm('Are you sure you want to delete it?')){
    this.heroArray = this.heroArray.filter(x => x != this.selectedHero);
    this.selectedHero = new SuperHeroes(0, '');
  }
}

  cancel() {
    this.selectedHero = new SuperHeroes(0, '');
  }

  setHeroInForm() {
    this.form_hero.get("hero_id")?.setValue(this.selectedHero.id);
    this.form_hero.get("hero_name")?.setValue(this.selectedHero.name);
  }

  areInputsEmpty(): boolean {
    let id = this.form_hero.get('hero_id')?.value;
    let name =  this.form_hero.get('hero_name')?.value;
    return !(id || name);
  }

  setHeroSelected() {
    this.selectedHero.id = this.form_hero.get('hero_id')?.value;
    this.selectedHero.name = this.form_hero.get('hero_name')?.value;
  }

  clearForm() {
    this.form_hero.reset();
    this.selectedHero = new SuperHeroes(0, '');
  }
  
}