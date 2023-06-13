import { config } from "../config/config-env";
import { CreateGridComponent } from "../components/create-custom-grid";
import { BodyRequestBuilderModel } from "../models/body-request-builder.model";
import { renderGridGrupos } from "./create-grid-grupos";

const ENGENIUS_URL = config.baseURL;

export const renderGridSedes = (bodyRequest) => {
  const newObjSedes = new CreateGridComponent({
    columns: ["Sedes", "Dane"],
    url: ENGENIUS_URL,
    bodyRequest,
    callback: (sedes) => {
      return sedes.data.map((sede) => [sede.nombre, sede.dane]);
    },
  });

  const gridSedes = newObjSedes.buildGrid();
  newObjSedes.addEventRowSelection(gridSedes, (nombre, dane) => {
    const newBody = new BodyRequestBuilderModel()
      .setUser()
      .setPassword()
      .setOption("grupos")
      .setCodSede(dane)
      .build();

    renderGridGrupos(newBody);
  });
  newObjSedes.render(gridSedes, "grid-sedes");
};
