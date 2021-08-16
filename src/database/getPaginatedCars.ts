import { ParsedUrlQuery } from "querystring";
import { openDB } from "../openDB";
import { CarModel } from "../../api/Car";
import { getAsString } from "../getAsString";

const mainQuery =
  "FROM car WHERE (@make is NULL OR @make = make) AND (@model is NULL OR @model=model) AND (@minPrice is NULL OR @minPrice <= price) AND (@maxPrice is NULL OR @maxPrice >= price) ";
export async function getPaginatedCars(query: ParsedUrlQuery) {
  const db = await openDB();
  const page = getValueNumber(query.page as string | string[]) || 1;
  const rowsPerPage = getValueNumber(query.rowsPerpage as string | string[]) || 4;
  const offset = (page - 1) * rowsPerPage;
  const dbParams = {
    "@make": getValueStr(query.make as string | string[]),
    "@model": getValueStr(query.model as string | string[]),
    "@minPrice": getValueNumber(query.minPrice as string | string[]),
    "@maxPrice": getValueNumber(query.maxPrice as string | string[]),
  };
  const cars = await db.all<CarModel[]>(
    `SELECT * ${mainQuery} LIMIT @rowsPerPage OFFSET @offset`,
    {
      ...dbParams,
      "@rowsPerPage": rowsPerPage,
      "@offset": offset,
    }
  );

  const totalRows = await db.get(
    `SELECT COUNT(*) as count ${mainQuery}`,
    dbParams
  );
  return { cars, totalPages: Math.ceil(totalRows.count / rowsPerPage) };
}


function getValueNumber(value: string | string[]) {
  const str = getAsString(value);
  const number = parseInt(str);
  return isNaN(number) ? null : number;
}

function getValueStr(value: string | string[]) {
  const str = getAsString(value);
  return !str || str.toLowerCase() === "all" ? null : str;
}
