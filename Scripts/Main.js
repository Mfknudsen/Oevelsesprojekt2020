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

console.log(api);

getMotherboard = function (budget, denied) {
    let motherboards = api["motherboard"];
    let random = Math.floor(Math.random() * motherboards.lenght);
    let currentNumber = 0;
    let selectedMotherboard;
    let run = true;

    for (var n of denied) {
        if (n == random) {
            run = false;
            console.log("Will not run!");
            break;
        }
    }

    if (run) {
        for (var board of Object.keys(motherboards)) {
            if (random == currentNumber) {
                selectedMotherboard = motherboards[board];
                console.log("Motherboard has been selected")
                break;
            } else {
                currentNumber++;
            }
        };

        if (selectedMotherboard != null) {
            if (selectedMotherboard["price"] > budget) {
                denied.push(random);
                selectedMotherboard = getMotherboard(budget, denied);
            }
        }

        if (selectedMotherboard != null && selectedMotherboard["price"] < budget) {
            console.log(selectedMotherboard);
            return selectedMotherboard;
        }
    } else {
        return getMotherboard(budget, denied);
    }
}

getCPU = function () {

}

getRam = function () {

}

getGPU = function () {

}
getCase = function () {

}

getPSU = function () {

}

mobo = getMotherboard(900, [0]);
if (mobo != null) {
    console.log("Selected:" + mobo + ". Price:" + mobo["price"]);
}