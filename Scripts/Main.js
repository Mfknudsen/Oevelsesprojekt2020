console.log("App is running!");

api = {
    "motherboard": {
        "msi_z390-a_pro": {
            "price": 850
        },
        "asus_prime_b450-plus": {
            "price": 800
        },
        "asus_rog_strix_b450-f": {
            "price": 900
        },
        "msi_mpg_z390_pro_carbon": {
            "price": 1540
        }
    },

    "cpu": {
        "intel": {
            "i5": {},
            "i7": {},
            "i9": {}
        },

        "amd": {
            "3": {},
            "5": {},
            "7": {},
            "9": {}
        }
    },

    "gpu": {
        "radeon": {},
        "gtx": {},
        "rtx": {}
    },

    "cpu_cooler": {
        "closed_water": {},
        "air": {}
    },

    "ram": {
        "corsair": {}
    },

    "case": {
        "fractal_design": {},
        "corsair": {},
        "phanteks": {},
        "intel": {},
        "razer": {},
        "nzxt": {},
        "asus": {},
        "deepcool": {},
        "cooler_master": {}
    },

    "memory": {
        "ssd": {},
        "m.2": {},
        "hdd": {}
    },

    "psu": {
        "400w": {},
        "450w": {},
        "500w": {},
        "550w": {},
        "600w": {},
        "650w": {},
        "700w": {},
        "750w": {},
        "800w": {},
        "850w": {},
        "1000w": {},
        "1200w": {},
        "1600w": {}
    }
};

class funtions {
    constructor() {
        this.getMotherboard();
    }

    getMotherboard(budget, denied) {
        motherboards = api["motherboard"]
        var random = Math.floor(Math.random() * motherboards.lenght);
        var selectedMotherboard;

        var run = true;
        denied.forEach(element => {
            if (element == random) {
                run = false;
                break;
            }
        });

        if (run == true) {
            if (motherboard[random]) {}
        }

        if (selectedMotherboard != null) {
            console.log(selectedMotherboard);
        } else {
            this.getMotherboard(budget, denied);
        }
    }

    getCPU() {

    }

    getRam() {

    }

    getGPU() {

    }
    getCase() {

    }

    getPSU() {

    }
}