import { Component, OnInit, NgModule } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from "rxjs/operators";

import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';


@Component({
selector: 'app-ver-pais',
templateUrl: './ver-pais.component.html',
styles: [
]
})
export class VerPaisComponent implements OnInit {


	pais!: Country;

	constructor(
		private activatedRoute: ActivatedRoute,
		private paisService: PaisService) { }

	ngOnInit(): void {

		/*
		//sin RxJS !!
		this.activatedRoute.params
		.subscribe(params => {
			console.log(params.id);

			this.paisService.getPaisPorAlpha(params.id)
			.subscribe( (pais) => {
				//this.pais = pais;
				console.log(pais);
			});
		})*/

		//con RxJS !!
		this.activatedRoute.params
			.pipe(
				switchMap( ({id}) => this.paisService.getPaisPorAlpha(id)),  //{id} es desestructuracion de params ;)
				tap(console.log)
			)
			.subscribe(pais => {
				console.log(pais);
				this.pais = pais;

			});
	}

}
