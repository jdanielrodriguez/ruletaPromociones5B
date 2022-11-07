import { Component } from "@angular/core";

@Component ({
    selector: 'mi-componente',
    templateUrl: './mi-componente.component.html'
})
export class MiComponente{

    public titulo: string;
    public comentario: string;
    public year: number;

    constructor(){
        this.titulo = "Hola Mundo!"
        this.comentario = "Este es el comentario";
        this.year = 2022;

        console.log("Componente mi-componnte cargado!!");
    }

}