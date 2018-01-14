export class Game {
    name: string;
    dateRelease?: Date; 
    constructor(name: string, dateRelease?: string) {
        this.name = name
        if (dateRelease) {
            this.dateRelease = new Date(dateRelease);
        }
    }
}
