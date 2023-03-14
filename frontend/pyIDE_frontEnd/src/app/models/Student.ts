/**
 *  Student.ts
 * Alvin Tsang
 * 
 * Student class
 */
export class Student {
    private email: string;
    private password: string;
    private userID: string;

    constructor(email: string, password: string) {
            this.email = email;
            this.password = password;
            this.userID = "";
    }

    public getEmail(): string { return this.email}
    public setEmail(email: string): void {this.email = email}

    public getPassword(): string { return this.password}
    public setPassword(password: string): void { this.password = password}

    public getUserID(): string { return this.userID}
    public setUserID(userID: string): void { this.userID = userID}

    public print() {
        console.log(`Email:\t\t${this.email}\nPassword:\t${this.password}\nUserID:\t\t${this.userID}`)
    }




}