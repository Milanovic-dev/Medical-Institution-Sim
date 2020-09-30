
class Person {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

class Doctor extends Person {
    constructor(firstName, lastName, specialization) {
        super(firstName, lastName);
        this.specialization = specialization;
        Logger.log(`Created doctor ${firstName}`);
    }

    appoint(appointment, patient) {
        if (patient.doctor != this) {
            console.error("Cannot appoint for foreign patients!");
            return;
        }

        patient.appointemnts.push(appointment);
    }
}

class Patient extends Person {
    constructor(firstName, lastName, JMBG, mrNumber) {
        super(firstName, lastName);
        this.JMBG = JMBG;
        this.mrNumber = mrNumber;
        this.doctor = null;
        this.appointemnts = [];
        Logger.log(`Created patient ${firstName}`);
    }

    setDoctor(doctor) {
        this.doctor = doctor;
        Logger.log(`Patient ${this.firstName} choose doctor ${this.doctor.firstName}`)
    }

    async finishAppointment() {
        if(this.appointemnts.length == 0){
            console.warn('No appointments to finish');
            return;
        }

        const appointment = this.appointemnts.shift();
        const finished = await appointment.evaluate();
        Logger.log(`Patient ${this.firstName} finished an appointment!`);
        return finished;
    }
}

class Appointment {
    constructor() {
        this.date = Date.now();
    }
}

class BloodPressureTest extends Appointment {
    constructor() {
        super();
        this.upperValue = 0;
        this.lowerValue = 0;
        this.puls = 0;
    }

    evaluate() {
        return new Promise((resolve, _) => {
            setTimeout(() => {
                this.upperValue = Math.random();
                this.lowerValue = Math.random();
                this.puls = Math.random();
                resolve({
                    upperValue: this.upperValue,
                    lowerValue: this.lowerValue,
                    plus: this.puls,
                });
            }, 4000);
        });
    }
}

class BloodSupstanceTest extends Appointment {
    constructor() {
        super();
        this.value = 0;
        this.lastMeal = 0;
    }

    evaluate() {
        return new Promise((resolve, _) => {
            setTimeout(() => {
                this.value = Math.random();
                this.lastMeal = Date.now();
                resolve({ value: this.value, lastMeal: this.lastMeal });
            }, 6000);
        });
    }
}

class BloodSugarTest extends BloodSupstanceTest {
    constructor() {
        super();
    }
}

class BloodCholesterolTest extends BloodSupstanceTest {
    constructor() {
        super();
    }
}

class Logger {
    static log(action){
        const date = new Date()
        console.log(`[${date.toString()}]:  ${action}`);''
    }
}

const simulate = async () => {
    console.log("Starting Simulation.");

    const doctor = new Doctor("Dragan", "Draganovic", "General");

    const patient = new Patient("Milan", "Milanovic", "2612997800063", 4322343);

    patient.setDoctor(doctor);

    console.log("Making appointments");

    doctor.appoint(new BloodSugarTest(), patient);
    doctor.appoint(new BloodPressureTest(), patient);

    console.log("Waiting for appointments to finish. ~ 10 sec");

    const results1 = await patient.finishAppointment();
    const results2 = await patient.finishAppointment();
    console.log("\nRESULTS:\n");
    console.log(results1);
    console.log(results2);
};

simulate();
