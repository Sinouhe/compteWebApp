import { identifierModuleUrl } from '@angular/compiler';
import { SuperClass } from './modelDeClasse/SuperClass';
import { JsonPipe } from '@angular/common';

export class DepenseFixe extends SuperClass {

    private _sNom: string;
    private _sDescription: string;
    private _nMontant: number;
    private _sId: string;

    constructor(p_sNom: string = '', p_sDescription: string = '', p_nNomtant: number = 0,  p_sId: string = '') {
        super();
        this._sNom = p_sNom;
        this._sDescription = p_sDescription;
        this._sId = p_sId;
        this._nMontant = p_nNomtant;
    }

    public get sDescription(): string {
        return this._sDescription;
    }

    public get sNom(): string {
        return this._sNom;
    }

    public get sId(): string {
        return this._sId;
    }

    public get nMontant(): number {
        return this._nMontant;
    }

    public set sDescription(p_sDescription) {
        this._sDescription = p_sDescription;
    }

    public set sNom(p_sNom: string) {
        this._sNom = p_sNom;
    }

    public set sId(p_sId: string) {
        this._sId = p_sId;
    }

    public set nMontant(p_nMontant: number) {
        this._nMontant = p_nMontant;
    }

    toStringVersConsole(): void {
        console.log('typeDepense class log ' + JSON.stringify(this));
    }

}
