const tipoDocumento = [
    {
        ID: 1,
        DESCRICAO: "Outro"
    }, {
        ID: 2,
        DESCRICAO: "Apólice/Certificado de Seguro"
    }, {
        ID: 3,
        DESCRICAO: "Bilhete de Identidade"
    },
    {
        ID: 4,
        DESCRICAO: "Boletim de Nascimento"
    },
    {
        ID: 5,
        DESCRICAO: "Carta de Condução"
    },
    {
        ID: 6,
        DESCRICAO: "Carta de Navegador de Recreio"
    }, {
        ID: 7,
        DESCRICAO: "Cartão de Contribuinte"
    }
];

const pais = [
    {
        ID: 1,
        SIGLA: 'SC',
        DESCRICAO: 'Seychelles',
        CD_ISO: 'SC',
        STATUS: 'A',
        DT_ATUALIZACAO: '2007-02-22 16:53:09.057'
    }, {
        ID: 2,
        SIGLA: 'SG',
        DESCRICAO: 'Singapura',
        CD_ISO: 'SG',
        STATUS: 'A',
        DT_ATUALIZACAO: '2007-02-22 16:53:09.057'
    }, {
        ID: 3,
        SIGLA: 'SY',
        DESCRICAO: 'Síria',
        CD_ISO: 'SY',
        STATUS: 'A',
        DT_ATUALIZACAO: '2007-02-22 16:53:09.057'
    }, {
        ID: 4,
        SIGLA: 'SO',
        DESCRICAO: 'Somália',
        CD_ISO: 'SO',
        STATUS: 'A',
        DT_ATUALIZACAO: '2007-02-22 16:53:09.057'
    }, {
        ID: 5,
        SIGLA: 'LK',
        DESCRICAO: 'Sri Lanca',
        CD_ISO: 'LK',
        STATUS: 'A',
        DT_ATUALIZACAO: '2007-02-22 16:53:09.057'
    },
]

const entidade = [{
    ID: 1,
    DESCRICAO: 'ANSR'
},
    {
        ID: 2,
        DESCRICAO: 'AT'
    }, {
        ID: 4,
        DESCRICAO: 'IRN'
    }, {
        ID: 5,
        DESCRICAO: 'SEF'
    }, {
        ID: 6,
        DESCRICAO: 'GNR'
    },
];

const distrito = [{
    ID: 1,
    DESCRICAO: 'Aveiro'
}, {
    ID: 2,
    DESCRICAO: 'Beja'
}, {
    ID: 3,
    DESCRICAO: 'Braga'
}, {
    ID: 4,
    DESCRICAO: 'Bragança'
}, {
    ID: 5,
    DESCRICAO: 'Castelo Branco'
},
]

const saveLocallyInfo = () => {
    localStorage.TIPO_DOCUMENTO = JSON.stringify(tipoDocumento);
    localStorage.PAIS = JSON.stringify(pais);
    localStorage.ENTIDADE = JSON.stringify(entidade);
    localStorage.DISTRITO = JSON.stringify(distrito);
}
saveLocallyInfo();


export const savePersonInfo = (data: any) => {
    let PERSON_INFO = JSON.parse(localStorage.getItem('PERSON_INFO') || '[]');
    PERSON_INFO = PERSON_INFO !== 1 && PERSON_INFO.length ? PERSON_INFO : [];
    PERSON_INFO.push(data);

    localStorage.PERSON_INFO = JSON.stringify(PERSON_INFO);
}