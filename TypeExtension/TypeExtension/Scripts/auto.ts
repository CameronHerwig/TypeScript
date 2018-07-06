interface IEngine {
    start(callback: (startStatus: boolean, engineType: string) => void);
    stop(callback: (stopStatus: boolean, engineType: string) => void);
}

interface IAutoOptions {
    basePrice: number;
    engine: IEngine;
    make: string;
    model: string;
    state: string;
    year: number;
}

interface ITruckOptions extends IAutoOptions {
    bedLength: string;
    fourByFour: boolean;
}

class Engine implements IEngine{
    constructor(public horsePower: number, public engineType: string) { }

    start(callback: (startStatus: boolean, engineType: string) => void) {
        window.setTimeout(() => {
            callback(true, this.engineType);
        }, 1000);
    }

    stop(callback: (stopStatus: boolean, engineType: string) => void) {
        window.setTimeout(() => {
            callback(true, this.engineType);
        }, 1000);
    }
}

class CustomEngine implements IEngine {
    start(callback: (startStatus: boolean, engineType: string) => void) {
        window.setTimeout(() => {
            callback(true, "Custom Engine");
        }, 1000);
    }

    stop(callback: (stopStatus: boolean, engineType: string) => void) {
        window.setTimeout(() => {
            callback(true, "Custom Engine");
        }, 1000);
    }
}

class Accessory {
    constructor(public accessoryNumber: number, public title: string) {}
}

class Auto {
    private _basePrice: number;
    private _engine: IEngine;
    make: string;
    model: string;
    accessoryList: string;
    state: string;
    year: number;

    constructor(options:IAutoOptions) {
        this.engine = options.engine;
        this.basePrice = options.basePrice;
        this.make = options.make;
        this.model = options.model;
        this.state = options.state;
        this.year = options.year;
    }

    calculateTotal() : number {
        var taxRate = .08;
        return this.basePrice + (taxRate * this.basePrice);
    }

    addAccessories(...accessories: Accessory[]) {
        this.accessoryList = '';
        for (var i = 0; i < accessories.length; i++) {
            var ac = accessories[i];
            this.accessoryList += ac.accessoryNumber + ' ' + ac.title + '<br />';
        }
    }

    getAccessoryList(): string {
        return this.accessoryList;
    }

    get basePrice(): number {
        return this._basePrice;
    }

    set basePrice(value: number) {
        if (value <= 0) throw 'price must be >= 0';
        this._basePrice = value;
    }

    get engine(): IEngine {
        return this._engine;
    }

    set engine(value: IEngine) {
        if (value == undefined) throw 'Please supply an engine.';
        this._engine = value;
    }
}

class Truck extends Auto {
    bedLength: string;
    fourByFour: boolean;

    constructor(options: ITruckOptions) {
        super(options);
        this.bedLength = options.bedLength;
        this.fourByFour = options.fourByFour;
    }


}

window.onload = function () {
    //var truck = new Truck(40000, new Engine(300, 'V8'), 'Chevy', 'Silverado', "Long Bed", true);
    //truck.addAccessories(new Accessory(1234, 'sunroof'), new Accessory(4321, 'Towing Package'));
    //truck.engine.start((status: boolean, engineType: string) => {
    //    alert(engineType + ' was started');
    //});
    var truck = new Truck({
        engine: new Engine(250, 'V6'),
        basePrice: 45000,
        state: 'AZ',
        make: 'Ford',
        model: 'F-150',
        year: 2013,
        bedLength: 'Short bed',
        fourByFour: true
    });

    alert(truck.bedLength);
};


