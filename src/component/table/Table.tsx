import "@/component/table/Table.css";
import Button, {
  ButtonCheckBoxOptions,
  ButtonOptions,
} from "@/component/button/Button";
import { NamingHelper } from "@/helper/NamingHelper";
import TextField from "@/component/textfield/TextField";
import TabsButton from "@/component/button/TabsButton";
import ActionOptions from "./options/ActionOptions";
import { tableOptionsUtil, tableRowUtil, useTableUtil } from "./tableUtil";
import { SectionWrapper } from "./details/SectionWrapper";
import { editProductField, ProductState } from "@/state/products/productSlice";
import Loading from "../loading/Loading";
import CustomCard from "../card/CustomCard";
import { Section } from "./details/Section";
import InfoCard from "../card/InfoCard";
import { Dispatch, Fragment, SetStateAction } from "react";

interface TableProps {
  data: ProductState[];
  title: string;
  isFullScreen: boolean;
  badgeColumn?: string;
  boldColumn?: string;
  onViewAll?: () => void;
}

const Table = ({
  data,
  title,
  badgeColumn,
  boldColumn,
  onViewAll,
  isFullScreen,
}: TableProps) => {
  const TableUtil = useTableUtil(data);
  const TableOptions = tableOptionsUtil();

  const { handleSelectedRow, handleActions, rowData, dispatch } =
    tableRowUtil();

  return (
    <>
      <div className="mainWrapper">
        {/* Table Tabs */}
        {isFullScreen === true && (
          <div className="tableTabs">
            <TabsButton label="Dashboard" onClick={onViewAll} />
            <TabsButton label={title} active={isFullScreen} />
          </div>
        )}

        <div className="table">
          {data.length === 0 ? (
            <Loading />
          ) : (
            <>
              <div className="tableWrapper">
                {/* Table header */}
                <div className="tableHeader">
                  {isFullScreen === true ? (
                    <TableControls
                      searchData={TableUtil.searchData}
                      setSearchData={TableUtil.setSearchData}
                      sortingOptions={TableUtil.sortingOptions}
                      handleSort={TableUtil.handleSort}
                      toggleSortOrder={TableUtil.toggleSortOrder}
                      viewOptions={TableUtil.viewOptions}
                      visibleColumn={TableUtil.visibleColumn}
                      handleSelectedView={TableUtil.handleSelectedView}
                    />
                  ) : (
                    <>
                      <span>{title}</span>
                      <Button label="View All" onClick={onViewAll} />
                    </>
                  )}
                </div>

                {/* Table start here */}
                <table>
                  {/* Column header */}
                  <TableHeader
                    data={data}
                    isFullScreen={isFullScreen}
                    visibleColumn={TableUtil.visibleColumn}
                  />

                  {/* Row */}
                  <tbody>
                    {TableUtil.paginatedData.map((row, rowIndex) => {
                      return (
                        <tr key={rowIndex}>
                          {Object.entries(row).map(([key, value]) => {
                            return (
                              <Fragment key={`row-${rowIndex}-${key}`}>
                                {TableUtil.visibleColumn.includes(key) && (
                                  <td
                                    key={`${key}-${rowIndex}`}
                                    className={`${key !== "title" && key} ${
                                      boldColumn === key && "boldColumn"
                                    }`}
                                  >
                                    {badgeColumn === key ? (
                                      <div
                                        className={`badge ${value
                                          .replace(/\s+/g, "")
                                          .replace(/'/g, "")
                                          .toLowerCase()}`}
                                      >
                                        {value}
                                      </div>
                                    ) : (
                                      value
                                    )}
                                  </td>
                                )}
                              </Fragment>
                            );
                          })}

                          {/* Action button */}
                          {isFullScreen === true && (
                            <td
                              key={`actions` + rowIndex}
                              className="actionColumn"
                            >
                              <Button
                                label=""
                                onClick={(e) => {
                                  TableOptions.handleOptionsClick(e);
                                  handleSelectedRow(row);
                                }}
                                borderless
                                icon="DotsHorizontal"
                              />

                              {/* Action options */}
                              <div ref={TableOptions.optionsRef}>
                                <ActionOptions
                                  visible={TableOptions.isOptionsClicked}
                                  position={TableOptions.position}
                                  onViewDetails={() => {
                                    TableOptions.handleButtonOptions(
                                      "detail",
                                      true
                                    );
                                    handleActions("detail");
                                  }}
                                  onEditTransaction={() => {
                                    TableOptions.handleButtonOptions(
                                      "edit",
                                      true
                                    );
                                    handleActions("detail");
                                  }}
                                  onDelete={() => {
                                    /**
                                     * close the detail/edit container if it is opened when user clicking the delete action
                                     */
                                    TableOptions.handleButtonOptions(
                                      "both",
                                      false
                                    );
                                    handleActions("delete");
                                  }}
                                />
                              </div>
                            </td>
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* Product Detail */}
          <SectionWrapper
            isVisible={TableOptions.isDetailOpen && isFullScreen}
            onClick={() => TableOptions.handleButtonOptions("detail", false)}
            isLoading={rowData.isLoading}
          >
            <Section title="Product details">
              <CustomCard
                variation="text"
                title="Description"
                description={rowData.singleProduct?.description}
              />
            </Section>
            <Section title="Items">
              <CustomCard
                variation="compact"
                title={rowData.singleProduct?.title}
                image={rowData.singleProduct?.image}
                content={`RM ${rowData.singleProduct?.price.toString()}`}
                description={rowData.singleProduct?.category}
              />
              <CustomCard
                variation="compact"
                title={rowData.singleProduct?.title}
                image={rowData.singleProduct?.image}
                content={`RM ${rowData.singleProduct?.price.toString()}`}
                description={rowData.singleProduct?.category}
              />
              <CustomCard
                variation="compact"
                title={rowData.singleProduct?.title}
                image={rowData.singleProduct?.image}
                content={`RM ${rowData.singleProduct?.price.toString()}`}
                description={rowData.singleProduct?.category}
              />
            </Section>
            <Section title="">
              {rowData.singleProduct?.price && (
                <InfoCard
                  subtotal={rowData.singleProduct?.price * 3}
                  serviceTax={rowData.singleProduct?.price * 3}
                />
              )}
            </Section>
          </SectionWrapper>

          {/* Edit Product */}
          <SectionWrapper
            isVisible={TableOptions.isEditTransaction && isFullScreen}
            onClick={() => TableOptions.handleButtonOptions("edit", false)}
            isLoading={rowData.isLoading}
          >
            <Section title="Edit transaction">
              <div className="w-full flex flex-col gap-3">
                <TextField
                  id="title"
                  label="Title"
                  variation="normal"
                  placeholder="Title"
                  value={rowData.singleProduct?.title}
                  onChange={(e) =>
                    dispatch(
                      editProductField({ key: "title", value: e.target.value })
                    )
                  }
                />
                <TextField
                  id="price"
                  label="Price"
                  variation="normal"
                  placeholder="Price"
                  type="number"
                  value={rowData.singleProduct?.price}
                  onChange={(e) =>
                    dispatch(
                      editProductField({
                        key: "price",
                        value: Number(e.target.value),
                      })
                    )
                  }
                />
                <div className="w-full flex justify-end">
                  <Button
                    label="Update"
                    onClick={() => handleActions("edit")}
                  />
                </div>
              </div>
            </Section>
          </SectionWrapper>
        </div>

        {/* Table footer */}
        {isFullScreen === true && (
          <TableFooter
            handleRowsChange={TableUtil.handleRowsPerPage}
            rowsPerPage={TableUtil.rowsPerPage}
            currentPage={TableUtil.currentPage}
            totalPages={TableUtil.totalPages}
            goToNextPage={TableUtil.goToNextPage}
            goToPreviousPage={TableUtil.goToPreviousPage}
            goToFirstPage={TableUtil.goToFirstPage}
            goToLastPage={TableUtil.goToLastPage}
            pageList={TableUtil.pageList}
            handlePageChange={TableUtil.handlePageChange}
          />
        )}
      </div>
    </>
  );
};

type TableControlsProps = {
  searchData: string;
  setSearchData: Dispatch<SetStateAction<string>>;
  sortingOptions: ButtonOptions[];
  toggleSortOrder: () => void;
  handleSort: (key: keyof Omit<ProductState, "rating">) => void;
  viewOptions: ButtonCheckBoxOptions[];
  visibleColumn: string[];
  handleSelectedView: (selectedView: string[]) => void;
};
function TableControls({
  searchData,
  setSearchData,
  sortingOptions,
  toggleSortOrder,
  handleSort,
  viewOptions,
  visibleColumn,
  handleSelectedView,
}: TableControlsProps) {
  return (
    <>
      <div className="searchBar">
        <TextField
          variation="icon"
          placeholder="Search..."
          value={searchData}
          onChange={(e) => setSearchData(e.target.value)}
        />
      </div>
      <div className="tableUtilities">
        <Button
          label="Sort"
          icon="Sort"
          options={sortingOptions}
          onOptionSelect={(e) => {
            handleSort(e as keyof Omit<ProductState, "rating">);
            toggleSortOrder();
          }}
        />
        <Button
          label="Filter"
          icon="Filter"
          onClick={() => alert("Not functioning... 😞")}
        />
        <Button
          label="View"
          icon="Adjustment"
          checkBoxOptions={viewOptions}
          checkedOptions={visibleColumn}
          onChecked={(e) => handleSelectedView(e)}
        />
        <Button
          label=""
          icon="Pdf"
          onClick={() => alert("Not functioning... 😞")}
        />
        <Button
          label=""
          icon="Excel"
          onClick={() => alert("Not functioning... 😞")}
        />
        <Button
          label=""
          icon="Printer"
          onClick={() => alert("Not functioning... 😞")}
        />
      </div>
    </>
  );
}

type TableHeaderProps = Pick<TableProps, "data" | "isFullScreen"> & {
  visibleColumn: string[];
};

function TableHeader({ data, isFullScreen, visibleColumn }: TableHeaderProps) {
  return (
    <thead>
      <tr>
        {Object?.keys(data[0])?.map((column, columnIndex) => {
          return (
            <Fragment key={`${columnIndex}`}>
              {visibleColumn.includes(column) && (
                <th
                  key={`${column}-${columnIndex}`}
                  className={`${column !== "title" && column}`}
                >
                  {NamingHelper(column)}
                </th>
              )}
            </Fragment>
          );
        })}

        {isFullScreen === true && <th className="actionColumn">More</th>}
      </tr>
    </thead>
  );
}

type TableFooterProps = {
  handleRowsChange: (rows: number) => void;
  rowsPerPage: number;
  currentPage: number;
  totalPages: number;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  goToFirstPage: () => void;
  goToLastPage: () => void;
  handlePageChange: (page: number) => void;
  pageList: ButtonOptions[];
};
function TableFooter({
  handleRowsChange,
  rowsPerPage,
  currentPage,
  totalPages,
  goToNextPage,
  goToPreviousPage,
  goToFirstPage,
  goToLastPage,
  handlePageChange,
  pageList,
}: TableFooterProps) {
  const rowsOptions: ButtonOptions[] = [
    { name: "5", value: 5 },
    { name: "10", value: 10 },
    { name: "15", value: 15 },
    { name: "20", value: 20 },
  ];

  return (
    <div className="tableFooter">
      <div className="tablePagination">
        Rows per page
        <Button
          label={rowsPerPage.toString()}
          options={rowsOptions}
          onOptionSelect={(e) => handleRowsChange(e as number)}
        />
      </div>
      <div className="tablePagination">
        Go to page
        <Button
          label={currentPage.toString()}
          options={pageList}
          onOptionSelect={(e) => handlePageChange(e as number)}
        />
      </div>
      <div className="tablePagination">
        Page {currentPage} of {totalPages}
        <Button
          label=""
          icon="ChevronDoubleLeft"
          onClick={goToFirstPage}
          disabled={currentPage === 1}
        />
        <Button
          label=""
          icon="ChevronLeft"
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
        />
        <Button
          label=""
          icon="ChevronRight"
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
        />
        <Button
          label=""
          icon="ChevronDoubleRight"
          onClick={goToLastPage}
          disabled={currentPage === totalPages}
        />
      </div>
    </div>
  );
}

export default Table;
