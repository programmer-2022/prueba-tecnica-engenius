import { config } from "../config/config-env";
import { CreateGridComponent } from "../components/create-custom-grid";

const ENGENIUS_URL = config.baseURL;

export const renderGridGrupos = (bodyRequest) => {
  const newObjGrupos = new CreateGridComponent({
    columns: ["Id", "Nombre", "NumGrupo"],
    url: ENGENIUS_URL,
    bodyRequest,
    callback: (grupos) => {
      return grupos.data.map((grupo) => [
        grupo.id,
        grupo.nombre,
        grupo.numGrupo,
      ]);
    },
  });

  const gridGrupos = newObjGrupos.buildGrid();
  newObjGrupos.addEventRowSelection(gridGrupos, (id, nombre, numGrupo) => {});
  newObjGrupos.render(gridGrupos, "grid-grupos");
};
