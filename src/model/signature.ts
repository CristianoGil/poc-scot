export interface ResponseError {
    type: string
    title: string
    status: number
    detail: string
    traceId?: string | undefined
}

export interface ResponseSignature {
    pdf: ArrayBuffer | string | undefined
    posy: number
    posx: number
}