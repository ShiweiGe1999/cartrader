/* eslint-disable react/display-name */
import { Pagination, PaginationItem } from "@material-ui/lab";
import { PaginationRenderItemParams } from "@material-ui/lab/Pagination";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";
import  { forwardRef } from "react";
import { getAsString } from "../getAsString";
export interface CardPaginationProps {
  query: ParsedUrlQuery;
  totalPages: number;
}
export function CardPagination({query, totalPages}: CardPaginationProps) {
  return (
    <Pagination
      page={parseInt(getAsString(query.page as string | string[]) || "1")}
      count={totalPages}
      renderItem={(item) => (
        <PaginationItem
          component={MaterialUiLink}
          query={query}
          item={item}
          {...item}
        />
      )}
    />
  );
}
export interface MaterialUiLinkProps {
  item: PaginationRenderItemParams;
  query: ParsedUrlQuery;
}

const MaterialUiLink = forwardRef<HTMLAnchorElement, MaterialUiLinkProps>(
  ({ item, query, ...props }, ref) => (
    <Link
      href={{
        pathname: "/cars",
        query: { ...query, page: item.page },
      }}
      shallow
    >
      <a {...props} ref={ref}></a>
    </Link>
  )
);
