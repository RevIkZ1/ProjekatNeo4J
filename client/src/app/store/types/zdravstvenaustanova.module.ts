export interface ZdravstvenaUstanova {
  id?: number;
  naziv?: string;
  adresa?: string;
  kontaktTelefon?: string;
}
export class ZdravstvenaUstanovaModel implements ZdravstvenaUstanova {
  id?: number;
  naziv?: string;
  adresa?: string;
  kontaktTelefon?: string;

  constructor(
    id?: number,
    naziv?: string,
    adresa?: string,
    kontaktTelefon?: string
  ) {
    this.id = id;
    this.naziv = naziv;
    this.adresa = adresa;
    this.kontaktTelefon = kontaktTelefon;
  }
}
