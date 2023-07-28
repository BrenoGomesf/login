import { FormControl } from "@angular/forms";
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, RouterEvent } from "@angular/router";
import * as moment from 'moment';

moment.updateLocale('pt-BR', {
    weekdays: [
        "Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"
    ],
    months: [
        "janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
    ]
});

export interface CEPData {
    bairro: string;
    cep: string;
    complemento: string;
    ddd: string;
    gia: string;
    ibge: string;
    localidade: string;
    logradouro: string;
    siafi: string;
    uf: string;
}

export class Utils {
    /**
     * Try catch em linha
     * @param whenError {any} Quando ocorrer erro, retorna este valor
     * @param run {() => any} O que executar
     * @returns {any}
     */
    static try_catch(whenError: any, run: () => {}) {
        try {
            return run();
        } catch (error) {
            return whenError;
        }
    }

    static formatValueNoRealSign(value: string | number): string {
        try {
            let valueFloat: number = typeof value == "number" ? value : parseFloat(value);
            var valueFormatted = valueFloat.toLocaleString('pt-br', { minimumFractionDigits: 2 });
            return valueFormatted;
        } catch (error) {
            return value.toString();
        }
    }

    static formatValueWithRealSign(value: string | number) {
        try {
            let valueFloat: number = typeof value == "number" ? value : parseFloat(value);
            var valueFormatted = valueFloat.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
            return valueFormatted;
        } catch (error) {
            return value;
        }
    }

    static getBaseURL(url: string) {
        let urlObj = new URL(url);
        return `${urlObj.protocol}//${urlObj.host}`
    }

    static getCreditCardBanner(cardNumber: string | FormControl): boolean | { name: string } {
        let cardNumberValue = cardNumber instanceof FormControl ? cardNumber.value : cardNumber;
        const number = cardNumberValue.replace(/[^0-9]+/g, "");

        const cards: any = {
            visa: /^4[0-9]{12}(?:[0-9]{3})/,
            mastercard: /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/,
            diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}/,
            amex: /^3[47][0-9]{13}/,
            discover: /^6(?:011|5[0-9]{2})[0-9]{12}/,
            hipercard: /^(606282\d{10}(\d{3})?)|(3841\d{15})/,
            elo: /^((((636368)|(438935)|(504175)|(451416)|(636297))\d{0,10})|((5067)|(4576)|(4011))\d{0,12})/,
            jcb: /^(?:2131|1800|35\d{3})\d{11}/,
            aura: /^(5078\d{2})(\d{2})(\d{11})$/,
        };

        for (let flag in cards) {
            if (cards[flag].test(number)) {
                const img = {
                    //   url: require(`../assets/img/cards/${flag}.png`),
                    name: flag
                };
                return img;
            }
        }

