import { identifierModuleUrl } from '@angular/compiler';

export class TypeDepense {

    private _sNom: string;
    private _sDescription: string;
    private _id: string;

    constructor(p_sNom: string = '', _sDescription: string = '') {
        this._sNom = p_sNom;
        this._sDescription = _sDescription;
    }

    public get sDescription(): string {
        return this._sDescription;
    }

    public get sNom(): string {
        return this._sNom;
    }

    public get id(): string {
        return this._id;
    }

    public set sDescription(p_sDescription) {
        this._sDescription = p_sDescription;
    }

    public set sNom(p_sNom) {
        this._sNom = p_sNom;
    }

}
