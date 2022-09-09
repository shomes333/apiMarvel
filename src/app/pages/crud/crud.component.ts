import { Component, OnInit } from '@angular/core';
import { provideRoutes, Router } from '@angular/router';
import { empty, Observable } from 'rxjs';
// import { SuperHeroes } from 'src/app/models/heroes';
import { MarvelService } from 'src/app/servives/marvel.service';
import { SuperHeroes } from 'src/app/models/heroes';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CRUDComponent implements OnInit {

  title='CRUD';
  form_hero!: FormGroup;

  constructor(private marvelSvc:MarvelService, private router:Router, private fb: FormBuilder) { }
  characters?:Observable<any>;

  ngOnInit(): void{
    this.getAllCharacters();
    this.form_hero = this.fb.group({
      hero_id: ['', Validators.required],
      hero_name: ['', Validators.required]
    });
  }
  getAllCharacters(){
    this.characters = this.marvelSvc.getCRUD();
  }
  getCharacter(id:string){
    console.log(id);
  }
  heroArray: SuperHeroes[] = [
    {id: 1011334, name: "3-D Man "},
    {id: 1017100, name: "A-Bomb (HAS) "},
    {id: 1009144, name: "A.I.M. "},
    {id: 1010699, name: "Aaron Stack "},
    {id: 1009146, name: "Abomination (Emil Blonsky) "},
    {id: 1016823, name: "Abomination (Ultimate) "},
    {id: 1009148, name: "Absorbing Man "},
    {id: 1009149, name: "Abyss "},
    {id: 1010903, name: "Abyss (Age of Apocalypse) "},
    {id: 1011266, name: "Adam Destine "},
    {id: 1010354, name: "Adam Warlock "},
    {id: 1010846, name: "Aegis (Trey Rollins) "},
    {id: 1017851, name: "Aero (Aero) "},
    {id: 1012717, name: "Agatha Harkness "},
    {id: 1011297, name: "Agent Brand "},
    {id: 1011031, name: "Agent X (Nijo) "},
    {id: 1009150, name: "Agent Zero "},
    {id: 1011198, name: "Agents of Atlas "},
    {id: 1011175, name: "Aginar "},
    {id: 1011136, name: "Air-Walker (Gabriel Lan) "},
  ];

  selectedHero: SuperHeroes = new SuperHeroes();

  openForEdit(hero: SuperHeroes) {
    this.selectedHero = hero;
  }

  addOrEdit(){
    console.log(this.form_hero)
    if (this.selectedHero !== new SuperHeroes){
    this.heroArray.push(this.selectedHero);
    }
    this.selectedHero = new SuperHeroes();

    
  }
  delete() {
    if(confirm('Are you sure you want to delete it?')){
    this.heroArray = this.heroArray.filter(x => x != this.selectedHero);
    this.selectedHero = new SuperHeroes();
  }
}
  cancel(){
    this.selectedHero = new SuperHeroes();
  }
}
