import {Person} from "@/api/person";
import {PersonRequest, PersonResponse} from "@/model/person";

export default function person() {
    const personInstance: Person = new Person();

    const getByNIF = (data: PersonRequest): Promise<void> => {
        return new Promise((resolve, reject) => {

            personInstance.getByNIF(data).then((data) => {
                console.log(data)
                resolve()
            }).catch((error) => {
                reject(error)
            })

        })

    }

    return {searchPersonByNIF: getByNIF}
}