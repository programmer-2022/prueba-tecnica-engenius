import { config } from "../config/config-env";
import { CreateGridComponent } from "../components/create-custom-grid";
import { renderGridInstituciones } from "./create-grid-instituciones";
import { BodyRequestBuilderModel } from "../models/body-request-builder.model";

const ENGENIUS_URL = config.baseURL;

const bodyRequest = new BodyRequestBuilderModel()
  .setUser()
  .setPassword()
  .setOption("municipios")
  .build();

export const renderGridMunicipios = () => {
  const newObjMunicipios = new CreateGridComponent({
    columns: ["Municipios", "Dane"],
    url: ENGENIUS_URL,
    bodyRequest,
    callback: (municipios) => {
      return municipios.data.map((mun) => [mun.nombre, mun.dane]);
    },
    search: true,
  });

  const gridMunicipios = newObjMunicipios.buildGrid();
  //Listener
  newObjMunicipios.addEventRowSelection(gridMunicipios, (nombre, dane) => {
    const newBody = new BodyRequestBuilderModel()
      .setUser()
      .setPassword()
      .setOption("instituciones")
      .setCodMun(dane)
      .build();
    renderGridInstituciones(newBody);
  });
  newObjMunicipios.render(gridMunicipios, "grid-municipios");
};
