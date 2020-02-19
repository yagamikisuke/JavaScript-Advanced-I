import {View} from './View';
import {DateHelper} from '../helpers/DateHelper';
import { currentIntance } from "../controllers/NegociacaoController";

export class NegociacoesView extends View {

    constructor(elemento){

        super(elemento)
        elemento.addEventListener('click', function(event){

            if(event.target.nodeName == 'TH') currentIntance().ordena(event.target.textContent.toLowerCase())
        });
    }

    template(model){
        return `
                <table class="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>DATA</th>
                            <th>QUANTIDADE</th>
                            <th>VALOR</th>
                            <th>VOLUME</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        ${model.negociacoes.map(negociacao => `
                        <tr>
                            <td>${DateHelper.dataParaTexto(negociacao.data)}</td>
                            <td>${negociacao.quantidade}</td>
                            <td>${negociacao.valor}</td>
                            <td>${negociacao.volume}</td>
                        </tr>
                        `).join("")}
                    </tbody>
                    
                    <tfoot>
                        <tr>
                            <td colspan=3></td>
                            <td>${model.volumeTotal}</td>
                        </tr>
                    </tfoot>
                </table>
            `
    }
}