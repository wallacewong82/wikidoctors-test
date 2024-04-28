import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "../../assets/styles/index.css";

const Paginate = ({ pages, page, link, isAdmin = false, keyword = "" }) => {
  const startPage = Math.max(1, page - 5);
  const endPage = Math.min(pages, startPage + 9);
  const showEllipsis = endPage > 4 ? true : false;
  const limitedPages = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  return (
    pages > 1 && (
      <Pagination
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <LinkContainer
          to={
            !isAdmin
              ? keyword
                ? `${link}/${keyword}/page/1`
                : `${link}/page/1`
              : `/admin/specialistlist/1`
          }
        >
          <Pagination.First className={"paginationItemStyle"} />
        </LinkContainer>
        <LinkContainer
          to={
            !isAdmin
              ? keyword
                ? page > 1
                  ? `${link}/${keyword}/page/${page - 1}`
                  : `${link}/${keyword}/page/1`
                : page > 1
                ? `${link}/page/${page - 1}`
                : `${link}/page/1`
              : `/admin/specialistlist/${page - 1}`
          }
        >
          <Pagination.Prev className={"paginationItemStyle"} />
        </LinkContainer>
        {limitedPages.map((x) => (
          <LinkContainer
            key={x}
            to={
              !isAdmin
                ? keyword
                  ? `${link}/${keyword}/page/${x}`
                  : `${link}/page/${x}`
                : `/admin/specialistlist/${x}`
            }
          >
            <Pagination.Item
              className={"paginationItemStyle"}
              active={x === page}
            >
              {x}
            </Pagination.Item>
          </LinkContainer>
        ))}
        {showEllipsis ? (
          <Pagination.Ellipsis className={"paginationItemStyle"} disabled />
        ) : null}

        <LinkContainer
          to={
            !isAdmin
              ? keyword
                ? page < pages
                  ? `${link}/${keyword}/page/${page + 1}`
                  : `${link}/${keyword}/page/${pages}`
                : page < pages
                ? `${link}/page/${page + 1}`
                : `${link}/page/${pages}`
              : `/admin/specialistlist/${page + 1}`
          }
        >
          <Pagination.Next className={"paginationItemStyle"} />
        </LinkContainer>

        <LinkContainer
          to={
            !isAdmin
              ? keyword
                ? `${link}/${keyword}/page/${pages}`
                : `${link}/page/${pages}`
              : `/admin/specialistlist/${pages}`
          }
        >
          <Pagination.Last className={"paginationItemStyle"} />
        </LinkContainer>
      </Pagination>
    )
  );
};

export default Paginate;
