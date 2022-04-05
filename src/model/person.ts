export interface PersonRequest {
    nif: number;
    nome?: string;
    dataNascimento?: string;
    idTipoDocumento?: number;
    numeroDocumento?: string;
    arruamento?: string;
    moradaZonaBairro?: string;
    loteNPolicia?: string;
    fraccao?: string;
}

export interface PersonResponseError {
    type: string
    title: string
    status: number
    detail: string
    traceId?: string | undefined
}

export interface PersonResponse {
    id: number;
    nif: number;
    nome: string;
    dataNascimento: string;
    tipoPessoa: string;
    isCoimasEmAtraso: boolean;
    representanteLegal: string;
    coimasEmAtraso: CoimasEmAtraso[];
    documentos: Documento[];
    historicoDocumentos: Documento[];
    moradas: Morada[];
    historicoMoradas: Morada[];
}

interface Morada {
    dataEliminacao: string;
    id: number;
    idPessoa: number;
    idOrganizacao: number;
    numeroPolicia: number;
    codigoPostal: number;
    morada: string;
    domicilioSede: string;
    localidade: string;
    fracao: string;
    principal: boolean;
    local: TipoDocumento;
    pais: TipoDocumento;
}

interface Documento {
    id: number;
    idPessoa: number;
    idOrganizacao: number;
    visualizado: boolean;
    isTituloConducao: boolean;
    principal: boolean;
    numero: string;
    categoria: string;
    tipoDocumento: TipoDocumento;
    entidadeEmissao: TipoDocumento;
    paisEmissao: TipoDocumento;
    localEmissao: TipoDocumento;
}

interface TipoDocumento {
    id: number;
    descricao: string;
}

interface CoimasEmAtraso {
    id: number;
    idVeiculo: number;
    idPessoa: number;
    data: string;
    numeroAuto: number;
    codInfracao: number;
    valor: number;
    valorChecado: boolean;
    custas: number;
    custasChecada: boolean;
    total: number;
}