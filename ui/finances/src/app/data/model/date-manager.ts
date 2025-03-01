export class DateManager {
    // selected date of viewing
    private _currentDate: Date;
    private _realCurrentDate: Date;

    constructor() {
        this._currentDate = new Date();
        this._realCurrentDate = new Date();
    }

    get currentDate(): Date {
        return new Date(this._currentDate);
    }

    get realCurrentDate(): Date {
        return new Date(this._realCurrentDate);
    }

    setCurrentDate(date: Date): void {
        this._currentDate = new Date(date);
    }

    setRealCurrentDate(date: Date): void {
        this._realCurrentDate = new Date(date);
    }
}