console.log("");
console.log("App is running!");

//Setting up a temp api wtih all the parts to build a pc.
api = {
    "motherboard": {
        "msi_z390-a_pro": {
            "name": "MSI Z390-A Pro",
            "price": 850,
            "cpu_compatibility": "LGA1151",
            "watt": 100
        },
        "asus_prime_b450-plus": {
            "name": "Asus Prime B450-Plus",
            "price": 800,
            "cpu_compatibility": "LGA1151",
            "watt": 100
        },
        "asus_rog_strix_b450-f": {
            "name": "Asus ROG Strix B450-F",
            "price": 900,
            "cpu_compatibility": "LGA1151",
            "watt": 100
        },
        "msi_mpg_z390_pro_carbon": {
            "name": "MSI MPG Z390 Pro Carbon",
            "price": 1540,
            "cpu_compatibility": "LGA1151",
            "watt": 100
        },
        "asus_rog_strix_x570-e": {
            "name": "Asus ROG Strix X570-E",
            "price": 1000,
            "cpu_compatibility": "AM4",
            "watt": 100
        },
        "gigabyte_b450-ds3h": {
            "name": "Gigabyte B450 DS3H",
            "price": 950,
            "cpu_compatibility": "AM4",
            "watt": 100
        }
    },

    "cpu": {
        "intel type LGA1151": {
            "type": "LGA1151",
            "chips": {
                "i5": {
                    "name": "Intel i5",
                    "price": 50,
                    "watt": 50
                },
                "i7": {
                    "name": "Intel i7",
                    "price": 150,
                    "watt": 50
                },
                "i9": {
                    "name": "Intel i9",
                    "price": 350,
                    "watt": 50
                }
            }
        },

        "amd": {
            "type": "AM4",
            "chips": {
                "3": {
                    "name": "Ryzen 3",
                    "price": 50,
                    "watt": 50
                },
                "5": {
                    "name": "Ryzen 5",
                    "price": 100,
                    "watt": 50
                },
                "7": {
                    "name": "Ryzen 7",
                    "price": 250,
                    "watt": 50
                },
                "9": {
                    "name": "Ryzen 9",
                    "price": 350,
                    "watt": 50
                }
            }
        }
    },

    "gpu": {
        "amd": {

        },
        "nvidia": {

        }
    },

    "cpu_cooler": {
        "360mm": {

        },
        "240mm": {

        },
        "120mm": {

        }
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

//Setting up a function to get the motherboard based on the giving budget.
getMotherboard = function (budget, denied, currentBlock) {
    //Using a counter to stop the function from running infinit.
    let block = currentBlock + 1;
    //Getting the motherboard from the temp api.
    let motherboards = Object.values(api["motherboard"]);
    //Getting a number to choose a random motherboard.
    let random = Math.floor(Math.random() * motherboards.length);
    //The motherboard to return. Starts null and is later replaced.
    let selectedMotherboard = null;
    //If the current random number has not produced a motherboard that was later denied then it will remain true.
    let run = true;

    //Checking if the random number has been denied before.
    for (var n of Object.keys(denied)) {
        if (n == random) {
            run = false;
            break;
        }
    }
    //If the random number has not been denied then it will be used to get a motherboard from the api.
    if (run && block <= limit) {
        let currentNumber = 0;
        //Running trough all the motherboards and getting one based on the random number.
        for (var board of Object.keys(motherboards)) {
            if (random == currentNumber) {
                //The motherboard to return has been found.
                selectedMotherboard = motherboards[board];
                break;
            } else {
                currentNumber++;
            }
        }
        //Cheking if the current motherboard to return has a to high of a price.
        if (selectedMotherboard["price"] > budget) {
            //If it is then it will be removed and later denied if the random number is the same as this one.
            denied.push(random);
            selectedMotherboard = null;
        }
        //If there still is a motherboard selected then it be returned.
        if (selectedMotherboard != null) {
            return selectedMotherboard;
        } else {
            //If there is not a motherboard then it will try again.
            return getMotherboard(budget, denied, block);
        }
    } else if (block <= limit) {
        //If the random number was denied then it will try again.
        return getMotherboard(budget, denied, block);
    } else {
        //If it tries more then the limit will alow it then it will be returned null.
        block = block - 1;
        console.log("Total tries: " + block);
        return null;
    }
}

//Setting up a function to get the CPU based on a giving budget.
getCPU = function (budget, motherboard, denied, currentBlock) {
    let cpuAPI = Object.values(api["cpu"]);
    let cpu = [];
    let block =+ currentBlock + 1;
    let currentNumber = 0;
    let run = true;
    let selectedCPU = null;
    let goodRandom = false

    //Checking what kind of CPU the choosing motherboard uses.
    for (var o of Object.keys(cpuAPI)) {
        a = cpuAPI[o];
        if (a["type"] == motherboard["cpu_compatibility"]) {
            for (var n of Object.keys(a["chips"])) {
                let e = a["chips"]
                //Making an array of the chips that is compatibly with the choosing motherboard.
                cpu.push(e[n]);
            };
        }
    }
    
    let random = Math.floor(Math.random() * cpu.length);

    for (var i = 0; goodRandom; i++) {
        random = Math.floor(Math.random() * cpu.length);
        for (var n of Object.keys(denied)) {
            if (n == random) {
                run = false;
                break;
            }
        }
        if (run) {
            goodRandom = true;
            break;
        }
    }
    if (run && block <= limit) {
        for (var chips of Object.keys(cpu)) {
            if (random == currentNumber) {
                selectedCPU = cpu[chips];
                break;
            } else {
                currentNumber++;
            }
        }

        if (selectedCPU["price"] > budget) {
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

getCase = function () {

}

getCooler = function (pccase) {

}

getRam = function () {

}

getGPU = function (budget, cpu, denied) {

}

getPSU = function () {

}

//Used to limit the amout of tries to get each part.
var limit = 50;

var MotherboardBudget = 1000;
var CPUBudget = 300;
var CaseBudget = 500;
var CoolerBudget = 100;
var RamBudget = 120;
var GPUBudget = 350;
var PSUBudget = 50;


mobo = getMotherboard(MotherboardBudget, [], 0);
console.log("");
if (mobo != null) {
    console.log("Selected Motherboard:");
    console.log(mobo["name"] + ". Price: " + mobo["price"] + ". Underbudget save: " + (MotherboardBudget - mobo["price"]));
} else {
    console.log("Motherboard was returned null!");
}

cpu = getCPU(CPUBudget, mobo, [], 0);
console.log("");
if (cpu != null) {
    console.log("Selected CPU:");
    console.log(cpu["name"] + ". Price: " + cpu["price"] + ". Underbudget save: " + (CPUBudget - cpu["price"]));
} else {
    console.log("CPU was returned null!");
}

pccase = getCase();
console.log("");
if (pccase != null) {
    console.log("Selected Case:");
    console.log(pccase["name"] + ". Price: " + pccase["price"] + ". Underbudget save: " + (CaseBudget - pccase["price"]));

} else {
    console.log("Case was returned null!");
}


cooler = getCooler(pccase);
console.log("");
if (cooler != null) {
    console.log("Selected Cooler:");
    console.log(cooler["name"] + ". Price: " + cooler["price"] + ". Underbudget save: " + (CoolerBudget - cooler["price"]));
} else {
    console.log("Cooler was returned null!")
}

ram = getRam();
console.log("");
if (ram != null) {
    console.log("Selected Ram:");
    console.log(ram["name"] + ". Price: " + ram["price"] + ". Underbudget save: " + (RamBudget - ram["price"]));

} else {
    console.log("Ram was returned null!")
}

gpu = getGPU(GPUBudget, cpu, []);
console.log("");
if (gpu != null) {
    console.log("Selected GPU:");
    console.log(gpu["name"] + ". Price: " + gpu["price"] + ". Underbudget save: " + (GPUBudget - gpu["price"]));

} else {
    console.log("GPU was returned null!")
}

psu = getPSU();
console.log("");
if (psu != null) {
    console.log("Selected PSU:");
    console.log(psu["name"] + ". Price: " + psu["price"] + ". Underbudget save: " + (PSUBudget - psu["price"]));

} else {
    console.log("PSU was returned null!")
}