console.log("");
console.log("App is running!");

api = {
    "motherboard": {
        "msi_z390-a_pro": {
            "name": "MSI Z390-A Pro",
            "price": 850
        },
        "asus_prime_b450-plus": {
            "name": "Asus Prime B450-Plus",
            "price": 800
        },
        "asus_rog_strix_b450-f": {
            "name": "Asus ROG Strix B450-F",
            "price": 900
        },
        "msi_mpg_z390_pro_carbon": {
            "name": "MSI MPG Z390 Pro Carbon",
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

var block = 0;
var limit = 15;
var motherboards = Object.values(api["motherboard"]);

getMotherboard = function (budget, denied) {
    block = block + 1;
    let random = Math.floor(Math.random() * motherboards.length);
    let currentNumber = 0;
    let selectedMotherboard;
    let run = true;

    for (var n of denied) {
        if (n == random) {
            run = false;
            break;
        }
    }

    if (run && block <= limit) {
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
            console.log(selectedMotherboard["price"]+"    "+budget);
            if (selectedMotherboard["price"] > budget) {
                console.log("Motherboard was denied based on price!");
                console.log("Budget is " + selectedMotherboard["price"] - budget + " over budget!");
                denied.push(random);
                selectedMotherboard = null;
            }
        }

        if (selectedMotherboard != null) {
            return selectedMotherboard;
        } else {
            return getMotherboard(budget, denied);
        }
    } else if (block <= limit) {
        return getMotherboard(budget, denied);
    } else {
        block = block - 1;
        console.log("Total tries: " + block);
        return null;
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

mobo = getMotherboard(800, [0]);
if (mobo != null) {
    console.log("Selected:" + mobo["name"] + ". Price:" + mobo["price"]);
} else {
    console.log("Motherboard was returned null!");
}