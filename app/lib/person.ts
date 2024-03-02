export interface Person {
    id: number;
    firstname: string;
    lastname: string;
    phone: string;
    dateOfBirth: Date;
}

export const convertDateOfBirthToString = (person: Person): string => {
    let parsedDateOfBirth: string;
    try{
        parsedDateOfBirth = person.dateOfBirth.toISOString().split('T')[0];
    } catch (TypeError) {
        parsedDateOfBirth =  person.dateOfBirth.toString().split('T')[0]
    }
    return parsedDateOfBirth
}