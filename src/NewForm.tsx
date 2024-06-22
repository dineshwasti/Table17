import formData from "../form.json";
import formData2 from "../form2.json";
import React from "react";

export default function NewForm() {
  const newData = () => {
    const inputData2: { title: string; name: string }[] = [];
    formData2.forEach((item) => {
      if (item.name !== "sn") {
        if (item.sub) {
          item.sub.forEach((subItem) => {
            inputData2.push({ title: subItem.title, name: subItem.name });
          });
        } else {
          inputData2.push({ title: item.title, name: item.name });
        }
      }
    });
    return inputData2;
  };
  const onSubmit = () => {
    alert("asda");
  };
  return (
    <form onSubmit={onSubmit} method="get">
      <table>
        <tr>
          <th colSpan={6}>
            तालिका १५: फल, फूल, बीउ प्रयोग हुने झाडी वर्गका गैरकाष्ठ वन
            पैदावारको लागि सर्वेक्षण फारम
          </th>
        </tr>
        {formData.map((item, index) => (
          <tr key={index}>
            {item.map((formItem, i) => (
              <React.Fragment key={i}>
                <td>{formItem.title}</td>
                <td colSpan={item.length == 2 ? 2 : 1}>
                  <input type="text" name={formItem.name} />
                </td>
              </React.Fragment>
            ))}
          </tr>
        ))}
      </table>
      <br />
      <table>
        <tr>
          {formData2.map((item, index) => (
            <th
              rowSpan={index + 1 == formData2.length ? 1 : 2}
              colSpan={index + 1 == formData2.length ? 2 : 1}
              key={index}
            >
              {item.title}
            </th>
          ))}
        </tr>
        <tr>
          {formData2[formData2.length - 1].sub?.map((item, index) => (
            <th key={index}>{item.title}</th>
          ))}
        </tr>
        {[...Array(6)].map((_, firstIndex) => (
          <tr key={firstIndex}>
            <td>{firstIndex + 1}</td>
            {newData().map((item, index) => (
              <td key={index}>
                <input type="text" name={`${firstIndex + 1}-${item.name}`} />
              </td>
            ))}
          </tr>
        ))}
      </table>
      <br />
      <input type="submit" value="Submit the form" className="btn" />
    </form>
  );
}
