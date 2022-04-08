import {Person} from "./../api/Person";
import {PersonRequest, PersonResponse, PersonResponseError} from "./../model/person";
import {networkConditions} from "@/state";

export default function person() {
    const personInstance: Person = new Person();

    const getByNIF = (data: PersonRequest): Promise<PersonResponse | PersonResponseError> => {
        return new Promise((resolve, reject) => {

            personInstance.getByNIF(data).then((data) => {
                resolve(data)
            }).catch((error: any) => {
                reject(error);
                if(error.message === 'timeout of 3000ms exceeded') {
                    networkConditions.value = 'offline'
                } else {
                    networkConditions.value = 'online'
                }

            })

        })

    }

    return {searchPersonByNIF: getByNIF}
}