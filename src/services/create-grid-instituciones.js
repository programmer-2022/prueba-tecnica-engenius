import { config } from "../config/config-env";
import { CreateGridComponent } from "../components/create-custom-grid";
import { BodyRequestBuilderModel } from "../models/body-request-builder.model";
import { renderGridSedes } from "./create-grid-sedes";

const ENGENIUS_URL = config.baseURL;

export const renderGridInstituciones = (bodyRequest) => {
  const newObjInstituciones = new CreateGridComponent({
    columns: ["Instituciones", "Dane"],
    url: ENGENIUS_URL,
    bodyRequest,
    callback: (instituciones) => {
      return instituciones.data.map((ins) => [ins.nombre, ins.dane]);
    },
  });

  const gridInstituciones = newObjInstituciones.buildGrid();

  newObjInstituciones.addEventRowSelection(
    gridInstituciones,
    (nombre, dane) => {
      const newBody = new BodyRequestBuilderModel()
        .setUser()
        .setPassword()
        .setOption("sedes")
        .setCodInst(dane)
        .build();

      renderGridSedes(newBody);
    }
  );
  newObjInstituciones.render(gridInstituciones, "grid-instituciones");
};
