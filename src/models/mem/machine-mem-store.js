import { v4 } from "uuid";

let machines = [];

export const machineMemStore = {
  async getAllMachines() {
    return machines;
  },

  async addMachine(serverId, machine) {
    machine._id = v4();
    machine.machineid = serverId;
    machines.push(machine);
    return machine;
  },

  async getMachinesByServerId(id) {
    return machines.filter((machine) => machine.machineid === id);
  },

  async getMachineById(id) {
    return machines.find((machine) => machine._id === id);
  },

  async getServerMachines(serverId) {
    return machines.filter((machine) => machine.machineid === serverId);
  },

  async deleteMachine(id) {
    const index = machines.findIndex((machine) => machine._id === id);
    machines.splice(index, 1);
  },

  async deleteAllMachines() {
    machines = [];
  },

  async updateMachine(machine, updatedMachine) {
    machine.title = updatedMachine.title;
    machine.description = updatedMachine.description;
  },
};
