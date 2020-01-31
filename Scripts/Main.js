import API from pcpartpicker;

console.log("App is running!");

api = API();
cpu_data = api.retrieve("cpu");
all_data = api.retrieve_all();

console.log(cpu_data);
console.log(all_data);