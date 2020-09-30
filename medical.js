class Doctor {
    constructor(firstName, lastName, specialization) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.specialization = specialization;
    }

    appoint(appointment, patient) {
        if (patient.doctor != this) {
            console.error("Cannot appoint for foreign patients!");
            return;
        }

        patient.appointemnts.push(appointment);
    }
}

class Patient {
    constructor(firstName, lastName, JMBG, mrNumber) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.JMBG = JMBG;
        this.mrNumber = mrNumber;
        this.doctor = null;
        this.appointemnts = [];
    }

    setDoctor(doctor) {
        this.doctor = doctor;
    }

    async finishAppointment() {
        const appointment = this.appointemnts.shift();
        const finished = await appointment.evaluate();

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