        return false;
    }

    static isValidMonthYear(validity: string | FormControl): boolean | { isValidMonthYear: true } | undefined | null {
        let validityValue = validity instanceof FormControl ? validity.value : validity;

        let validation: boolean | undefined = ((validityValue: string) => {
            let actualYear = parseInt(moment().year() as any) + 10;
            return moment(validityValue, 'MM/YYYY', true).isValid() && parseInt(moment(validityValue, 'MM/YYYY', true).format('YYYY')) <= actualYear + 5;
        })(validityValue);

        return validity instanceof FormControl ? (typeof validation != "undefined" ? (!validation ? { isValidMonthYear: true } : null) : { isValidMonthYear: true }) : validation;
    }

    static isValidCPF_CNPJ(cpf_cnpj: string | FormControl): boolean | { isValidCPF_CNPJ: true } | undefined | null {
        let cpf_cnpjValue = cpf_cnpj instanceof FormControl ? cpf_cnpj.value : cpf_cnpj;

        let validation: boolean | undefined = ((cpf_cnpjValue: string) => {
            cpf_cnpjValue = cpf_cnpjValue.replace(/[._-]/g, "").replace(/[^\d]+/g, '');
            if (cpf_cnpjValue.length == 11) {
                return Utils.isValidCPF(cpf_cnpjValue) as boolean;
            } else if (cpf_cnpjValue.length == 14) {
                return Utils.isValidCNPJ(cpf_cnpjValue) as boolean;
            }
            return undefined;
        })(cpf_cnpjValue);

        return cpf_cnpj instanceof FormControl ? (typeof validation != "undefined" ? (!validation ? { isValidCPF_CNPJ: true } : null) : { isValidCPF_CNPJ: true }) : validation;
    }

    static isValidCPF(cpf: string | FormControl): boolean | { isValidCPF: true } | null {
        let cpfValue = cpf instanceof FormControl ? cpf.value : cpf;
        if (cpfValue) {
            let validation = ((cpfValue) => {
                var Soma;
                var Resto;
                Soma = 0;
                cpfValue = cpfValue.replace(/[._-]/g, "");
                // Elimina CPFs invalidos conhecidos
                if (cpfValue == "00000000000" ||
                    cpfValue == "11111111111" ||
                    cpfValue == "22222222222" ||
                    cpfValue == "33333333333" ||
                    cpfValue == "44444444444" ||
                    cpfValue == "55555555555" ||
                    cpfValue == "66666666666" ||
                    cpfValue == "77777777777" ||
                    cpfValue == "88888888888" ||
                    cpfValue == "99999999999")
                    return false;
                if (cpfValue.length < 11) return false;

                for (let i = 1; i <= 9; i++) Soma = Soma + parseInt(cpfValue.substring(i - 1, i)) * (11 - i);
                Resto = (Soma * 10) % 11;

                if ((Resto === 10) || (Resto === 11)) Resto = 0;
                if (Resto !== parseInt(cpfValue.substring(9, 10))) return false;

                Soma = 0;
                for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(cpfValue.substring(i - 1, i)) * (12 - i);
                Resto = (Soma * 10) % 11;

                if ((Resto === 10) || (Resto === 11)) Resto = 0;
                if (Resto !== parseInt(cpfValue.substring(10, 11))) return false;
                return true;
            })(cpfValue);

            return cpf instanceof FormControl ? (!validation ? { isValidCPF: true } : null) : validation;
        }else{
            return null
        }
    }

    static isValidCNPJ(cnpj: string | FormControl): boolean | { isValidCNPJ: true } | null {
        let cnpjValue = cnpj instanceof FormControl ? cnpj.value : cnpj;

        let validation: boolean = ((cnpjValue) => {
            cnpjValue = cnpjValue.replace(/[^\d]+/g, '');

            if (cnpjValue == '') return false;

            if (cnpjValue.length != 14)
                return false;

            // Elimina CNPJs invalidos conhecidos
            if (cnpjValue == "00000000000000" ||
                cnpjValue == "11111111111111" ||
                cnpjValue == "22222222222222" ||
                cnpjValue == "33333333333333" ||
                cnpjValue == "44444444444444" ||
                cnpjValue == "55555555555555" ||
                cnpjValue == "66666666666666" ||
                cnpjValue == "77777777777777" ||
                cnpjValue == "88888888888888" ||
                cnpjValue == "99999999999999")
                return false;

            // Valida DVs
            var tamanho: any = cnpjValue.length - 2
            var numeros: any = cnpjValue.substring(0, tamanho);
            var digitos: any = cnpjValue.substring(tamanho);
            var soma = 0;
            var pos = tamanho - 7;
            for (var i = tamanho; i >= 1; i--) {
                soma += numeros.charAt(tamanho - i) * pos--;
                if (pos < 2)
                    pos = 9;
            }
            var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(0))
                return false;

            tamanho = tamanho + 1;
            numeros = cnpjValue.substring(0, tamanho);
            soma = 0;
            pos = tamanho - 7;
            for (i = tamanho; i >= 1; i--) {
                soma += numeros.charAt(tamanho - i) * pos--;
                if (pos < 2)
                    pos = 9;
            }
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(1))
                return false;

            return true;
        })(cnpjValue);

        return (cnpj instanceof FormControl ? (!validation ? { isValidCNPJ: true } : null) : validation);
    }

    static isValidEmail(email: string | FormControl): boolean | { isValidEmail: true } | null {
        let emailValue = email instanceof FormControl ? email.value : email;

        let validation: boolean = ((emailValue: string) => {
            if (emailValue == undefined || emailValue == null || emailValue == "") return false;

            return String(emailValue)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                ) !== null;
        })(emailValue);

        return (email instanceof FormControl ? (!validation ? { isValidEmail: true } : null) : validation);
    }

    static isValidPhone(phone: string | FormControl): boolean | { isValidPhone: boolean } | null {
        let phoneValue = phone instanceof FormControl ? phone.value : phone;

        let validation = ((phoneValue: string) => {
            if (phoneValue == undefined || phoneValue == null || phoneValue == "") return false;

            var telefone = phoneValue.replace(/[^\d]+/g, '');
            var regex = new RegExp('^([0-9]{2}[0-9]{4}[0-9]{4})|([0-9]{2}9[0-9]{4}[0-9]{4})$');
            return regex.test(telefone);
        })(phoneValue);

        return (phone instanceof FormControl ? (!validation ? { isValidPhone: true } : null) : validation);
    }

    static isValidCEP(cep: string | FormControl): boolean | { isValidCEP: true } | null {
        let cepValue = cep instanceof FormControl ? cep.value : cep;

        let validation = ((cepValue: string) => {

            if (cepValue == undefined || cepValue == null || cepValue == "") return false;

            return String(cepValue)
                .toLowerCase()
                .match(
                    /^[0-9]{2}.[0-9]{3}-[0-9]{3}$/
                ) !== null;
        })(cepValue);

        return (cep instanceof FormControl ? (!validation ? { isValidCEP: true } : null) : validation);
    }

    static getDataCEP(cep: string | FormControl): Promise<CEPData> {
        return new Promise((resolve, reject) => {
            let cepValue = cep instanceof FormControl ? cep.value : cep;
            if (cepValue !== undefined && cepValue.replace(/[._-]/g, "").toString().length == 8) {
                fetch(`https://viacep.com.br/ws/${cepValue.replace(/[._-]/g, "")}/json/`)
                    .then(response => response.json())
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        reject(error);
                    });
            } else {
                reject("CEP inválido");
            }
        });
    }

    static getErrorMsg(fieldName: string, validatorName: string, validatorValue?: any): string {
        const config: any = {
            'required': `${fieldName} é obrigatório.`,
            'minlength': `${fieldName} precisa ter no mínimo ${validatorValue.requiredLength} caracteres.`,
            'maxlength': `${fieldName} precisa ter no máximo ${validatorValue.requiredLength} caracteres.`,
            'isValidCEP': 'CEP inválido.',
            'isValidEmail': 'E-mail informado está incorreto.',
            'isValidPhone': 'Telefone inválido.',
            'isValidCNPJ': 'CNPJ inválido',
            'isValidCPF': 'CPF inválido',
            'isValidCPF_CNPJ': 'CPF/CNPJ inválido.',
            'isValidMonthYear': 'Data inválida.',
            'equalsTo': 'Campos não são iguais.',
            'pattern': 'Campo inválido.',
            'email': 'Email inválido.',
            'mask': 'Formato incorreto.',
        };

        return config[validatorName];
    }

    static formatBPeKey(chaveBpe: string): any {
        chaveBpe = chaveBpe.replace(/[^\d]/g, "");
        return chaveBpe.match(/.{1,4}/g)!.join(" ");

    }

    static getDateFormatted(date: string | Date, format: string): string {
        return moment(date).format(format);
    }

    static formatDocument(cpf_cnpj_rg: string) {
        cpf_cnpj_rg = cpf_cnpj_rg.replace(/[^\d]/g, "");
        if (cpf_cnpj_rg.length == 11) return cpf_cnpj_rg.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
        else if (cpf_cnpj_rg.length == 14) return cpf_cnpj_rg.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
        else return cpf_cnpj_rg
    }

    static read_xml(xml: string): any {
        let parser = new DOMParser();
        let xmlDoc = parser.parseFromString(xml, "text/xml");
        let json = Utils.xmlToJson(xmlDoc);
        return json;
    }

    static navigationInterceptor(event: any): boolean {
        if (event instanceof NavigationStart) {
            return true;
        }
        if (event instanceof NavigationEnd) {
            return false;
        }

        // Set loading state to false in both of the below events to hide the spinner in case a request fails
        if (event instanceof NavigationCancel) {
            return false;
        }
        if (event instanceof NavigationError) {
            return false;
        }

        return true;
    }

    protected static xmlToJson(xml: any): any {
        let obj: any = {};

        if (xml.nodeType == 1) { // element
            // do attributes
            if (xml.attributes.length > 0) {
                obj["@attributes"] = {};
                for (let j = 0; j < xml.attributes.length; j++) {
                    let attribute = xml.attributes.item(j);
                    obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
                }
            }
        } else if (xml.nodeType == 3) { // text
            obj = xml.nodeValue;
        }

        // do children
        if (xml.hasChildNodes()) {
            for (let i = 0; i < xml.childNodes.length; i++) {
                let item = xml.childNodes.item(i);
                let nodeName = item.nodeName;
                if (typeof (obj[nodeName]) == "undefined") {
                    obj[nodeName] = this.xmlToJson(item);
                } else {
                    if (typeof (obj[nodeName].push) == "undefined") {
                        let old = obj[nodeName];
                        obj[nodeName] = [];
                        obj[nodeName].push(old);
                    }
                    obj[nodeName].push(this.xmlToJson(item));
                }
            }
        }
        return obj;
    }
    static daysInMonth(month: number): number {
        const date = new Date();
        const lastDay = new Date(date.getFullYear(), month, 0);
        return lastDay.getDate();
    }
}