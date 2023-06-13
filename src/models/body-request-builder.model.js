import { config } from "../config/config-env";

export class BodyRequestBuilderModel {
  constructor() {
    this.user = "";
    this.password = "";
    this.option = "";
    this.codMun = "";
    this.codInst = "";
    this.codSede = "";
  }

  setUser() {
    this.user = config.username;
    return this;
  }

  setPassword() {
    this.password = config.password;
    return this;
  }

  setOption(option) {
    this.option = option;
    return this;
  }

  setCodMun(codMun) {
    this.codMun = codMun;
    return this;
  }

  setCodInst(codInst) {
    this.codInst = codInst;
    return this;
  }

  setCodSede(codSede) {
    this.codSede = codSede;
    return this;
  }

  build() {
    return {
      User: this.user,
      Password: this.password,
      option: this.option,
      CodMun: this.codMun,
      CodInst: this.codInst,
      CodSede: this.codSede,
    };
  }
}
