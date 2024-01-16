import {  notification } from "antd";
import * as XLSX from "xlsx";
export const dowloadExcel = (data: any[]) => {
    if (data.length > 0) {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        // console.log("workbook: ",workbook)
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
        //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
        XLSX.writeFile(workbook, "DataSheet.xlsx");
    } else {
        return notification.warning({ message: "Không có dữ liệu. Vui lòng kiểm tra lại!" });
    }
};
