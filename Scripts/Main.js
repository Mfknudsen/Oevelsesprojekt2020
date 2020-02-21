console.log("");
console.log("App is running!");

api = {
    "motherboard": {
        "msi_z390-a_pro": {
            "name": "MSI Z390-A Pro",
            "price": 850,
            "cpu_compatibility": "LGA1151"
        },
        "asus_prime_b450-plus": {
            "name": "Asus Prime B450-Plus",
            "price": 800,
            "cpu_compatibility": "LGA1151"
        },
        "asus_rog_strix_b450-f": {
            "name": "Asus ROG Strix B450-F",
            "price": 900,
            "cpu_compatibility": "LGA1151"
        },
        "msi_mpg_z390_pro_carbon": {
            "name": "MSI MPG Z390 Pro Carbon",
            "price": 1540,
            "cpu_compatibility": "LGA1151"
        },
        "asus_rog_strix_x570-e": {
            "name": "Asus ROG Strix X570-E",
            "price": 1000,
            "cpu_compatibility": "AM4"
        },
        "gigabyte_b450-ds3h": {
            "name": "Gigabyte B450 DS3H",
            "price": 950,
            "cpu_compatibility": "AM4"
        }
    },

    "cpu": {
        "intel type LGA1151": {
            "type": "LGA1151",
            "chips": {
                "i5": {
                    "name": "Intel i5",
                    "price": 50
                },
                "i7": {
                    "name": "Intel i7",
                    "price": 150
                },
                "i9": {
                    "name": "Intel i9",
                    "price": 350
                }
            }
        },

        "amd": {
            "type": "AM4",
            "chips": {
                "3": {
                    "name": "Ryzen 3",
                    "price": 50
                },
                "5": {
                    "name": "Ryzen 5",
                    "price": 100
                },
                "7": {
                    "name": "Ryzen 7",
                    "price": 250
                },
                "9": {
                    "name": "Ryzen 9",
                    "price": 350
                }
            }
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

var limit = 15;

var MotherboardBudget = 1000;
var CPUBudget = 200;

getMotherboard = function (budget, denied, currentBlock) {
    let block = currentBlock + 1;
    let motherboards = Object.values(api["motherboard"]);
    let random = Math.floor(Math.random() * motherboards.length);
    let currentNumber = 0;
    let selectedMotherboard = null;
    let run = true;

    for (var n of Object.keys(denied)) {
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
        }

        if (selectedMotherboard["price"] > budget) {
            console.log("Motherboard was denied based on price!");
            console.log("Budget is " + (selectedMotherboard["price"] - budget) + " over budget!");
            denied.push(random);
            selectedMotherboard = null;
        }

        if (selectedMotherboard != null) {
            return selectedMotherboard;
        } else {
            return getMotherboard(budget, denied, block);
        }
    } else if (block <= limit) {
        return getMotherboard(budget, denied, block);
    } else {
        block = block - 1;
        console.log("Total tries: " + block);
        return null;
    }
}

getCPU = function (budget, motherboard, denied, currentBlock) {
    let cpu = Object.values(api["cpu"]);
    let block = 1;
    block = block + currentBlock;
    let currentNumber = 0;
    let random = Math.floor(Math.random() * cpu.length);
    let run = true;
    let selectedCPU = null;
    let selectedType = null;

    for (var n of Object.keys(denied)) {
        if (n == random) {
            run = false;
            break;
        }
    }

    if (run && block <= limit) {
        for (var chips of Object.keys(cpu)) {
            if (random == currentNumber) {
                selectedCPU = cpu[chips];
                console.log("CPU has been selected")
                break;
            } else {
                currentNumber++;
            }
        }

        if (selectedCPU["price"] > budget) {
            console.log("CPU was denied based on price!");
            console.log("Budget is " + (selectedCPU["price"] - budget) + " over budget!");
            denied.push(random);
            selectedCPU = null;
        }

        if (selectedCPU["type"] != motherboard["cpu_compatibility"]) {
            console.log("CPU was denied base on motherboard socket type!");
            denied.push(random);
            selectedCPU = null;
        }

        if (selectedCPU != null) {
            return selectedCPU;
        } else {
            return getCPU(budget, motherboard, denied, block);
        }
    } else if (block <= limit) {
        return getCPU(budget, motherboard, denied, block);
    } else {
        block = block - 1;
        console.log("Total tries: " + block);
        return null;
    }
}

getRam = function () {

}

getGPU = function () {

}
getCase = function () {

}

getPSU = function () {

}

mobo = getMotherboard(MotherboardBudget, [0], 0);
if (mobo != null) {
    console.log("Selected: " + mobo["name"] + ". Price: " + mobo["price"]);
} else {
    console.log("Motherboard was returned null!");
}

cpu = getCPU(CPUBudget, mobo, [0], 0);
if (cpu != null) {
    console.log("Selected CPU: " + cpu["name"] + ". Price: " + cpu["price"]);
} else {
    console.log("CPU was returned null!");
}