import {Person} from "@/api/person";
import {PersonRequest, PersonResponse, PersonResponseError} from "@/model/person";

export default function person() {
    const personInstance: Person = new Person();

    const getByNIF = (data: PersonRequest): Promise<PersonResponse | PersonResponseError> => {
        return new Promise((resolve, reject) => {

            personInstance.getByNIF(data).then((data) => {
                resolve(data)
            }).catch((error) => {
                reject(error)
            })

        })

    }

    return {searchPersonByNIF: getByNIF}
}